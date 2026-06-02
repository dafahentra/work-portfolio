/* ==========================================================================
   WebGL Stage — Yuta Abe-Inspired Scroll & Pixel Transition
   ========================================================================== */

import * as THREE from 'three/build/three.min.js';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

// Register CustomEase for the title wipe animation
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create("titleReveal", "M0,0 C0.496,0.004 0,1 1,1");
  } catch (e) {
    console.warn("CustomEase creation failed, fallback ease will be used:", e);
  }
}

// Design Constants
const GRID_COLS = window.innerWidth < 768 ? 120 : 200; // Grid density matching Yuta Abe (80 cols desktop, 50 mobile)
const TITLE_GRID_COLS = 1024;
const TITLE_GRID_ROWS = 256;

// ---------- 1. Title Shader (Canvas Text Masking & Wipe) ----------
const titleVertexShader = `
  varying vec2 vUv;
  varying vec2 vWorldPos;

  void main() {
      vUv = uv;
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const titleFragmentShader = `
  #define MAX_IMAGE_RECTS 4
  uniform sampler2D uTexture;
  uniform float uReveal;
  uniform vec4 uImageRects[MAX_IMAGE_RECTS];
  uniform int uImageCount;
  uniform float uImageBottomY;
  varying vec2 vUv;
  varying vec2 vWorldPos;

  void main() {
      // Discard text pixels that overlap with hero images (creating the sweep mask effect)
      for (int i = 0; i < MAX_IMAGE_RECTS; i++) {
          if (i >= uImageCount) break;
          vec4 r = uImageRects[i];
          if (r.z > 0.0 && r.w > 0.0) {
              vec2 d = abs(vWorldPos - r.xy);
              if (d.x < r.z && d.y < r.w) discard;
          }
      }

      // Hide text below the bottom-most scrolling hero image
      if (uImageBottomY > vWorldPos.y) discard;

      // Smooth revealing wipe from bottom to top
      float edge = 0.04;
      float alpha = 1.0 - smoothstep(uReveal - edge, uReveal, vUv.y);
      if (alpha <= 0.001) discard;

      vec4 tex = texture2D(uTexture, vUv);
      gl_FragColor = vec4(tex.rgb, tex.a * alpha);
  }
`;

// ---------- 2. Instanced Hero Image Shaders (Interactive Pixel-Wrapping) ----------
const imageVertexShader = `
  attribute vec2 aGridPos;
  attribute float aBump;

  uniform vec2 uGrid;
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;
  uniform vec2 uMouseLocal;
  uniform float uMouseRadius;

  varying vec2 vTexUv;
  varying vec2 vBlockUv;
  varying vec2 vGridPos;
  varying float vBump;
  varying float vProximity;

  void main() {
      vec2 blockUv = (aGridPos + uv) / uGrid;
      vBlockUv = uv;

      // Preserve image aspect ratio inside instanced planes (background-size: cover)
      float planeAspect = uPlaneSize.x / uPlaneSize.y;
      float imageAspect = uImageSize.x / uImageSize.y;
      vec2 scale;
      if (planeAspect > imageAspect) {
          scale = vec2(1.0, imageAspect / planeAspect);
      } else {
          scale = vec2(planeAspect / imageAspect, 1.0);
      }
      vTexUv = (blockUv - 0.5) * scale + 0.5;
      vGridPos = aGridPos;
      vBump = aBump;

      float bumpMask = clamp(aBump * 3.0, 0.0, 1.0);
      
      // Calculate cursor displacement repulsion direction & proximity
      vec2 blockCenter = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xy;
      vec2 fromCursor = blockCenter - uMouseLocal;
      float dist = length(fromCursor);
      
      float proximity = 1.0 - smoothstep(0.0, uMouseRadius, dist);
      float coreHole = smoothstep(0.0, uMouseRadius * 0.45, dist);
      float effect = proximity * coreHole;
      
      vec2 repelDir = dist > 0.001 ? fromCursor / dist : vec2(0.0, 1.0);
      vProximity = effect;

      // Displace position dynamically based on bump mapping (text overlap) & cursor distance
      vec4 worldPos = instanceMatrix * vec4(position, 1.0);
      worldPos.xy += repelDir * 20.0 * bumpMask * effect; // Push pixels out horizontally/vertically
      
      gl_Position = projectionMatrix * modelViewMatrix * worldPos;
  }
