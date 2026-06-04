/* ==========================================================================
   Avatar WebGL — Hover Mask Reveal
   Faithful replica of Framer University's "Hover Mask Reveal" effect.

   Architecture (from Framer source analysis):
   - Back image: normal DOM <img> visible always
   - WebGL canvas (transparent bg): renders front/hover image with fluid mask
   - Fluid simulation: Navier-Stokes (advection → splat → divergence → pressure → velocity subtract → curl)
   - Display shader: Simplex 3D noise + fluid density → soft organic mask → reveals front image
   - Parallax: revealed image shifts opposite to cursor direction
   ========================================================================== */

import * as THREE from 'three/build/three.min.js';

// ─── Vertex shader (shared) ───────────────────────────────────────────────
const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const VERT_FLAT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// ─── Fluid shaders ────────────────────────────────────────────────────────
const FRAG_ADVECT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_source;
  uniform vec2 u_texelSize;
  uniform float u_dt;
  uniform float u_dissipation;
  void main() {
    vec2 vel = texture2D(u_velocity, vUv).xy;
    vec2 pos = vUv - vel * u_texelSize * u_dt;
    gl_FragColor = texture2D(u_source, pos) * u_dissipation;
  }
`;

const FRAG_SPLAT_VEL = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_point;
  uniform vec2 u_splatColor;
  uniform float u_radius;
  uniform float u_aspect;
  uniform sampler2D u_target;
  void main() {
    vec2 p = vUv - u_point;
    p.x *= max(u_aspect, 1.0);
    p.y *= max(1.0 / u_aspect, 1.0);
    float s = exp(-dot(p,p) / (u_radius * u_radius));
    vec4 base = texture2D(u_target, vUv);
    base.xy += s * u_splatColor;
    gl_FragColor = base;
  }
`;

const FRAG_SPLAT_DENSITY = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_point;
  uniform float u_radius;
  uniform float u_aspect;
  uniform float u_amount;
  uniform sampler2D u_target;
  void main() {
    vec2 p = vUv - u_point;
    p.x *= max(u_aspect, 1.0);
    p.y *= max(1.0 / u_aspect, 1.0);
    float s = exp(-dot(p,p) / (u_radius * u_radius));
    float base = texture2D(u_target, vUv).r;
    gl_FragColor = vec4(base + s * u_amount, 0.0, 0.0, 1.0);
  }
`;

const FRAG_DIVERGENCE = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_velocity;
  uniform vec2 u_texelSize;
  void main() {
    float L = texture2D(u_velocity, vUv - vec2(u_texelSize.x, 0.0)).x;
    float R = texture2D(u_velocity, vUv + vec2(u_texelSize.x, 0.0)).x;
    float T = texture2D(u_velocity, vUv + vec2(0.0, u_texelSize.y)).y;
    float B = texture2D(u_velocity, vUv - vec2(0.0, u_texelSize.y)).y;
    gl_FragColor = vec4(0.5 * ((R - L) + (T - B)), 0.0, 0.0, 1.0);
  }
`;

const FRAG_PRESSURE = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_pressure;
  uniform sampler2D u_divergence;
  uniform vec2 u_texelSize;
  void main() {
    float L = texture2D(u_pressure, vUv - vec2(u_texelSize.x, 0.0)).r;
    float R = texture2D(u_pressure, vUv + vec2(u_texelSize.x, 0.0)).r;
    float T = texture2D(u_pressure, vUv + vec2(0.0, u_texelSize.y)).r;
    float B = texture2D(u_pressure, vUv - vec2(0.0, u_texelSize.y)).r;
    float C = texture2D(u_divergence, vUv).r;
    gl_FragColor = vec4((L + R + T + B - C) * 0.25, 0.0, 0.0, 1.0);
  }
