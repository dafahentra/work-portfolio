import * as THREE from 'three';
import { gsap } from 'gsap';

(function () {
  'use strict';

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uRadius;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uAspect;

    varying vec2 vUv;

    void main() {
      // Aspect ratio correction (background-size: cover inside WebGL plane)
      vec2 uv = (vUv - 0.5) * uAspect + 0.5;

      // Mouse distance calculation in aspect-corrected UV space
      vec2 mouseDistVec = vUv - uMouse;
      mouseDistVec.y /= uAspect.x / uAspect.y;
      float dist = length(mouseDistVec);

      // Define transition mask edge width (feather softness)
      float edgeWidth = 0.12;

      // Create a smooth circular mask that follows the cursor
      float mask = 1.0 - smoothstep(uRadius - edgeWidth, uRadius, dist);

      // Clamp coordinates to prevent border bleeding
      vec2 uv1 = clamp(uv, 0.001, 0.999);
      vec2 uv2 = uv1; // Exact 1-to-1 mapping for seamless alignment

      vec4 tex1 = texture2D(uTexture1, uv1);
      vec4 tex2 = texture2D(uTexture2, uv2);

      // Mix the textures inside/outside the cursor-following mask
      gl_FragColor = mix(tex1, tex2, mask);
    }
  `;

  function initWebGLAvatar() {
    const containers = document.querySelectorAll('.avatar-webgl-container');
    if (!containers.length) return;

    containers.forEach((container) => {
      // Prevent double initialization
      if (container._webglInit) return;
      container._webglInit = true;

      const img = container.querySelector('img');
      const hoverSrc = container.dataset.hoverSrc;

      if (!img || !hoverSrc) return;

      // Create WebGL Canvas
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '2';
      container.appendChild(canvas);

      // WebGL Renderer context
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);

      const textureLoader = new THREE.TextureLoader();

      // Load original image texture
      const texture1 = textureLoader.load(img.src, () => {
        // Hide DOM image only after texture is loaded to prevent page flash
        img.style.opacity = '0';
        updateAspect();
      });

      // Load hover image texture
      const texture2 = textureLoader.load(hoverSrc, () => {
        updateAspect();
      });

      texture1.minFilter = THREE.LinearFilter;
      texture2.minFilter = THREE.LinearFilter;

      // Calculate container aspect ratio to match texture mapping (cover)
      const aspectVector = new THREE.Vector2(1, 1);
      
      function updateAspect() {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const containerAspect = rect.width / rect.height;
        let imgAspect = 1.0;

        if (texture1.image) {
          imgAspect = texture1.image.naturalWidth / texture1.image.naturalHeight;
        }

        if (containerAspect > imgAspect) {
          aspectVector.set(1.0, imgAspect / containerAspect);
        } else {
          aspectVector.set(containerAspect / imgAspect, 1.0);
        }
      }

      // Material
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture1: { value: texture1 },
          uTexture2: { value: texture2 },
          uRadius: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uAspect: { value: aspectVector }
        },
        depthWrite: false,
        depthTest: false
      });

      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Track Mouse coordinates relative to container
      const mouse = new THREE.Vector2(0.5, 0.5);
      const easedMouse = new THREE.Vector2(0.5, 0.5);

      // Spring physics velocity tracking
      const mouseVel = { x: 0, y: 0 };
      const springStiffness = 0.08;
      const springDamping = 0.76;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      });

      // Transition Animations
      container.addEventListener('mouseenter', (e) => {
        // Set positions instantly to avoid initial jumps
        const rect = container.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
        easedMouse.copy(mouse);
        mouseVel.x = 0;
        mouseVel.y = 0;
        material.uniforms.uMouse.value.copy(easedMouse);

        gsap.to(material.uniforms.uRadius, {
          value: 0.35, // Grows the spotlight radius
          duration: 0.85,
          ease: 'back.out(1.2)' // Adds a subtle springy overshoot on entry
        });
      });

      container.addEventListener('mouseleave', () => {
        gsap.to(material.uniforms.uRadius, {
          value: 0.0, // Shrinks the spotlight radius back to 0
          duration: 0.7,
          ease: 'power2.out'
        });
      });

      // Handle Resize dynamically via ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        renderer.setSize(rect.width, rect.height);
        updateAspect();
      });
      resizeObserver.observe(container);

      // Animation loop
      let animationFrameId;
      function animate() {
        if (!document.body.contains(container)) {
          // Cleanup if container is removed from DOM (e.g. PJAX swaps)
          cancelAnimationFrame(animationFrameId);
          resizeObserver.disconnect();
          renderer.dispose();
          geometry.dispose();
          material.dispose();
          texture1.dispose();
          texture2.dispose();
          return;
        }

        animationFrameId = requestAnimationFrame(animate);

        // Spring physics for smooth cursor tracking with elastic damping
        const forceX = (mouse.x - easedMouse.x) * springStiffness;
        mouseVel.x = (mouseVel.x + forceX) * springDamping;
        easedMouse.x += mouseVel.x;

        const forceY = (mouse.y - easedMouse.y) * springStiffness;
        mouseVel.y = (mouseVel.y + forceY) * springDamping;
        easedMouse.y += mouseVel.y;

        material.uniforms.uMouse.value.copy(easedMouse);

        material.uniforms.uTime.value = performance.now() * 0.001;

        renderer.render(scene, camera);
      }

      animate();
    });
  }

  // Bind to page loads
  document.addEventListener('DOMContentLoaded', initWebGLAvatar);
  document.addEventListener('page:load', initWebGLAvatar);

})();