`;

const imageFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouseLocal;
  uniform vec2 uPlaneSize;

  varying vec2 vTexUv;
  varying vec2 vBlockUv;
  varying vec2 vGridPos;
  varying float vBump;
  varying float vProximity;

  void main() {
      // Amplify text overlap density map
      float bumpN = clamp(vBump * 30.0, 0.0, 1.0);

      // Add slight parallax relative to cursor distance
      vec2 cursorParallax = (uMouseLocal / uPlaneSize) * 0.08 * bumpN * vProximity;

      // Add visual row scanline offset
      float rowParity = mod(floor(vGridPos.y), 2.0);
      float scanDir = rowParity * 2.0 - 1.0;
      float scanShift = scanDir * bumpN * 0.0001;

      vec2 baseUv = vTexUv + cursorParallax + vec2(scanShift, 0.0);

      // Chromatic aberration (RGB shift) precisely around text borders
      float rgbShift = bumpN * 0.002 * (1.0 - vProximity * 0.8);
      vec2 uvR = clamp(baseUv + vec2(rgbShift, 0.0), 0.001, 0.999);
      vec2 uvG = clamp(baseUv,                         0.001, 0.999);
      vec2 uvB = clamp(baseUv - vec2(rgbShift, 0.0), 0.001, 0.999);

      float r = texture2D(uTexture, uvR).r;
      float g = texture2D(uTexture, uvG).g;
      float b = texture2D(uTexture, uvB).b;
      vec3 col = vec3(r, g, b);

      // Modular grid gap borders between instance cells
      vec2 edgeDist = min(vBlockUv, 1.0 - vBlockUv);
      float edgeMin = min(edgeDist.x, edgeDist.y);
      float gap = pow(1.0 - smoothstep(0.0, 0.10, edgeMin), 3.0);

      // Determine the opacity based on text overlap density (bumpN)
      float alpha = smoothstep(0.15, 0.7, bumpN);
      if (alpha <= 0.001) discard; // Discard completely if transparent (blends with light/dark background)

      // Darken the block borders inside the letters
      col = mix(col, col * 0.1, gap * bumpN);

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), alpha);
  }
`;

class WebGLStage {
  constructor() {
    this.active = false;
    this.canvas = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    
    this.titleMesh = null;
    this._titleEl = null;
    this.imageMeshes = [];
    this._textureLoader = null;
    this._scrollEl = null;
    
    this._titleCoverageMap = null;
    this._titlePadTopFrac = 0;
    
    // Smooth physics states
    this._mouseTarget = new THREE.Vector2(0, 0);
    this._mouseEased = new THREE.Vector2(0, 0);
    this._mouseTrail = new THREE.Vector2(0, 0);
    
    this._dummy = new THREE.Object3D();
    
    this._onMouseMove = null;
    this._onScroll = null;
    this._onResize = null;
    this._themeObserver = null;
    this._titleCanvas = null;
    this._titleCanvasCtx = null;
    this._titleTexture = null;
    this._rafId = null;
  }

  init() {
    this.destroy();

    // Select HTML target components
    const titleEl = document.querySelector('.ws-hero__title');
    const heroImgEl = document.querySelector('.ws-image--hero img');
    
    if (!titleEl && !heroImgEl) return;

    this._titleEl = titleEl;
    this._scrollEl = document.querySelector('[data-scroll-container]') || window;

    // Create fullscreen Overlay Canvas
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'webgl-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.zIndex = '5';
      this.canvas.style.pointerEvents = 'none'; // Clicks pass through to DOM below
      document.body.appendChild(this.canvas);
    }

    // Initialize Three.js Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new THREE.Scene();

    // 1:1 Pixel Mapping Camera Configuration
    const fov = 45;
    const fovRad = (fov * Math.PI) / 180;
    this.camera = new THREE.PerspectiveCamera(fov, width / height, 1, 2000);
    this.camera.position.z = height / (2 * Math.tan(fovRad / 2));

    this._textureLoader = new THREE.TextureLoader();