`;

const FRAG_GRAD_SUBTRACT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_pressure;
  uniform vec2 u_texelSize;
  void main() {
    float L = texture2D(u_pressure, vUv - vec2(u_texelSize.x, 0.0)).r;
    float R = texture2D(u_pressure, vUv + vec2(u_texelSize.x, 0.0)).r;
    float T = texture2D(u_pressure, vUv + vec2(0.0, u_texelSize.y)).r;
    float B = texture2D(u_pressure, vUv - vec2(0.0, u_texelSize.y)).r;
    vec2 vel = texture2D(u_velocity, vUv).xy;
    vel.x -= 0.5 * (R - L);
    vel.y -= 0.5 * (T - B);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

const FRAG_CURL = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D u_velocity;
  uniform vec2 u_texelSize;
  uniform float u_curl;
  void main() {
    float vL = texture2D(u_velocity, vUv - vec2(u_texelSize.x, 0.0)).y;
    float vR = texture2D(u_velocity, vUv + vec2(u_texelSize.x, 0.0)).y;
    float vT = texture2D(u_velocity, vUv + vec2(0.0, u_texelSize.y)).x;
    float vB = texture2D(u_velocity, vUv - vec2(0.0, u_texelSize.y)).x;
    float curl = (vR - vL) - (vT - vB);
    vec2 vel = texture2D(u_velocity, vUv).xy;
    float s = u_curl * 0.00015;
    vel.x += s * (vT - vB);
    vel.y += s * (vL - vR);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

// ─── Display / composite shader (exact Framer logic) ─────────────────────
const FRAG_DISPLAY = `
  precision highp float;
  varying vec2 vUv;

  uniform float u_time;
  uniform float u_progress;
  uniform vec2 u_planeRes;
  uniform float u_radius;
  uniform float u_blur;
  uniform float u_circleBoost;
  uniform float u_noiseFreq;
  uniform float u_noiseStrength;
  uniform float u_noiseSize;
  uniform float u_timeSpeed;
  uniform sampler2D u_frontImage;
  uniform float u_frontImageAspect;
  uniform float u_containerAspect;
  uniform sampler2D u_densityTex;

  // Simplex noise 3D — ashima/webgl-noise
  vec3 mod289v3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289v4(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289v4(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289v3(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 xx=x_*ns.x+ns.yyyy;
    vec4 yy=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(xx)-abs(yy);
    vec4 b0=vec4(xx.xy,yy.xy);
    vec4 b1=vec4(xx.zw,yy.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;

    // Fluid density → circular reveal boosted by circleBoost
    float density = texture2D(u_densityTex, uv).r * u_circleBoost * u_progress;

    // Animated simplex noise for organic liquid edge
    float offx = uv.x + sin(uv.y + u_time * u_timeSpeed * 0.1);
    float offy = uv.y - cos(u_time * u_timeSpeed * 0.001) * 0.01;
    float ef = u_noiseFreq / u_noiseSize;
    float n1 = snoise(vec3(offx * ef, offy * ef, u_time * u_timeSpeed)) - 1.0;
    float n2 = snoise(vec3(offx * ef * 0.5, offy * ef * 0.5, u_time * u_timeSpeed * 0.7)) - 1.0;
    float n = (n1 + n2 * 0.5) * 0.7;

    // Final mask: noise distorts the density boundary
    float finalMask = smoothstep(0.35, 0.55, (n * u_noiseStrength) + pow(density, 1.5));

    // Cover-style UV for front image
    vec2 responsiveUV = uv;
    if (u_frontImageAspect > 0.0 && u_containerAspect > 0.0) {
      if (u_frontImageAspect > u_containerAspect) {
        float scale = u_frontImageAspect / u_containerAspect;
        responsiveUV.x = (uv.x - 0.5) / scale + 0.5;
      } else {
        float scale = u_containerAspect / u_frontImageAspect;
        responsiveUV.y = (uv.y - 0.5) / scale + 0.5;
      }
    }

    // Revealed image perfectly aligned with base image (no parallax or zoom)
    vec2 sampleUV = responsiveUV;

    vec4 front = texture2D(u_frontImage, sampleUV);
    float outAlpha = front.a * finalMask;
    if (outAlpha < 0.01) outAlpha = 0.0;

    gl_FragColor = vec4(front.rgb, outAlpha);
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────
function makeRT(renderer, w, h, type) {
  return new THREE.WebGLRenderTarget(w, h, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: type || THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

// ─── Main class ───────────────────────────────────────────────────────────
class AvatarReveal {
  constructor() {
    this._wrap = null;
    this._img = null;
    this._canvas = null;
    this._renderer = null;
    this._scene = null;
    this._camera = null;      // ortho for display
    this._simCam = null;      // flat cam for fluid passes
    this._quad = null;        // full-screen quad geometry
    this._displayMesh = null;
    this._displayMat = null;

    // Fluid FBOs
    this._velocity = [null, null]; // ping-pong
    this._density = [null, null];
    this._divergence = null;
    this._pressure = [null, null];

    // Fluid materials
    this._matAdvectVel = null;
    this._matAdvectDen = null;
    this._matSplatVel = null;
    this._matSplatDen = null;
    this._matDivergence = null;
    this._matPressure = null;
    this._matGradSub = null;
    this._matCurl = null;

    // Interaction
    this._mouse = { x: 0.5, y: 0.5 };
    this._prevMouse = { x: 0.5, y: 0.5 };
    this._cursorEl = null;
    this._cx = 0; this._cy = 0;
    this._cex = 0; this._cey = 0;

    this._progress = 0;      // 0→1 on hover
    this._progressTgt = 0;
    this._time = 0;
    this._inside = false;
    this._active = false;
    this._rafId = null;
    this._simW = 128;
    this._simH = 128;

    this._onMove = null;
    this._onResize = null;
  }

  init() {
    this._wrap = document.querySelector('[data-avatar-webgl]');
    if (!this._wrap) return;

    const src1 = this._wrap.getAttribute('data-src');
    const src2 = this._wrap.getAttribute('data-hover-src');
    if (!src1 || !src2) return;

    this._img = this._wrap.querySelector('img');
    this._makeCanvas();
    this._initRenderer();
    this._buildFluid();
    this._loadTextures(src1, src2);
    this._listen();
  }

  _makeCanvas() {
    var wrap = this._wrap;
    wrap.style.position = 'relative';
    wrap.style.overflow = 'hidden';
    var cv = document.createElement('canvas');
    cv.id = 'avatar-webgl-canvas';
    cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;display:none;';
    wrap.appendChild(cv);
    this._canvas = cv;
  }

  _getSize() {
    var img = this._img;
    if (img) {
      var r = img.getBoundingClientRect();
      if (r.width > 1 && r.height > 1) return { w: Math.round(r.width), h: Math.round(r.height) };
    }
    return { w: Math.max(this._wrap.offsetWidth, 100), h: Math.max(this._wrap.offsetHeight, 100) };
  }

  _initRenderer() {
    var sz = this._getSize();

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this._renderer.setPixelRatio(1); // keep sim crisp
    this._renderer.setSize(sz.w, sz.h);
    this._renderer.setClearColor(0x000000, 0);

    // Display camera (covers [-1,1])
    this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this._camera.position.z = 1;

    // Sim camera (same space, but we use a separate scene)
    this._simCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this._simCam.position.z = 1;

    this._scene = new THREE.Scene();
    this._simScene = new THREE.Scene();

    this._quad = new THREE.PlaneGeometry(2, 2);
  }

  _buildFluid() {
    var W = this._simW, H = this._simH;
    var type = THREE.FloatType; // FloatType works universally; HalfFloat is an optimization only

    var texelSize = new THREE.Vector2(1 / W, 1 / H);

    this._velocity[0] = makeRT(this._renderer, W, H, type);
    this._velocity[1] = makeRT(this._renderer, W, H, type);
    this._density[0] = makeRT(this._renderer, W, H, THREE.FloatType);
    this._density[1] = makeRT(this._renderer, W, H, THREE.FloatType);
    this._divergence = makeRT(this._renderer, W, H, THREE.FloatType);
    this._pressure[0] = makeRT(this._renderer, W, H, THREE.FloatType);
    this._pressure[1] = makeRT(this._renderer, W, H, THREE.FloatType);

    var aspect = W / H;

    this._matAdvectVel = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_ADVECT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_source:   { value: this._velocity[0].texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipation: { value: 0.99 },
      }, depthWrite: false,
    });

    this._matAdvectDen = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_ADVECT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_source:   { value: this._density[0].texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipation: { value: 0.93 },
      }, depthWrite: false,
    });

    this._matSplatVel = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_SPLAT_VEL,
      uniforms: {
        u_target: { value: this._velocity[0].texture },
        u_point: { value: new THREE.Vector2(0.5, 0.5) },
        u_splatColor: { value: new THREE.Vector2(0, 0) },
        u_radius: { value: 0.08 },
        u_aspect: { value: aspect },
      }, depthWrite: false,
    });

    this._matSplatDen = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_SPLAT_DENSITY,
      uniforms: {
        u_target: { value: this._density[0].texture },
        u_point: { value: new THREE.Vector2(0.5, 0.5) },
        u_radius: { value: 0.08 },  // Smaller splat radius
        u_aspect: { value: aspect },
        u_amount: { value: 1.5 },  // Lower density accumulation
      }, depthWrite: false,
    });

    this._matDivergence = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_DIVERGENCE,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_texelSize: { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matPressure = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_PRESSURE,
      uniforms: {
        u_pressure:   { value: this._pressure[0].texture },
        u_divergence: { value: this._divergence.texture },
        u_texelSize:  { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matGradSub = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_GRAD_SUBTRACT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_pressure: { value: this._pressure[0].texture },
        u_texelSize: { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matCurl = new THREE.ShaderMaterial({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_CURL,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_texelSize: { value: texelSize.clone() },
        u_curl: { value: 30 },
      }, depthWrite: false,
    });
  }

  _loadTextures(src1, src2) {
    var self = this;
    var loader = new THREE.TextureLoader();
    loader.load(src2, function(t) {
      t.minFilter = t.magFilter = THREE.LinearFilter;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      var sz = self._getSize();
      if (sz.w < 2 || sz.h < 2) {
        setTimeout(function() { self._buildDisplay(t, sz); }, 100);
        return;
      }
      self._buildDisplay(t, sz);
    });
  }

  _buildDisplay(frontTex, sz) {
    var w = sz.w, h = sz.h;
    if (w < 2 || h < 2) { var self = this; setTimeout(function(){self._buildDisplay(frontTex, self._getSize());},100); return; }

    this._renderer.setSize(w, h);
    this._canvas.style.display = 'block';

    // Natural aspect of the front (hover) image
    var imgAspect = frontTex.image ? frontTex.image.naturalWidth / frontTex.image.naturalHeight : 1;

    this._displayMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG_DISPLAY,
      uniforms: {
        u_time:             { value: 0 },
        u_progress:         { value: 0 },
        u_planeRes:         { value: new THREE.Vector2(w, h) },
        u_radius:           { value: 0.16 }, // Smaller mask radius
        u_blur:             { value: 0.05 },
        u_circleBoost:      { value: 1.5 },  // Smaller boost
        u_noiseFreq:        { value: 2.5 },
        u_noiseStrength:    { value: 0.28 },
        u_noiseSize:        { value: 1.2 },
        u_timeSpeed:        { value: 0.35 },
        u_frontImage:       { value: frontTex },
        u_frontImageAspect: { value: imgAspect },
        u_containerAspect:  { value: w / h },
        u_densityTex:       { value: this._density[0].texture },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this._displayMesh = new THREE.Mesh(this._quad, this._displayMat);
    this._scene.add(this._displayMesh);

    this._active = true;
    this._loop();
  }

  // ─── Fluid step helpers ────────────────────────────────────────────────
  _simPass(mat, target) {
    var m = new THREE.Mesh(this._quad, mat);
    this._simScene.add(m);
    this._renderer.setRenderTarget(target);
    this._renderer.render(this._simScene, this._simCam);
    this._renderer.setRenderTarget(null);
    this._simScene.remove(m);
  }

  _pingpong(arr) { var t = arr[0]; arr[0] = arr[1]; arr[1] = t; }

  _stepFluid() {
    var vel = this._velocity;
    var den = this._density;
    var aspect = this._simW / this._simH;

    // Curl (vorticity confinement)
    this._matCurl.uniforms.u_velocity.value = vel[0].texture;
    this._simPass(this._matCurl, vel[1]);
    this._pingpong(vel);

    // Advect velocity
    this._matAdvectVel.uniforms.u_velocity.value = vel[0].texture;
    this._matAdvectVel.uniforms.u_source.value = vel[0].texture;
    this._simPass(this._matAdvectVel, vel[1]);
    this._pingpong(vel);

    // Advect density
    this._matAdvectDen.uniforms.u_velocity.value = vel[0].texture;
    this._matAdvectDen.uniforms.u_source.value = den[0].texture;
    this._simPass(this._matAdvectDen, den[1]);
    this._pingpong(den);

    // Splat mouse → velocity & density
    var dx = (this._mouse.x - this._prevMouse.x) * 25.0;
    var dy = (this._mouse.y - this._prevMouse.y) * 25.0;
    var speed = Math.sqrt(dx * dx + dy * dy);

    var speedThreshold = 0.06; // Minimum speed required to trigger fluid animation
    var densityAmount = 0;
    var dynamicRadius = 0.035;

    if (this._inside && speed > speedThreshold) {
      // Calculate dynamic radius and density amount based on cursor speed
      var minRadius = 0.035;
      var maxRadius = 0.13;
      dynamicRadius = minRadius + Math.min(speed, 1.5) * ((maxRadius - minRadius) / 1.5);
      densityAmount = 0.6 + Math.min(speed, 1.5) * 1.4;
    }

    if (densityAmount > 0) {
      this._matSplatDen.uniforms.u_target.value = den[0].texture;
      this._matSplatDen.uniforms.u_point.value.set(this._mouse.x, this._mouse.y);
      this._matSplatDen.uniforms.u_aspect.value = aspect;
      this._matSplatDen.uniforms.u_amount.value = densityAmount;
      this._matSplatDen.uniforms.u_radius.value = dynamicRadius;
      this._simPass(this._matSplatDen, den[1]);
      this._pingpong(den);
    }

    // Velocity splat only when mouse moves fast enough
    if (speed > speedThreshold) {
      this._matSplatVel.uniforms.u_target.value = vel[0].texture;
      this._matSplatVel.uniforms.u_point.value.set(this._mouse.x, this._mouse.y);
      this._matSplatVel.uniforms.u_splatColor.value.set(dx, dy);
      this._matSplatVel.uniforms.u_aspect.value = aspect;
      this._simPass(this._matSplatVel, vel[1]);
      this._pingpong(vel);
    }

    // Divergence
    this._matDivergence.uniforms.u_velocity.value = vel[0].texture;
    this._simPass(this._matDivergence, this._divergence);

    // Pressure solve (4 iterations)
    for (var i = 0; i < 4; i++) {
      this._matPressure.uniforms.u_pressure.value = this._pressure[0].texture;
      this._matPressure.uniforms.u_divergence.value = this._divergence.texture;
      this._simPass(this._matPressure, this._pressure[1]);
      this._pingpong(this._pressure);
    }

    // Gradient subtraction
    this._matGradSub.uniforms.u_velocity.value = vel[0].texture;
    this._matGradSub.uniforms.u_pressure.value = this._pressure[0].texture;
    this._simPass(this._matGradSub, vel[1]);
    this._pingpong(vel);

    this._prevMouse.x = this._mouse.x;
    this._prevMouse.y = this._mouse.y;
  }

  // ─── RAF loop ─────────────────────────────────────────────────────────
  _loop() {
    if (!this._active) return;
    var self = this;
    this._rafId = requestAnimationFrame(function() { self._loop(); });

    this._time += 0.016;

    // Progress easing
    var pSpeed = this._inside ? 0.04 : 0.03;
    this._progress += (this._progressTgt - this._progress) * pSpeed;

    // Cursor easing
    this._cex += (this._cx - this._cex) * 0.12;
    this._cey += (this._cy - this._cey) * 0.12;

    // Run fluid
    this._stepFluid();

    // Parallax: cursor offset relative to canvas center (in px)
    if (this._displayMat) {
      var sz = this._getSize();
      var cx2 = sz.w * this._mouse.x - sz.w * 0.5;
      var cy2 = sz.h * (1 - this._mouse.y) - sz.h * 0.5;

      this._displayMat.uniforms.u_time.value = this._time;
      this._displayMat.uniforms.u_progress.value = this._progress;
      this._displayMat.uniforms.u_densityTex.value = this._density[0].texture;
      this._displayMat.uniforms.u_planeRes.value.set(sz.w, sz.h);
      this._displayMat.uniforms.u_containerAspect.value = sz.w / sz.h;
    }

    // Render display
    this._renderer.setRenderTarget(null);
    this._renderer.render(this._scene, this._camera);
  }

  // ─── Events ──────────────────────────────────────────────────────────
  _listen() {
    var self = this;
    var wrap = this._wrap;

    this._onMove = function(e) {
      self._cx = e.clientX;
      self._cy = e.clientY;

      var rect = wrap.getBoundingClientRect();
      var inX = e.clientX >= rect.left && e.clientX <= rect.right;
      var inY = e.clientY >= rect.top  && e.clientY <= rect.bottom;
      var inside = inX && inY;

      if (inside !== self._inside) {
        self._inside = inside;
        self._progressTgt = inside ? 1 : 0;
      }

      if (inside) {
        self._mouse.x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        self._mouse.y = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
      }
    };

    this._onResize = function() {
      if (!self._renderer || !self._displayMat) return;
      var sz = self._getSize();
      self._renderer.setSize(sz.w, sz.h);
      self._displayMat.uniforms.u_planeRes.value.set(sz.w, sz.h);
      self._displayMat.uniforms.u_containerAspect.value = sz.w / sz.h;
    };

    window.addEventListener('mousemove', this._onMove, { passive: true });
    window.addEventListener('resize', this._onResize);
  }

  destroy() {
    this._active = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('resize', this._onResize);
    if (this._renderer) this._renderer.dispose();
  }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────
var _inst = null;

function _boot() {
  if (_inst) {
    try {
      _inst.destroy();
    } catch (e) {
      console.error(e);
    }
    _inst = null;
  }
  if (!document.querySelector('[data-avatar-webgl]')) return;
  _inst = new AvatarReveal();
  setTimeout(function() {
    if (_inst) _inst.init();
  }, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _boot);
} else {
  _boot();
}

document.addEventListener('page:load', _boot);

export { _inst as avatarWebGL };
