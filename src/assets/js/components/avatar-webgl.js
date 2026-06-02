/* ==========================================================================
   WebGL Avatar Hover Mask Reveal — Framer-style Circular Mouse Cursor Mask
   A circular mask follows the mouse to reveal a second image underneath.
   Inspired by: real-parts-944004.framer.app / landonorris.com
   ========================================================================== */

import * as THREE from 'three/build/three.min.js';
import { gsap } from 'gsap';

// ---------- GLSL Shaders ----------

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform vec2 uMouse;
  uniform float uMaskRadius;
  uniform float uMaskSoftness;
  uniform float uHover;
  uniform vec2 uImageSizeA;
  uniform vec2 uImageSizeB;
  uniform vec2 uPlaneSize;

  varying vec2 vUv;

  // Background-size: cover UV mapping
  vec2 coverUv(vec2 uv, vec2 imgSize, vec2 planeSize) {
    float imgAspect = imgSize.x / imgSize.y;
    float planeAspect = planeSize.x / planeSize.y;
    vec2 scale;
    if (planeAspect > imgAspect) {
      scale = vec2(1.0, imgAspect / planeAspect);
    } else {
      scale = vec2(planeAspect / imgAspect, 1.0);
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uvA = coverUv(vUv, uImageSizeA, uPlaneSize);
    vec2 uvB = coverUv(vUv, uImageSizeB, uPlaneSize);

    vec4 colorA = texture2D(uTextureA, uvA);
    vec4 colorB = texture2D(uTextureB, uvB);

    // Calculate distance from current pixel to mouse position
    // Correct for aspect ratio so the mask is a perfect circle
    vec2 aspect = vec2(uPlaneSize.x / uPlaneSize.y, 1.0);
    float dist = distance(vUv * aspect, uMouse * aspect);

    // Circular mask with soft feathered edge
    float radius = uMaskRadius * uHover;
    float mask = (1.0 - smoothstep(radius - uMaskSoftness, radius + uMaskSoftness, dist)) * uHover;

    // Mix: show texture A normally, reveal texture B inside the mask circle
    gl_FragColor = mix(colorA, colorB, mask);
  }
`;

// ---------- Avatar Hover Mask Reveal Class ----------

class AvatarHoverMaskReveal {
  constructor() {
    this.container = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.mesh = null;
    this.material = null;
    this.canvas = null;
    this.active = false;
    this._rafId = null;
    this._mouseNorm = { x: 0.5, y: 0.5 };
    this._mouseEased = { x: 0.5, y: 0.5 };
    this._hoverTween = null;
    this._onResize = null;
    this._onMouseMove = null;
    this._onMouseEnter = null;
    this._onMouseLeave = null;
    this._onTouchStart = null;
    this._onTouchMove = null;
    this._onTouchEnd = null;
  }

  init() {
    const container = document.getElementById('avatar-webgl-container');
    if (!container) return;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('[AvatarMaskReveal] WebGL not supported, using fallback image.');
      return;
    }

    this.container = container;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) {
      setTimeout(() => this.init(), 200);
      return;
    }

    // Create Three.js renderer
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'avatar-webgl-canvas';
    container.appendChild(this.canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Orthographic camera for flat plane rendering
    this.camera = new THREE.OrthographicCamera(
      width / -2, width / 2,
      height / 2, height / -2,
      0.1, 10
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    // Load textures
    const loader = new THREE.TextureLoader();
    const imageA = container.dataset.imageA;
    const imageB = container.dataset.imageB;

    if (!imageA || !imageB) {
      console.warn('[AvatarMaskReveal] Missing data-image-a or data-image-b attributes.');
      return;
    }

    const texA = loader.load(imageA);
    const texB = loader.load(imageB);

    [texA, texB].forEach(tex => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.format = THREE.RGBFormat;
    });

    // Create shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTextureA: { value: texA },
        uTextureB: { value: texB },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMaskRadius: { value: 0.25 },      // Radius of reveal circle (normalized 0-1)
        uMaskSoftness: { value: 0.05 },    // Feather softness at edge
        uHover: { value: 0 },              // 0 = no reveal, 1 = full reveal
        uImageSizeA: { value: new THREE.Vector2(1, 1) },
        uImageSizeB: { value: new THREE.Vector2(1, 1) },
        uPlaneSize: { value: new THREE.Vector2(width, height) }
      },
      transparent: true
    });

    // Load image natural sizes for aspect-correct cover mapping
    loader.load(imageA, (t) => {
      if (this.material) {
        this.material.uniforms.uImageSizeA.value.set(
          t.image.naturalWidth || t.image.width || 1,
          t.image.naturalHeight || t.image.height || 1
        );
      }
    });
    loader.load(imageB, (t) => {
      if (this.material) {
        this.material.uniforms.uImageSizeB.value.set(
          t.image.naturalWidth || t.image.width || 1,
          t.image.naturalHeight || t.image.height || 1
        );
      }
    });

    // Create plane geometry matching container
    const geometry = new THREE.PlaneGeometry(width, height);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Mark container as WebGL active (hides fallback img)
    container.classList.add('webgl-active');

    // --- Event Listeners ---

    // Mouse tracking within container (normalized 0-1)
    this._onMouseMove = (e) => {
      const bounds = this.container.getBoundingClientRect();
      this._mouseNorm.x = (e.clientX - bounds.left) / bounds.width;
      this._mouseNorm.y = 1.0 - (e.clientY - bounds.top) / bounds.height; // Flip Y: screen top→bottom to GL bottom→top
    };
    container.addEventListener('mousemove', this._onMouseMove);

    // Hover in — animate mask radius appearance
    this._onMouseEnter = (e) => {
      // Set initial mouse position immediately to prevent mask snapping from center
      const bounds = this.container.getBoundingClientRect();
      this._mouseNorm.x = (e.clientX - bounds.left) / bounds.width;
      this._mouseNorm.y = 1.0 - (e.clientY - bounds.top) / bounds.height;
      this._mouseEased.x = this._mouseNorm.x;
      this._mouseEased.y = this._mouseNorm.y;

      if (this._hoverTween) this._hoverTween.kill();
      this._hoverTween = gsap.to(this.material.uniforms.uHover, {
        value: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    container.addEventListener('mouseenter', this._onMouseEnter);

    // Hover out — shrink mask away
    this._onMouseLeave = () => {
      if (this._hoverTween) this._hoverTween.kill();
      this._hoverTween = gsap.to(this.material.uniforms.uHover, {
        value: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    };
    container.addEventListener('mouseleave', this._onMouseLeave);

    // Touch support — follow finger position
    this._onTouchStart = (e) => {
      const touch = e.touches[0];
      const bounds = this.container.getBoundingClientRect();
      this._mouseNorm.x = (touch.clientX - bounds.left) / bounds.width;
      this._mouseNorm.y = 1.0 - (touch.clientY - bounds.top) / bounds.height;
      this._mouseEased.x = this._mouseNorm.x;
      this._mouseEased.y = this._mouseNorm.y;

      if (this._hoverTween) this._hoverTween.kill();
      this._hoverTween = gsap.to(this.material.uniforms.uHover, {
        value: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    container.addEventListener('touchstart', this._onTouchStart, { passive: true });

    this._onTouchMove = (e) => {
      const touch = e.touches[0];
      const bounds = this.container.getBoundingClientRect();
      this._mouseNorm.x = (touch.clientX - bounds.left) / bounds.width;
      this._mouseNorm.y = 1.0 - (touch.clientY - bounds.top) / bounds.height;
    };
    container.addEventListener('touchmove', this._onTouchMove, { passive: true });

    this._onTouchEnd = () => {
      if (this._hoverTween) this._hoverTween.kill();
      this._hoverTween = gsap.to(this.material.uniforms.uHover, {
        value: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    };
    container.addEventListener('touchend', this._onTouchEnd);

    // Resize
    this._onResize = () => this._handleResize();
    window.addEventListener('resize', this._onResize);

    // Start render loop
    this.active = true;
    this._tick();
  }

  _handleResize() {
    if (!this.active || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera.left = width / -2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = height / -2;
    this.camera.updateProjectionMatrix();

    // Update plane geometry
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      const newGeom = new THREE.PlaneGeometry(width, height);
      this.mesh = new THREE.Mesh(newGeom, this.material);
      this.scene.add(this.mesh);
    }

    this.material.uniforms.uPlaneSize.value.set(width, height);
  }

  _tick() {
    if (!this.active) return;

    // Smooth mouse easing (lerp) for buttery-smooth follow
    const lerpFactor = 0.12;
    this._mouseEased.x += (this._mouseNorm.x - this._mouseEased.x) * lerpFactor;
    this._mouseEased.y += (this._mouseNorm.y - this._mouseEased.y) * lerpFactor;

    if (this.material) {
      this.material.uniforms.uMouse.value.set(this._mouseEased.x, this._mouseEased.y);
    }

    this.renderer.render(this.scene, this.camera);
    this._rafId = requestAnimationFrame(() => this._tick());
  }

  destroy() {
    this.active = false;

    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    if (this._hoverTween) {
      this._hoverTween.kill();
      this._hoverTween = null;
    }

    if (this.container) {
      if (this._onMouseMove) this.container.removeEventListener('mousemove', this._onMouseMove);
      if (this._onMouseEnter) this.container.removeEventListener('mouseenter', this._onMouseEnter);
      if (this._onMouseLeave) this.container.removeEventListener('mouseleave', this._onMouseLeave);
      if (this._onTouchStart) this.container.removeEventListener('touchstart', this._onTouchStart);
      if (this._onTouchMove) this.container.removeEventListener('touchmove', this._onTouchMove);
      if (this._onTouchEnd) this.container.removeEventListener('touchend', this._onTouchEnd);
      this.container.classList.remove('webgl-active');
    }

    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
    }

    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }

    if (this.material) {
      if (this.material.uniforms.uTextureA.value) this.material.uniforms.uTextureA.value.dispose();
      if (this.material.uniforms.uTextureB.value) this.material.uniforms.uTextureB.value.dispose();
      this.material.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    this.container = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.mesh = null;
    this.material = null;
    this.canvas = null;
  }
}

// ---------- Auto-Initialize ----------

const avatarReveal = new AvatarHoverMaskReveal();

function initAvatarWebGL() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => avatarReveal.init(), 300);
    });
  } else {
    setTimeout(() => avatarReveal.init(), 300);
  }
}

initAvatarWebGL();

export { avatarReveal };