    // Mouse Tracking Event Listener
    this._onMouseMove = (e) => {
      this._mouseTarget.x = e.clientX - window.innerWidth / 2;
      this._mouseTarget.y = -(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', this._onMouseMove);

    // Locomotive Scroll-driven Class Binding Hooks
    this._onScroll = () => {
      const scrollY = window.locoScroll ? window.locoScroll.scroll.instance.scroll.y : window.scrollY;
      document.body.classList.toggle('is-scrolled', scrollY > 10);
      document.body.classList.toggle('is-scrolled-past-title', scrollY > window.innerHeight * 0.15);
    };
    if (window.locoScroll) {
      window.locoScroll.on('scroll', this._onScroll);
    } else {
      window.addEventListener('scroll', this._onScroll, { passive: true });
    }
    this._onScroll();

    // Resize Event Listener
    this._onResize = () => {
      this.resize();
    };
    window.addEventListener('resize', this._onResize);

    // Observe theme mode changes to dynamically redraw WebGL title text color
    this._themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-mode') {
          const activeMode = document.documentElement.getAttribute('data-mode') || 'light';
          const isDark = activeMode === 'dark';
          if (this._titleEl && this._titleCanvas && this._titleCanvasCtx && this._titleTexture) {
            this._drawTitleCanvas(
              this._titleEl,
              this._titleCanvas,
              this._titleCanvasCtx,
              this._titleCanvasW,
              this._titleCanvasH,
              isDark
            );
            this._titleTexture.needsUpdate = true;
          }
        }
      });
    });
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mode']
    });

    // Asynchronously Initialise WebGL meshes to prevent main-thread freezing
    if (titleEl) {
      const initTitleSafe = () => {
        if (this.active) this._initTitle(titleEl);
      };
      if (document.fonts) {
        document.fonts.ready.then(initTitleSafe);
      } else {
        setTimeout(initTitleSafe, 400);
      }
    }

    if (heroImgEl) {
      const initImgSafe = () => {
        if (heroImgEl.complete && heroImgEl.naturalWidth > 0) {
          this._initImage(heroImgEl, 0);
        } else {
          heroImgEl.addEventListener('load', () => this._initImage(heroImgEl, 0), { once: true });
        }
      };
      setTimeout(initImgSafe, 300);
    }

    this.active = true;
    this.tick();
  }

  tick() {
    if (!this.active) return;
    this.render();
    this._rafId = requestAnimationFrame(() => this.tick());
  }

  render() {
    if (!this.active) return;

    // Sync WebGL Title Pos to DOM element bounds
    if (this.titleMesh && this._titleEl) {
      this._syncTitlePos();
    }

    // Sync WebGL Image Pos to DOM element bounds
    for (const mesh of this.imageMeshes) {
      this._syncImagePos(mesh);
    }

    // Ease Cursor Coordinates
    this._mouseEased.x += (this._mouseTarget.x - this._mouseEased.x) * 0.15;
    this._mouseEased.y += (this._mouseTarget.y - this._mouseEased.y) * 0.15;
    this._mouseTrail.x += (this._mouseEased.x - this._mouseTrail.x) * 0.05;
    this._mouseTrail.y += (this._mouseEased.y - this._mouseTrail.y) * 0.05;

    const time = performance.now() * 0.001;

    // Sync image boxes list to Title Shader (for layout cut-outs)
    if (this.titleMesh) {
      const uniforms = this.titleMesh.material.uniforms;
      const rectsList = uniforms.uImageRects.value;
      const count = Math.min(this.imageMeshes.length, rectsList.length);
      let bottomY = -999999;

      for (let i = 0; i < count; i++) {
        const mesh = this.imageMeshes[i];
        rectsList[i].set(
          mesh.position.x,
          mesh.position.y,
          mesh.userData.pw * 0.5,
          mesh.userData.ph * 0.5
        );
        const imgBottom = mesh.position.y - mesh.userData.ph * 0.5;
        if (imgBottom > bottomY) bottomY = imgBottom;
      }
      for (let i = count; i < rectsList.length; i++) {
        rectsList[i].set(0, 0, 0, 0);
      }
      uniforms.uImageCount.value = count;
      uniforms.uImageBottomY.value = bottomY;
    }

    // Update shaders and compute dynamic pixel grid displacement (CPU-side text overlap map)
    const trailX = this._mouseTrail.x;
    const trailY = this._mouseTrail.y;
    const titleBounds = this.titleMesh ? this._titleEl.getBoundingClientRect() : null;

    for (const mesh of this.imageMeshes) {
      const uniforms = mesh.material.uniforms;
      uniforms.uTime.value = time;
      uniforms.uMouseLocal.value.set(trailX - mesh.position.x, trailY - mesh.position.y);
      this._updateBlockEffects(mesh, titleBounds);
    }

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    if (!this.active) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Resize Renderer
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update Camera aspect
    this.camera.aspect = width / height;
    const fov = 45;
    const fovRad = (fov * Math.PI) / 180;
    this.camera.position.z = height / (2 * Math.tan(fovRad / 2));
    this.camera.updateProjectionMatrix();

    // Reconstruct meshes to prevent offset bugs during sizing changes
    if (this._titleEl) {
      const originalTitle = this._titleEl;
      if (this.titleMesh) {
        this.scene.remove(this.titleMesh);
        this.titleMesh.geometry.dispose();
        if (this.titleMesh.material.uniforms.uTexture.value) {
          this.titleMesh.material.uniforms.uTexture.value.dispose();
        }
        this.titleMesh.material.dispose();
        this.titleMesh = null;
      }
      this._titleEl = null;
      originalTitle.style.opacity = '';
      this._initTitle(originalTitle, { skipReveal: true });
    }

    const imgMetas = this.imageMeshes.map(m => ({ el: m.userData.el, index: m.userData.index }));
    for (const mesh of this.imageMeshes) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material.uniforms.uTexture.value) {
        mesh.material.uniforms.uTexture.value.dispose();
      }
      mesh.material.dispose();
    }
    this.imageMeshes = [];

    for (const meta of imgMetas) {
      this._initImage(meta.el, meta.index);
    }
  }

  destroy() {
    this.active = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    if (this._onMouseMove) {
      window.removeEventListener('mousemove', this._onMouseMove);
      this._onMouseMove = null;
    }

    if (this._onScroll) {
      if (window.locoScroll) {
        window.locoScroll.off('scroll', this._onScroll);
      } else {
        window.removeEventListener('scroll', this._onScroll);
      }
      this._onScroll = null;
    }

    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
      this._onResize = null;
    }

    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }

    this._titleCanvas = null;
    this._titleCanvasCtx = null;
    this._titleTexture = null;

    // Clean style overrides
    document.body.classList.remove('is-scrolled', 'is-scrolled-past-title');

    // Dispose Meshes
    if (this.titleMesh) {
      this.scene.remove(this.titleMesh);
      this.titleMesh.geometry.dispose();
      if (this.titleMesh.material.uniforms.uTexture.value) {
        this.titleMesh.material.uniforms.uTexture.value.dispose();
      }
      this.titleMesh.material.dispose();
      this.titleMesh = null;
    }
    if (this._titleEl) {
      this._titleEl.style.opacity = '';
      this._titleEl = null;
    }

    for (const mesh of this.imageMeshes) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material.uniforms.uTexture.value) {
        mesh.material.uniforms.uTexture.value.dispose();
      }
      mesh.material.dispose();
      if (mesh.userData.el) mesh.userData.el.style.opacity = '';
    }
    this.imageMeshes = [];

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }

    this._titleCoverageMap = null;
    this._titlePadTopFrac = 0;
  }

  // ---------- Private WebGL Generators ----------

  _drawTitleCanvas(element, canvas, ctx, w, h, isDark) {
    const cssStyle = window.getComputedStyle(element);
    const dpr = Math.min(window.devicePixelRatio, 2);
    const paddingMultiplier = 0.15;
    
    // Recalculate original metrics for fonts
    const rect = element.getBoundingClientRect();
    const canvasH = Math.ceil(rect.height * dpr);
    const topPad = Math.ceil(canvasH * paddingMultiplier);
    const downscale = Math.min(1, 4096 / Math.max(Math.ceil(rect.width * dpr), canvasH + topPad * 2));

    const fontSize = parseFloat(cssStyle.fontSize) * dpr * downscale;
    const fontWeight = cssStyle.fontWeight || '400';
    const fontFamily = cssStyle.fontFamily;
    const textAlign = (cssStyle.textAlign || 'center').toLowerCase();

    let renderAlign = 'center';
    let renderX = w / 2;
    let baseTranslateX = w / 2;
    if (textAlign === 'left' || textAlign === 'start') {
      renderAlign = 'left';
      renderX = 0;
      baseTranslateX = 0;
    } else if (textAlign === 'right' || textAlign === 'end') {
      renderAlign = 'right';
      renderX = w;
      baseTranslateX = w;
    }

    ctx.clearRect(0, 0, w, h);
    
    // Explicit contrast colors to prevent race conditions during transitions
    ctx.fillStyle = isDark ? '#F0EDE8' : '#1F2937';
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = renderAlign;
    ctx.textBaseline = 'middle';

    const textLines = this._getTextLines(element) || [element.textContent.trim().toUpperCase()];

    if (textLines.length === 1) {
      const textW = ctx.measureText(textLines[0]).width;
      if (textW > w) {
        ctx.save();
        ctx.translate(baseTranslateX, h / 2);
        ctx.scale(w / textW, 1);
        ctx.fillText(textLines[0], 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(textLines[0], renderX, h / 2);
      }
    } else {
      const lineHeightVal = parseFloat(cssStyle.lineHeight);
      const computedLineH = isNaN(lineHeightVal) ? fontSize * 1.15 : lineHeightVal * dpr * downscale;
      const totalBlockH = textLines.length * computedLineH;
      const startY = (h - totalBlockH) / 2 + computedLineH / 2;

      for (let i = 0; i < textLines.length; i++) {
        const textW = ctx.measureText(textLines[i]).width;
        if (textW > w) {
          ctx.save();
          ctx.translate(baseTranslateX, startY + i * computedLineH);
          ctx.scale(w / textW, 1);
          ctx.fillText(textLines[i], 0, 0);
          ctx.restore();
        } else {
          ctx.fillText(textLines[i], renderX, startY + i * computedLineH);
        }
      }
    }
  }

  _initTitle(element, { skipReveal = false } = {}) {
    this._titleEl = element;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Draw high-DPI text representation inside a 2D Canvas
    const dpr = Math.min(window.devicePixelRatio, 2);
    const canvasLimit = 4096;
    const paddingMultiplier = 0.15;

    const canvasW = Math.ceil(rect.width * dpr);
    const canvasH = Math.ceil(rect.height * dpr);
    const topPad = Math.ceil(canvasH * paddingMultiplier);

    const downscale = Math.min(1, canvasLimit / Math.max(canvasW, canvasH + topPad * 2));
    const finalW = Math.ceil(canvasW * downscale);
    const finalH = Math.ceil(canvasH * downscale);
    const finalPad = Math.ceil(topPad * downscale);
    const finalCanvasH = finalH + finalPad * 2;

    this._titlePadTopFrac = finalCanvasH > 0 ? finalPad / finalCanvasH : 0;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = finalW;
    offCanvas.height = finalCanvasH;

    const ctx = offCanvas.getContext('2d');
    if (!ctx) return;

    // Determine the active theme mode robustly, handling race conditions from localStorage/media query
    let activeMode = document.documentElement.getAttribute('data-mode');
    if (!activeMode && typeof localStorage !== 'undefined') {
      activeMode = localStorage.getItem('mode');
    }
    if (!activeMode && window.matchMedia) {
      activeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const isDark = activeMode === 'dark';

    // Draw the title text using helper
    this._drawTitleCanvas(element, offCanvas, ctx, finalW, finalCanvasH, isDark);

    // Save offscreen canvas references for dynamic redrawing on theme toggle
    this._titleCanvas = offCanvas;
    this._titleCanvasCtx = ctx;
    this._titleCanvasW = finalW;
    this._titleCanvasH = finalCanvasH;

    // Convert offscreen canvas to GPU Texture
    const texture = new THREE.CanvasTexture(offCanvas);
    texture.needsUpdate = true;
    this._titleTexture = texture;

    // Generate 512x128 CPU-side Grayscale Alpha Coverage Map
    const imgData = ctx.getImageData(0, 0, finalW, finalCanvasH);
    const coverageBuffer = new Float32Array(TITLE_GRID_COLS * TITLE_GRID_ROWS);

    for (let row = 0; row < TITLE_GRID_ROWS; row++) {
      for (let col = 0; col < TITLE_GRID_COLS; col++) {
        const xStart = Math.floor(col * finalW / TITLE_GRID_COLS);
        const xEnd = Math.ceil((col + 1) * finalW / TITLE_GRID_COLS);
        const yStart = Math.floor(row * finalCanvasH / TITLE_GRID_ROWS);
        const yEnd = Math.ceil((row + 1) * finalCanvasH / TITLE_GRID_ROWS);

        let sumAlpha = 0;
        let countPixels = 0;

        for (let y = yStart; y < yEnd; y++) {
          for (let x = xStart; x < xEnd; x++) {
            if (x < finalW && y < finalCanvasH) {
              sumAlpha += imgData.data[(y * finalW + x) * 4 + 3];
              countPixels++;
            }
          }
        }
        coverageBuffer[row * TITLE_GRID_COLS + col] = countPixels > 0 ? sumAlpha / (countPixels * 255) : 0;
      }
    }

    this._titleCoverageMap = {
      cols: TITLE_GRID_COLS,
      rows: TITLE_GRID_ROWS,
      data: coverageBuffer
    };

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: titleVertexShader,
      fragmentShader: titleFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uReveal: { value: 0 },
        uImageRects: { value: [new THREE.Vector4(0,0,0,0), new THREE.Vector4(0,0,0,0), new THREE.Vector4(0,0,0,0), new THREE.Vector4(0,0,0,0)] },
        uImageCount: { value: 0 },
        uImageBottomY: { value: -999999 }
      },
      transparent: true,
      depthWrite: false
    });

    this.titleMesh = new THREE.Mesh(geometry, material);
    this.titleMesh.scale.set(rect.width, rect.height * finalCanvasH / finalH, 1);
    this.titleMesh.renderOrder = 0;
    this._syncTitlePos();
    this.scene.add(this.titleMesh);

    // Hide original DOM element
    element.style.opacity = '0';

    // TriggerGSAP Entrance Wipe reveal
    const maxReveal = 1.04;
    if (skipReveal) {
      material.uniforms.uReveal.value = maxReveal;
    } else {
      material.uniforms.uReveal.value = 0;
      gsap.to(material.uniforms.uReveal, {
        value: maxReveal,
        duration: 1.1,
        ease: "titleReveal",
        delay: 0.45
      });
    }
  }

  _initImage(element, index) {
    if (this.imageMeshes.some(m => m.userData.el === element)) return;

    const rect = element.getBoundingClientRect();
    const width = Math.max(rect.width > 0 ? rect.width : 100, 1);
    const height = Math.max(rect.height > 0 ? rect.height : 100, 1);

    const cols = GRID_COLS;
    const cellSize = width / cols;
    const rows = Math.max(1, Math.round(height / cellSize));
    const totalInstances = cols * rows;

    // Create dynamic geometry for InstancedMesh
    const geometry = new THREE.PlaneGeometry(1, 1);
    const gridPositions = new Float32Array(totalInstances * 2);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const instIdx = r * cols + c;
        gridPositions[instIdx * 2] = c;
        gridPositions[instIdx * 2 + 1] = r;
      }
    }

    geometry.setAttribute('aGridPos', new THREE.InstancedBufferAttribute(gridPositions, 2));

    const bumpArray = new Float32Array(totalInstances);
    const bumpAttribute = new THREE.InstancedBufferAttribute(bumpArray, 1);
    bumpAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('aBump', bumpAttribute);

    const texture = this._textureLoader.load(element.src, (tex) => {
      const mesh = this.imageMeshes.find(m => m.userData.el === element);
      if (!mesh) return;
      const naturalW = (tex.image && (tex.image.naturalWidth || tex.image.width)) || 1;
      const naturalH = (tex.image && (tex.image.naturalHeight || tex.image.height)) || 1;
      mesh.material.uniforms.uImageSize.value.set(naturalW, naturalH);
    });

    const material = new THREE.ShaderMaterial({
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uGrid: { value: new THREE.Vector2(cols, rows) },
        uPlaneSize: { value: new THREE.Vector2(width, height) },
        uImageSize: { value: new THREE.Vector2(element.naturalWidth > 0 ? element.naturalWidth : 1, element.naturalHeight > 0 ? element.naturalHeight : 1) },
        uTime: { value: 0 },
        uMouseLocal: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 150 }
      },
      transparent: true,
      depthWrite: false
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, totalInstances);
    instancedMesh.renderOrder = 1;
    instancedMesh.userData = {
      el: element,
      index: index,
      cols: cols,
      rows: rows,
      pw: width,
      ph: height,
      sCurrents: new Float32Array(totalInstances),
      sSeeds: new Float32Array(totalInstances),
      bumpAttr: bumpAttribute
    };

    // Allocate random speed multipliers to cell block easing for standard organic noise jitter
    for (let i = 0; i < totalInstances; i++) {
      instancedMesh.userData.sSeeds[i] = 0.5 + Math.random() * 0.5;
    }

    this._setInstanceMatrices(instancedMesh, width, height);
    this._syncImagePos(instancedMesh);
    
    this.scene.add(instancedMesh);
    this.imageMeshes.push(instancedMesh);

    // Hide original image element
    element.style.opacity = '0';
  }

  _setInstanceMatrices(mesh, width, height) {
    const cols = mesh.userData.cols;
    const rows = mesh.userData.rows;
    const cellW = width / cols;
    const cellH = height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const instIdx = r * cols + c;
        const posX = (c + 0.5 - cols / 2) * cellW;
        const posY = (r + 0.5 - rows / 2) * cellH;

        this._dummy.position.set(posX, posY, 0);
        this._dummy.scale.set(cellW, cellH, 1);
        this._dummy.rotation.set(0, 0, 0);
        this._dummy.updateMatrix();

        mesh.setMatrixAt(instIdx, this._dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  _updateBlockEffects(mesh, titleRect) {
    if (!this._titleEl || !titleRect) return;

    const imgRect = mesh.userData._cachedRect || mesh.userData.el.getBoundingClientRect();
    const tCurrents = mesh.userData.sCurrents;
    const tSeeds = mesh.userData.sSeeds;
    const cols = mesh.userData.cols;
    const rows = mesh.userData.rows;

    const isOverlapping = (
      imgRect.bottom > titleRect.top - 10 &&
      imgRect.top < titleRect.bottom + 10 &&
      imgRect.right > titleRect.left - 10 &&
      imgRect.left < titleRect.right + 10
    );

    const lerpSpeed = 0.1;
    const ampFactor = 0.5;
    let attributeChanged = false;

    if (isOverlapping) {
      const left = imgRect.left;
      const top = imgRect.top;
      const width = imgRect.width;
      const height = imgRect.height;
      const stepX = 1 / cols;
      const stepY = 1 / rows;

      for (let r = 0; r < rows; r++) {
        const invRow = rows - 1 - r;
        const blockTop = top + invRow * stepY * height;
        const blockBottom = top + (invRow + 1) * stepY * height;

        // Skip rows that don't overlap vertically to save CPU load
        if (!(blockBottom > titleRect.top && blockTop < titleRect.bottom)) {
          for (let c = 0; c < cols; c++) {
            const instIdx = r * cols + c;
            const current = tCurrents[instIdx];
            if (Math.abs(current) > 1e-5) {
              tCurrents[instIdx] += (0 - current) * lerpSpeed;
              if (Math.abs(tCurrents[instIdx] - current) > 1e-4) attributeChanged = true;
            }
          }
          continue;
        }

        for (let c = 0; c < cols; c++) {
          const instIdx = r * cols + c;
          const blockLeft = left + c * stepX * width;
          const blockRight = left + (c + 1) * stepX * width;

          // Sample CPU downsampled coverage map
          const density = this._sampleTitleCoverage(blockLeft, blockRight, blockTop, blockBottom, titleRect);
          const target = tSeeds[instIdx] * ampFactor * density;
          const current = tCurrents[instIdx];

          tCurrents[instIdx] += (target - current) * lerpSpeed;
          if (Math.abs(tCurrents[instIdx] - current) > 1e-4) attributeChanged = true;
        }
      }
    } else {
      // Decay back to 0 (all blocks turn black)
      let needsReset = false;
      for (let i = 0; i < tCurrents.length; i++) {
        if (Math.abs(tCurrents[i]) > 1e-4) {
          needsReset = true;
          break;
        }
      }
      if (!needsReset) return;

      for (let i = 0; i < tCurrents.length; i++) {
        const current = tCurrents[i];
        tCurrents[i] += (0 - current) * lerpSpeed;
        if (Math.abs(tCurrents[i] - current) > 1e-4) attributeChanged = true;
      }
    }

    if (attributeChanged) {
      const bumpAttr = mesh.userData.bumpAttr;
      bumpAttr.array.set(tCurrents);
      bumpAttr.needsUpdate = true;
    }
  }

  _sampleTitleCoverage(xLeft, xRight, yTop, yBottom, titleRect) {
    if (!this._titleCoverageMap) return 0;

    const { cols, rows, data } = this._titleCoverageMap;

    // Convert pixel bounds to text canvas local ratio
    const mapColStart = (xLeft - titleRect.left) / titleRect.width * cols;
    const mapColEnd = (xRight - titleRect.left) / titleRect.width * cols;

    const padding = this._titlePadTopFrac;
    const usableHeightFrac = 1 - 2 * padding;

    const mapRowStart = (padding + (yTop - titleRect.top) / titleRect.height * usableHeightFrac) * rows;
    const mapRowEnd = (padding + (yBottom - titleRect.top) / titleRect.height * usableHeightFrac) * rows;

    const colIndexStart = Math.max(0, Math.floor(mapColStart));
    const colIndexEnd = Math.min(cols - 1, Math.ceil(mapColEnd) - 1);
    const rowIndexStart = Math.max(0, Math.floor(mapRowStart));
    const rowIndexEnd = Math.min(rows - 1, Math.ceil(mapRowEnd) - 1);

    if (colIndexStart > colIndexEnd || rowIndexStart > rowIndexEnd) return 0;

    let sum = 0;
    let count = 0;

    for (let r = rowIndexStart; r <= rowIndexEnd; r++) {
      for (let c = colIndexStart; c <= colIndexEnd; c++) {
        sum += data[r * cols + c];
        count++;
      }
    }

    return count > 0 ? sum / count : 0;
  }

  _syncTitlePos() {
    const rect = this._titleEl.getBoundingClientRect();
    const posX = rect.left + rect.width / 2 - window.innerWidth / 2;
    const posY = -(rect.top + rect.height / 2 - window.innerHeight / 2);
    this.titleMesh.position.set(posX, posY, 0);
  }

  _syncImagePos(mesh) {
    const rect = mesh.userData.el.getBoundingClientRect();
    mesh.userData._cachedRect = rect;

    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    const posX = rect.left + width / 2 - window.innerWidth / 2;
    const posY = -(rect.top + height / 2 - window.innerHeight / 2);
    mesh.position.set(posX, posY, 0);

    // If size bounds changed significantly (e.g. window resize / layouts update)
    if (Math.abs(mesh.userData.pw - width) > 0.5 || Math.abs(mesh.userData.ph - height) > 0.5) {
      mesh.material.uniforms.uPlaneSize.value.set(width, height);
      mesh.userData.pw = width;
      mesh.userData.ph = height;
      this._setInstanceMatrices(mesh, width, height);
    }
  }

  _getTextLines(element) {
    const range = document.createRange();
    const lines = [];
    let currentY = null;
    let currentLineText = "";

    const flushLine = () => {
      if (currentLineText.trim()) lines.push(currentLineText.trim());
      currentLineText = "";
      currentY = null;
    };

    const traverseText = (node) => {
      for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent;
          for (let i = 0; i < text.length; i++) {
            range.setStart(child, i);
            range.setEnd(child, i + 1);
            const bounds = range.getClientRects();
            if (!bounds[0]) continue;

            const top = bounds[0].top;
            if (currentY === null || Math.abs(top - currentY) > bounds[0].height * 0.5) {
              flushLine();
              currentLineText = text[i];
              currentY = top;
            } else {
              currentLineText += text[i];
            }
          }
        } else if (child.nodeName === 'BR') {
          flushLine();
        } else {
          traverseText(child);
        }
      }
    };

    traverseText(element);
    flushLine();
    return lines.length ? lines.map(line => line.toUpperCase()) : null;
  }
}

export const webGLStage = new WebGLStage();
