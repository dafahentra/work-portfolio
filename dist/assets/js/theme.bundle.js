/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"theme": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/components/avatar-webgl.js":
/*!**************************************************!*\
  !*** ./src/assets/js/components/avatar-webgl.js ***!
  \**************************************************/
/*! exports provided: avatarWebGL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avatarWebGL", function() { return _inst; });
/* harmony import */ var three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/build/three.min.js */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__);
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
  return new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderTarget"](w, h, {
    minFilter: three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"],
    magFilter: three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"],
    format: three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["RGBAFormat"],
    type: type || three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["HalfFloatType"],
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

    this._renderer = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
      canvas: this._canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this._renderer.setPixelRatio(1); // keep sim crisp
    this._renderer.setSize(sz.w, sz.h);
    this._renderer.setClearColor(0x000000, 0);

    // Display camera (covers [-1,1])
    this._camera = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["OrthographicCamera"](-1, 1, 1, -1, 0.1, 10);
    this._camera.position.z = 1;

    // Sim camera (same space, but we use a separate scene)
    this._simCam = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["OrthographicCamera"](-1, 1, 1, -1, 0.1, 10);
    this._simCam.position.z = 1;

    this._scene = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    this._simScene = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Scene"]();

    this._quad = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](2, 2);
  }

  _buildFluid() {
    var W = this._simW, H = this._simH;
    var type = three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]; // FloatType works universally; HalfFloat is an optimization only

    var texelSize = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1 / W, 1 / H);

    this._velocity[0] = makeRT(this._renderer, W, H, type);
    this._velocity[1] = makeRT(this._renderer, W, H, type);
    this._density[0] = makeRT(this._renderer, W, H, three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]);
    this._density[1] = makeRT(this._renderer, W, H, three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]);
    this._divergence = makeRT(this._renderer, W, H, three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]);
    this._pressure[0] = makeRT(this._renderer, W, H, three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]);
    this._pressure[1] = makeRT(this._renderer, W, H, three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["FloatType"]);

    var aspect = W / H;

    this._matAdvectVel = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_ADVECT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_source:   { value: this._velocity[0].texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipation: { value: 0.99 },
      }, depthWrite: false,
    });

    this._matAdvectDen = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_ADVECT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_source:   { value: this._density[0].texture },
        u_texelSize: { value: texelSize.clone() },
        u_dt: { value: 1 },
        u_dissipation: { value: 0.93 },
      }, depthWrite: false,
    });

    this._matSplatVel = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_SPLAT_VEL,
      uniforms: {
        u_target: { value: this._velocity[0].texture },
        u_point: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0.5, 0.5) },
        u_splatColor: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0) },
        u_radius: { value: 0.08 },
        u_aspect: { value: aspect },
      }, depthWrite: false,
    });

    this._matSplatDen = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_SPLAT_DENSITY,
      uniforms: {
        u_target: { value: this._density[0].texture },
        u_point: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0.5, 0.5) },
        u_radius: { value: 0.08 },  // Smaller splat radius
        u_aspect: { value: aspect },
        u_amount: { value: 1.5 },  // Lower density accumulation
      }, depthWrite: false,
    });

    this._matDivergence = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_DIVERGENCE,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_texelSize: { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matPressure = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_PRESSURE,
      uniforms: {
        u_pressure:   { value: this._pressure[0].texture },
        u_divergence: { value: this._divergence.texture },
        u_texelSize:  { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matGradSub = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT_FLAT, fragmentShader: FRAG_GRAD_SUBTRACT,
      uniforms: {
        u_velocity: { value: this._velocity[0].texture },
        u_pressure: { value: this._pressure[0].texture },
        u_texelSize: { value: texelSize.clone() },
      }, depthWrite: false,
    });

    this._matCurl = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
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
    var loader = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]();
    loader.load(src2, function(t) {
      t.minFilter = t.magFilter = three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"];
      t.wrapS = t.wrapT = three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"];
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

    this._displayMat = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: VERT,
      fragmentShader: FRAG_DISPLAY,
      uniforms: {
        u_time:             { value: 0 },
        u_progress:         { value: 0 },
        u_planeRes:         { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](w, h) },
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
      blending: three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["NormalBlending"],
    });

    this._displayMesh = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"](this._quad, this._displayMat);
    this._scene.add(this._displayMesh);

    this._active = true;
    this._loop();
  }

  // ─── Fluid step helpers ────────────────────────────────────────────────
  _simPass(mat, target) {
    var m = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"](this._quad, mat);
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




/***/ }),

/***/ "./src/assets/js/components/contact.js":
/*!*********************************************!*\
  !*** ./src/assets/js/components/contact.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Contact form handler - Fixed for Netlify Functions
const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Real-time validation helper
    const validateField = (field) => {
      if (!field.required && field.value.trim() === '' && field.name !== 'name' && field.name !== 'email' && field.name !== 'phone' && field.name !== 'subject') return true;

      let isValid = true;
      const value = field.value.trim();

      if (field.name === 'name' || field.name === 'subject') {
        isValid = value.length > 0;
      } else if (field.name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = value.length > 0 && emailRegex.test(value);
      } else if (field.name === 'phone') {
        const phoneDigits = value.replace(/\D/g, '');
        isValid = value.length > 0 && phoneDigits.length >= 10 && phoneDigits.length <= 15;
      }

      if (isValid) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
      return isValid;
    };

    // Attach real-time listeners to inputs
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        phone: this.phone.value.trim(),
        subject: this.subject ? this.subject.value.trim() : '',
        about: this.about.value.trim()
      };

      let isFormValid = true;
      formInputs.forEach(input => {
        if (input.name === 'name' || input.name === 'email' || input.name === 'phone' || input.name === 'subject') {
          if (!validateField(input)) {
            isFormValid = false;
          }
        }
      });

      // Stop submission if validation fails
      if (!isFormValid) {
        return;
      }

      // Disable submit button while sending
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        // Encode form data for Netlify Forms
        const encode = (data) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        };

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            'name': formData.name,
            'email': formData.email,
            'phone': formData.phone,
            'subject': formData.subject,
            'about': formData.about
          })
        });

        if (res.ok) {
          // Success notification
          alert('Message sent successfully! Thank you for reaching out.');
          this.reset();
        } else {
          // Error notification
          alert('Failed to send message. Please try again later.');
          console.error('Server error:', res.status);
        }
      } catch (err) {
        // Network or other errors
        console.error('Request error:', err);
        alert('Error sending message: ' + err.message + '\nPlease check your internet connection and try again.');
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

// Export for use in other modules if needed
if ( true && module.exports) {
  module.exports = initContactForm;
}

/***/ }),

/***/ "./src/assets/js/components/dark-mode.js":
/*!***********************************************!*\
  !*** ./src/assets/js/components/dark-mode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
    // Add no-transition class to HTML/body immediately to prevent transition flash on load
    document.documentElement.classList.add('no-transition');

    const modeToggleBtns = document.querySelectorAll('.btn-toggle-mode');
    const LIGHT_MODE = 'light';
    const DARK_MODE = 'dark';
    const MODE = 'mode';

    /**
     * On page load, check for localStorage value of mode.
     * If not set, set it to user preference (if dark mode) or light mode.
     */
    function init() {
        const mode = getMode();

        if (!mode) {
            setMode({ isInitial: true });
        } else {
            setMode({ type: mode, isInitial: true });
        }

        const clearNoTransition = () => {
            setTimeout(() => {
                document.documentElement.classList.remove('no-transition');
            }, 50);
        };

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', clearNoTransition);
        } else {
            clearNoTransition();
        }
    }

    /**
     * Set our mode
     * @param {type} String
     * @param {isInitial} Boolean
     */
    function setMode({ type = LIGHT_MODE, isInitial = false }) {
        localStorage.setItem(MODE, type);
        setHTMLAttrMode({ type });
        updateButtonIcons({ type, animate: !isInitial });
    }

    /**
     * Set HTML data attribute value for our mode
     * @param {type} String
     */
    function setHTMLAttrMode({ type }) {
        const html = document.querySelector('html');
        if (html) {
            html.setAttribute('data-mode', type);
            // Sinkronisasi dengan Bootstrap theme untuk preloader
            html.setAttribute('data-bs-theme', type);
        }
    }

    /**
     * Update button icons based on current mode with micro-animations
     * @param {type} String
     * @param {animate} Boolean
     */
    function updateButtonIcons({ type, animate = false }) {
        modeToggleBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (!animate) {
                    if (type === DARK_MODE) {
                        icon.className = 'ri-moon-line';
                        icon.style.transform = 'rotate(90deg)';
                    } else {
                        icon.className = 'ri-sun-line';
                        icon.style.transform = '';
                    }
                    icon.style.opacity = '';
                    return;
                }

                // Apply rotation and scale transition for micro-animation with elastic bounce
                icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease';
                icon.style.transform = 'rotate(180deg) scale(0)';
                icon.style.opacity = '0';

                setTimeout(() => {
                    if (type === DARK_MODE) {
                        icon.className = 'ri-moon-line';
                        icon.style.transform = 'rotate(450deg) scale(1)';
                    } else {
                        icon.className = 'ri-sun-line';
                        icon.style.transform = 'rotate(360deg) scale(1)';
                    }
                    icon.style.opacity = '1';
                }, 150);
            }
        });
    }

    /**
     * Get localStorage value for our mode
     * @returns String
     */
    function getMode() {
        const currentMode = localStorage.getItem(MODE);

        if (currentMode) {
            return currentMode;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_MODE;
        }
        
        return LIGHT_MODE;
    }

    let isTransitioning = false;

    /**
     * Toggle our mode via button in navbar
     * @param {event} Event
     * @param {HTMLElement} btn
     */
    function toggleMode(event, btn) {
        if (isTransitioning) return;

        const currentMode = getMode();
        const targetMode = currentMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
        
        const performToggle = () => {
            if (targetMode === DARK_MODE) {
                setMode({ type: DARK_MODE });
            } else {
                setMode({});
            }
        };

        // If event is present and browser supports View Transitions API
        if (event && document.startViewTransition) {
            isTransitioning = true;

            // Dapatkan titik koordinat dari event klik (atau fallback ke pusat button jika event tidak ada)
            let x = event ? event.clientX : undefined;
            let y = event ? event.clientY : undefined;

            if ((x === undefined || y === undefined) && btn) {
                const rect = btn.getBoundingClientRect();
                x = rect.left + rect.width / 2;
                y = rect.top + rect.height / 2;
            }

            if (x === undefined || y === undefined) {
                x = window.innerWidth / 2;
                y = window.innerHeight / 2;
            }

            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            // Temporarily disable standard CSS transitions during the View Transition to avoid interference
            document.documentElement.classList.add('no-transition');

            const transition = document.startViewTransition(() => {
                performToggle();
            });

            transition.ready.then(() => {
                const clipPath = [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`
                ];

                document.documentElement.animate(
                    {
                        clipPath: clipPath
                    },
                    {
                        duration: 400, // Dipercepat menjadi 400ms agar terasa lebih cepat dan mulus
                        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        pseudoElement: '::view-transition-new(root)'
                    }
                );
            });

            transition.finished
                .catch(() => {}) // Mencegah unhandled promise rejection jika transisi diinterupsi/dilewati
                .finally(() => {
                    // Re-enable normal CSS transitions
                    document.documentElement.classList.remove('no-transition');
                    isTransitioning = false;
                });
        } else {
            // Fallback for older browsers
            performToggle();
        }
    }

    if (modeToggleBtns) {
        modeToggleBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMode(e, btn);
            });
        });
    }

    init();
})();

/***/ }),

/***/ "./src/assets/js/components/locomotive-scroll.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/components/locomotive-scroll.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);



(function () {

  const scrollContainer = document.querySelector('[data-scroll-container]');

  const scroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__["default"]({
    el: scrollContainer,
    smooth: true,
    offset: ['17.5%'],
    repeat: true,
    class: 'animate',
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  window.locoScroll = scroll;

  window.addEventListener('resize', () => {
    scroll.update();
  });

  imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(scrollContainer, { background: true }, () => {
    scroll.update();
  });

})();

/***/ }),

/***/ "./src/assets/js/components/navbar.js":
/*!********************************************!*\
  !*** ./src/assets/js/components/navbar.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const menuOverlay = document.getElementById('fullscreenMenu');
  const navbar = document.querySelector('.navbar-custom');

  if (!menuOverlay) return;

  // Move overlay and navbar to body to escape Locomotive Scroll translations
  document.body.appendChild(menuOverlay);
  if (navbar) {
    document.body.insertBefore(navbar, document.body.firstChild);
  }

  // Helper to split text into staggered spans
  const splitTextIntoSpans = (element) => {
    const text = element.textContent.trim();
    element.innerHTML = '';
    [...text].forEach((char, index) => {
      if (char === ' ') {
        const space = document.createElement('span');
        space.style.display = 'inline-block';
        space.innerHTML = '&nbsp;';
        element.appendChild(space);
        return;
      }
      const charWrapper = document.createElement('span');
      charWrapper.className = 'char-wrapper';
      
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char;
      charSpan.style.setProperty('--char-index', index);
      
      const charHoverSpan = document.createElement('span');
      charHoverSpan.className = 'char-hover';
      charHoverSpan.textContent = char;
      charHoverSpan.style.setProperty('--char-index', index);
      
      charWrapper.appendChild(charSpan);
      charWrapper.appendChild(charHoverSpan);
      element.appendChild(charWrapper);
    });
  };

  // Staggered split text effect for fullscreen menu links
  const splitNavLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link .nav-text');
  splitNavLinks.forEach(splitTextIntoSpans);

  // Staggered split text effect for socials
  const socialLinks = menuOverlay.querySelectorAll('.meta-links .meta-link');
  socialLinks.forEach(splitTextIntoSpans);

  // Staggered split text effect for email
  const emailLink = menuOverlay.querySelector('.meta-email');
  if (emailLink) {
    splitTextIntoSpans(emailLink);
  }

  let closingTimeout = null;

  function openMenu() {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
      document.documentElement.classList.remove('menu-closing');
      document.body.classList.remove('menu-closing');
      closingTimeout = null;
    }

    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');

    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('data-state', 'opened');
      menuToggleBtn.setAttribute('aria-expanded', 'true');
    }

    // Stop scroll container if Locomotive Scroll is active
    if (window.locoScroll) {
      window.locoScroll.stop();
    }
  }

  function closeMenu() {
    if (closingTimeout) {
      clearTimeout(closingTimeout);
    }

    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');

    document.documentElement.classList.add('menu-closing');
    document.body.classList.add('menu-closing');

    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('data-state', 'closed');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    // Restart scroll container if Locomotive Scroll is active
    if (window.locoScroll) {
      window.locoScroll.start();
    }

    closingTimeout = setTimeout(() => {
      document.documentElement.classList.remove('menu-closing');
      document.body.classList.remove('menu-closing');
      closingTimeout = null;
    }, 1200); // 1200ms matches the close animation duration (0.4s delay + 0.8s wipe)
  }

  // Toggle button actions
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (document.body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when a navigation link is clicked
  const navLinks = menuOverlay.querySelectorAll('.fullscreen-nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // --- Active Page Detection and Highlighting ---
  function applyNavActiveState() {
    const path = window.location.pathname;

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href') || '';

      // Determine the core page name from the current path
      let pageName = path.split('/').pop().replace('.html', '');
      if (!pageName || pageName === '') pageName = 'index';

      // Determine the core page name from the link href
      let linkName = linkHref.split('/').pop().replace('.html', '');
      if (!linkName || linkName === '') linkName = 'index';

      // Exact match for the current page
      if (
        pageName === linkName ||
        (pageName === 'index' && linkName === 'home') ||
        (pageName === 'home' && linkName === 'index')
      ) {
        link.classList.add('active');
      }
      // Highlight WORK if we are inside an individual project page
      else if (path.includes('/work/') && linkName === 'work-listing') {
        link.classList.add('active');
      }
    });
  }

  // Run on first load
  applyNavActiveState();

  // Re-run on every PJAX navigation so the highlight stays in sync
  document.addEventListener('page:load', applyNavActiveState);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  // Prevent scroll propagation on overlay touch/wheel
  menuOverlay.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
  menuOverlay.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });

  // --- Dynamic Jakarta Local Time ---
  const clockElement = menuOverlay.querySelector('.time-clock');
  
  function updateTime() {
    if (!clockElement) return;
    
    // Get current time in Jakarta (UTC + 7)
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const timeString = formatter.format(new Date());
      clockElement.textContent = `${timeString} WIB`;
    } catch (e) {
      // Fallback if Intl.DateTimeFormat is not supported/fails
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const jakartaTime = new Date(utc + (3600000 * 7));
      const hours = String(jakartaTime.getHours()).padStart(2, '0');
      const minutes = String(jakartaTime.getMinutes()).padStart(2, '0');
      const seconds = String(jakartaTime.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds} WIB`;
    }
  }

  // Initial call and set interval
  updateTime();
  setInterval(updateTime, 1000);

})();


/***/ }),

/***/ "./src/assets/js/components/page-transition.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/components/page-transition.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! locomotive-scroll */ "./node_modules/locomotive-scroll/dist/locomotive-scroll.esm.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_2__);
/**
 * PJAX Page Transition Controller
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW IT WORKS (zero browser loading spinner):
 *
 *  CLICK FLOW:
 *    1. User clicks a link → intercept, call playLeave()
 *    2. Strip animation covers the viewport (~770ms)
 *    3. Simultaneously, fetch() the new page HTML in background
 *    4. After strips fully cover → swap DOM content (body innerHTML swap)
 *       + history.pushState() → URL changes, NO browser navigation
 *    5. Re-initialize all JS components on the new content
 *    6. Strip animation reveals new page
 *
 *  RESULT: Browser never navigates → zero loading spinner, zero flash.
 *
 *  FALLBACK:
 *    If fetch fails (offline, error) → fall back to window.location.href.
 *
 *  BACK/FORWARD:
 *    Handled via popstate event — same PJAX swap.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */





(function () {
    'use strict';

    // ── Config ──────────────────────────────────────────────────────────────
    const STRIPS      = 5;
    const STAGGER     = 55;   // ms between each strip
    const DURATION    = 550;  // ms per strip animation
    const LEAVE_TOTAL = DURATION + (STRIPS - 1) * STAGGER;  // ~770ms
    const ENTER_TOTAL = DURATION + (STRIPS - 1) * STAGGER;

    const overlay = document.getElementById('page-transition-overlay');
    if (!overlay) return;

    let isAnimating = false;
    const prefetched = new Set();

    // ── Utility ─────────────────────────────────────────────────────────────
    function isInternalLink(anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return false;
        if (
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('javascript:') ||
            anchor.getAttribute('target') === '_blank'
        ) return false;

        try {
            const url = new URL(href, window.location.href);
            return url.hostname === window.location.hostname;
        } catch {
            return true;
        }
    }

    function resolveUrl(href) {
        return new URL(href, window.location.href).href;
    }

    // ── Prefetch ────────────────────────────────────────────────────────────
    function prefetchUrl(href) {
        const full = resolveUrl(href);
        if (prefetched.has(full)) return;
        prefetched.add(full);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = full;
        link.as = 'document';
        document.head.appendChild(link);
    }

    // ── Strip Animations ────────────────────────────────────────────────────
    function playLeaveAnim() {
        overlay.classList.remove('is-entering');
        overlay.offsetHeight; // force reflow
        overlay.classList.add('is-leaving');
    }

    function playEnterAnim() {
        // Force overlay visible for the entire state swap.
        // Without this, the browser renders one frame between
        // removing 'is-leaving' and adding 'is-entering' where
        // the overlay has neither class → visibility:hidden → content flash.
        overlay.style.visibility = 'visible';

        // Swap classes in the SAME frame — no reflow gap.
        // Strips are already at translateY(0%) from the leaving animation;
        // is-entering keyframe starts from translateY(0%) so it's seamless.
        overlay.classList.remove('is-leaving');
        overlay.classList.add('is-entering');

        document.body.classList.add('pt-content-reveal');

        setTimeout(function () {
            overlay.classList.remove('is-entering');
            overlay.style.visibility = ''; // Let CSS control visibility again
            document.body.classList.remove('pt-content-reveal');
            isAnimating = false;
        }, ENTER_TOTAL + 150);
    }

    // ── DOM Swap ─────────────────────────────────────────────────────────────
    function swapPage(html, url) {
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');

        // Update <title>
        document.title = newDoc.title;

        // Update meta description
        const newMeta = newDoc.querySelector('meta[name="description"]');
        const oldMeta = document.querySelector('meta[name="description"]');
        if (newMeta && oldMeta) oldMeta.setAttribute('content', newMeta.getAttribute('content'));

        // Find scroll containers
        const currentContainer = document.querySelector('[data-scroll-container]');
        const newContainer     = newDoc.querySelector('[data-scroll-container]');

        if (!currentContainer || !newContainer) {
            // Fallback: shouldn't happen, but navigate normally if no container found
            window.location.href = url;
            return;
        }

        // Remove the navbar from the new container — it's persisted outside the
        // scroll container in the live DOM, so we don't want a duplicate.
        const navbarInNew = newContainer.querySelector('.navbar-custom');
        if (navbarInNew) navbarInNew.remove();

        // Destroy Locomotive Scroll before DOM mutation
        if (window.locoScroll) {
            try { window.locoScroll.destroy(); } catch (e) {}
            window.locoScroll = null;
        }

        // ── Atomic swap of ONLY the scroll container ─────────────────────────
        currentContainer.replaceWith(newContainer);

        // Sync body className (e.g. page-specific classes)
        // but keep preloader-active removed and page-loaded present
        document.body.className = newDoc.body.className;
        document.body.classList.remove('preloader-active');
        document.body.classList.add('page-loaded');

        // Re-apply dark mode (inline head script doesn't re-run over PJAX)
        const mode = localStorage.getItem('mode');
        document.documentElement.setAttribute('data-mode',    mode === 'dark' ? 'dark' : 'light');
        document.documentElement.setAttribute('data-bs-theme', mode === 'dark' ? 'dark' : 'light');

        // Force a popstate/pushstate URL change EVEN if we click the same page (to keep history stack sane)
        if (window.location.href !== url) {
            history.pushState({ pjax: true, url }, document.title, url);
        }

        // Re-initialize page-specific components
        reinitComponents();

        // Explicitly update nav active state AFTER pushState so pathname is correct
        updateNavActiveState();
    }

    // ── Component Re-initialization ──────────────────────────────────────────
    function reinitComponents() {
        // 1. Locomotive Scroll
        const scrollContainer = document.querySelector('[data-scroll-container]');
        if (scrollContainer) {
            const scroll = new locomotive_scroll__WEBPACK_IMPORTED_MODULE_0__["default"]({
                el: scrollContainer,
                smooth: true,
                offset: ['17.5%'],
                repeat: true,
                class: 'animate',
                smartphone: { smooth: true },
                tablet: { smooth: true }
            });
            window.locoScroll = scroll;

            window.addEventListener('resize', () => scroll.update());

            imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(scrollContainer, { background: true }, () => {
                scroll.update();
            });
        }

        // 2. Navbar active-state update only
        updateNavActiveState();

        // 3. Swiper — destroy existing then re-init
        if (window.Swiper || typeof Swiper !== 'undefined') {
            reinitSwipers();
        } else {
            // Swiper is bundled with vendor — access via global if available
            try { reinitSwipers(); } catch (e) {}
        }

        // 4. Typed.js
        const typedElems = document.querySelectorAll('[data-typed]');
        typedElems.forEach(elem => {
            const elemOptions = elem.dataset.typed ? JSON.parse(elem.dataset.typed) : {};
            const options = {
                typeSpeed: 50,
                backSpeed: 35,
                backDelay: 1000,
                loop: true,
                ...elemOptions
            };
            new typed_js__WEBPACK_IMPORTED_MODULE_2___default.a(elem, options);
        });

        // 5. Contact form
        initContactForm();

        // 6. Misc: page-loaded class
        document.body.classList.add('page-loaded');
        document.dispatchEvent(new CustomEvent('page:load'));
    }

    function reinitSwipers() {
        // Default data-swiper elements
        const swipers = document.querySelectorAll('[data-swiper]');
        swipers.forEach(elem => {
            // Destroy if already initialized
            if (elem.swiper) { try { elem.swiper.destroy(true, true); } catch(e) {} }
            const options = elem.dataset && elem.dataset.options ? JSON.parse(elem.dataset.options) : {};
            new window.Swiper(elem, options);
        });

        // Linked swipers on homepage
        const topEl = document.querySelector('.swiper-linked-top');
        const botEl = document.querySelector('.swiper-linked-bottom');
        if (topEl && botEl) {
            if (topEl.swiper) { try { topEl.swiper.destroy(true, true); } catch(e) {} }
            if (botEl.swiper) { try { botEl.swiper.destroy(true, true); } catch(e) {} }

            const swiperLinkedTop = new window.Swiper('.swiper-linked-top', {
                spaceBetween: 23,
                breakpoints: {
                    300: { slidesPerView: 2 },
                    999: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                },
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                }
            });
            new window.Swiper('.swiper-linked-bottom', {
                spaceBetween: 0,
                slidesPerView: 1,
                parallax: true,
                thumbs: { swiper: swiperLinkedTop },
                effect: 'fade',
                fadeEffect: { crossFade: true }
            });
        }
    }

    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Prevent double-binding
        if (contactForm._pjaxBound) return;
        contactForm._pjaxBound = true;

        const validateField = (field) => {
            if (!field.required && field.value.trim() === '' && !['name','email','phone','subject'].includes(field.name)) return true;
            let isValid = true;
            const value = field.value.trim();
            if (field.name === 'name' || field.name === 'subject') {
                isValid = value.length > 0;
            } else if (field.name === 'email') {
                isValid = value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (field.name === 'phone') {
                const digits = value.replace(/\D/g, '');
                isValid = value.length > 0 && digits.length >= 10 && digits.length <= 15;
            }
            field.classList.toggle('is-invalid', !isValid);
            return isValid;
        };

        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => { if (input.classList.contains('is-invalid')) validateField(input); });
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formInputs = this.querySelectorAll('.form-control');
            let isValid = true;
            formInputs.forEach(input => {
                if (['name','email','phone','subject'].includes(input.name)) {
                    if (!validateField(input)) isValid = false;
                }
            });
            if (!isValid) return;

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const encode = data => Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
                const res = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encode({
                        'form-name': 'contact',
                        name: this.name.value.trim(),
                        email: this.email.value.trim(),
                        phone: this.phone.value.trim(),
                        subject: this.subject ? this.subject.value.trim() : '',
                        about: this.about.value.trim()
                    })
                });
                if (res.ok) {
                    alert('Message sent successfully! Thank you for reaching out.');
                    this.reset();
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            } catch (err) {
                alert('Error sending message: ' + err.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    function reinitDarkModeButtons() {
        const modeToggleBtns = document.querySelectorAll('.btn-toggle-mode');
        const mode = localStorage.getItem('mode') || 'light';

        // Restore icon state
        modeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = mode === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
                icon.style.transform = mode === 'dark' ? 'rotate(90deg)' : '';
                icon.style.opacity = '';
            }
            if (!btn._pjaxBound) {
                btn._pjaxBound = true;
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const currentMode = localStorage.getItem('mode') || 'light';
                    const targetMode = currentMode === 'dark' ? 'light' : 'dark';
                    localStorage.setItem('mode', targetMode);
                    document.documentElement.setAttribute('data-mode', targetMode);
                    document.documentElement.setAttribute('data-bs-theme', targetMode);

                    const allBtns = document.querySelectorAll('.btn-toggle-mode');
                    allBtns.forEach(b => {
                        const ic = b.querySelector('i');
                        if (ic) {
                            ic.className = targetMode === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
                            ic.style.transform = targetMode === 'dark' ? 'rotate(90deg)' : '';
                        }
                    });
                });
            }
        });
    }

    function updateNavActiveState() {
        const menuOverlay = document.getElementById('fullscreenMenu');
        if (!menuOverlay) return;
        const currentPath = window.location.pathname;

        menuOverlay.querySelectorAll('.fullscreen-nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            
            // Determine the core page name from the current path
            let pageName = currentPath.split('/').pop().replace('.html', '');
            if (!pageName || pageName === '') pageName = 'index';
            
            // Determine the core page name from the link href
            let linkName = href.split('/').pop().replace('.html', '');
            if (!linkName || linkName === '') linkName = 'index';
            
            // Exact match for the current page
            if (pageName === linkName || (pageName === 'index' && linkName === 'home') || (pageName === 'home' && linkName === 'index')) {
                link.classList.add('active');
            } 
            // Highlight WORK if we are inside an individual project page
            else if (currentPath.includes('/work/') && linkName === 'work-listing') {
                link.classList.add('active');
            }
        });
    }

    // ── PJAX Navigate ────────────────────────────────────────────────────────
    function navigate(targetUrl) {
        if (isAnimating) return;
        isAnimating = true;

        const fullUrl = resolveUrl(targetUrl);

        // Close menu if open
        if (document.body.classList.contains('menu-open')) {
            document.documentElement.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            if (window.locoScroll) { try { window.locoScroll.start(); } catch(e) {} }
        }

        // Start strip-cover animation immediately
        playLeaveAnim();

        // Fetch new page in parallel — no browser navigation, no spinner
        const fetchPromise = fetch(fullUrl, {
            headers: { 'X-PJAX': 'true' },
            cache: 'default'
        }).then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        });

        // Wait for strips to finish covering, then swap
        setTimeout(function () {
            fetchPromise
                .then(function (html) {
                    swapPage(html, fullUrl);
                    // Small RAF delay so DOM paint settles before revealing
                    requestAnimationFrame(function () {
                        requestAnimationFrame(playEnterAnim);
                    });
                })
                .catch(function () {
                    // Fetch failed — fall back to real navigation
                    window.location.href = fullUrl;
                });
        }, LEAVE_TOTAL);
    }

    // ── Event Listeners ──────────────────────────────────────────────────────

    // Prefetch on hover
    document.addEventListener('mouseover', function (e) {
        const anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) prefetchUrl(anchor.getAttribute('href'));
    }, { passive: true });

    document.addEventListener('touchstart', function (e) {
        const anchor = e.target.closest('a');
        if (anchor && isInternalLink(anchor)) prefetchUrl(anchor.getAttribute('href'));
    }, { passive: true });

    // Intercept clicks
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a');
        if (!anchor || !isInternalLink(anchor)) return;
        e.preventDefault();
        e.stopPropagation();
        navigate(anchor.getAttribute('href'));
    });

    // Browser back / forward
    window.addEventListener('popstate', function (e) {
        navigate(window.location.href);
    });

    // BFCache restore
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            overlay.classList.remove('is-leaving', 'is-entering');
            document.body.style.visibility = '';
            document.body.style.overflow = '';
            isAnimating = false;
        }
    });

    // ── First-load reveal (direct navigation / refresh) ───────────────────
    // On first visit, body.page-loaded is added by misc.js.
    // On PJAX swap, we add it in reinitComponents().
    // No enter animation needed here — preloader handles the first load.

})();


/***/ }),

/***/ "./src/assets/js/components/preloader.js":
/*!***********************************************!*\
  !*** ./src/assets/js/components/preloader.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// ==========================================================================
// PRELOADER — Awwwards-Grade Progress Bar
//
// EXIT SEQUENCE:
//   1. Progress bar fills to 100%, pauses briefly
//   2. page-transition-overlay plays is-leaving (5 strips sweep UP from below,
//      identical to the page-to-page transition out animation)
//   3. Once strips fully cover the viewport (~770ms):
//        – preloader hidden (display:none)
//        – overlay instantly removed (visibility:hidden)
//        – page is now directly visible — NO is-entering strip reveal
//
// This gives the exact same "out" animation as a normal page transition,
// but instead of revealing via colored strips, the page appears directly.
//
// Page-to-page transitions handled separately by page-transition.js
// ==========================================================================

class SimplePreloader {
    constructor() {
        this.preloader  = document.getElementById('preloader');
        this.bar        = document.getElementById('pl-bar');
        this.percentEl  = document.getElementById('pl-percent');
        this.block      = document.getElementById('pl-block');
        this.body       = document.body;
        this.hasLoaded  = false;
        this._progress  = 0;
        this._rafId     = null;

        if (this.preloader) {
            this.init();
        }
    }

    init() {
        this.body.classList.add('preloader-active');

        const hasSeenPreloader = sessionStorage.getItem('preloader_seen_v4') === 'true';
        const isTransition     = document.documentElement.classList.contains('is-page-entering');

        if (hasSeenPreloader || isTransition) {
            // Skip — hide instantly, page-transition strips handle the reveal.
            this.preloader.classList.add('transition-only');
            this.body.classList.remove('preloader-active');
            this.hasLoaded = true;
            return;
        }

        // ── First visit ──────────────────────────────────────────────────────
        sessionStorage.setItem('preloader_seen_v4', 'true');
        this._startProgress();

        const onReady = () => {
            if (this.hasLoaded) return;
            this.hasLoaded = true;
            this._finishProgress(() => this.hidePreloader());
        };

        // Minimum display: 3200ms — matches _startProgress duration so bar
        // reaches ~70% exactly when the timer fires (never looks stalled).
        setTimeout(() => {
            if (document.readyState === 'complete') {
                onReady();
            } else {
                window.addEventListener('load', onReady, { once: true });
                setTimeout(onReady, 2500); // safety fallback
            }
        }, 3200);
    }

    // ── Phase 1: organic crawl 0 → 70% over 3200ms ───────────────────────────
    // Ease-in-out-quad: slow start → accelerates → decelerates near ceiling.
    // At CSS fade-in time (0.5s), value ≈ 2% — visually near zero. ✓
    _startProgress() {
        const CEILING  = 70;
        const DURATION = 3200;

        const ease = (t) =>
            t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const start = performance.now();

        const tick = (now) => {
            const t     = Math.min((now - start) / DURATION, 1);
            const value = Math.round(ease(t) * CEILING);
            this._setProgress(value);
            if (t < 1) this._rafId = requestAnimationFrame(tick);
        };

        this._rafId = requestAnimationFrame(tick);
    }

    // ── Phase 2: rush current → 100% in 500ms, then fire callback ────────────
    _finishProgress(callback) {
        cancelAnimationFrame(this._rafId);

        const from     = this._progress;
        const DURATION = 500;
        const start    = performance.now();

        const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

        const tick = (now) => {
            const t     = Math.min((now - start) / DURATION, 1);
            const value = Math.round(from + (100 - from) * ease(t));
            this._setProgress(value);

            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(callback, 350); // brief hold at 100% before exit
            }
        };

        requestAnimationFrame(tick);
    }

    _setProgress(value) {
        this._progress = value;
        if (this.bar)       this.bar.style.width      = value + '%';
        if (this.percentEl) this.percentEl.textContent = String(value).padStart(2, '0');
    }

    // ── Exit: strip-reveal, page shows directly (no black flash) ─────────────
    //
    // Flow:
    //   1. Preloader content fades out quickly (200ms)
    //   2. Strips snap to full-cover with page-background color (pl-exit-mode)
    //      — seamless handoff, looks like preloader is still there
    //   3. Preloader hidden instantly behind strips
    //   4. is-entering: strips lift off upward (bottom strip first), page
    //      appears directly underneath — no solid color visible, just page
    hidePreloader() {
        const overlay = document.getElementById('page-transition-overlay');

        // Timing — must match page-transition.js constants
        const STRIPS      = 5;
        const STAGGER     = 55;
        const DURATION    = 550;
        const ENTER_TOTAL = DURATION + (STRIPS - 1) * STAGGER; // ~770ms

        // ── Step 1: fade out preloader content ───────────────────────────────
        if (this.block) {
            this.block.style.transition = 'opacity 0.2s ease';
            this.block.style.opacity    = '0';
        }
        const corner = this.preloader.querySelector('.pl-corner-label');
        if (corner) {
            corner.style.transition = 'opacity 0.2s ease';
            corner.style.opacity    = '0';
        }

        // ── Step 2 (after fade): snap strips to full cover in preloader color ─
        setTimeout(() => {
            if (overlay) {
                // Change strip color to match preloader background (not black)
                overlay.classList.add('pl-exit-mode');

                // Snap all strips to translateY(0%) instantly — no animation
                overlay.classList.remove('is-leaving', 'is-entering');
                overlay.style.visibility = 'visible';
                overlay.classList.add('is-preload-ready');
                overlay.offsetHeight; // force reflow to commit position
            }

            // ── Step 3: hide preloader behind the (now same-color) strips ────
            this.preloader.style.display = 'none';
            this.body.classList.remove('preloader-active');

            // ── Step 4: play is-entering — strips lift upward, page revealed ──
            // Bottom strip (pt-strip--5) lifts first → page reveals bottom-up
            if (overlay) {
                overlay.classList.remove('is-preload-ready');
                overlay.classList.add('is-entering');
            }

            // Subtle page content lift-up during the reveal
            this.body.classList.add('pt-content-reveal');

            // ── Step 5: clean up after animation ─────────────────────────────
            setTimeout(() => {
                if (overlay) {
                    overlay.classList.remove('is-entering', 'pl-exit-mode');
                    overlay.style.visibility = '';
                }
                this.body.classList.remove('pt-content-reveal');
            }, ENTER_TOTAL + 150);

        }, 220); // wait for content fade-out
    }

    hide() {
        this.hidePreloader();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new SimplePreloader();
});

/* harmony default export */ __webpack_exports__["default"] = (SimplePreloader);

/***/ }),

/***/ "./src/assets/js/components/swiper.js":
/*!********************************************!*\
  !*** ./src/assets/js/components/swiper.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");


swiper__WEBPACK_IMPORTED_MODULE_0__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_0__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_0__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_0__["Scrollbar"], swiper__WEBPACK_IMPORTED_MODULE_0__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_0__["Mousewheel"], swiper__WEBPACK_IMPORTED_MODULE_0__["Keyboard"], swiper__WEBPACK_IMPORTED_MODULE_0__["Parallax"], swiper__WEBPACK_IMPORTED_MODULE_0__["Lazy"], swiper__WEBPACK_IMPORTED_MODULE_0__["EffectFade"], swiper__WEBPACK_IMPORTED_MODULE_0__["Thumbs"], swiper__WEBPACK_IMPORTED_MODULE_0__["Controller"]]);

// Expose to window so PJAX re-init can access it after DOM swap
window.Swiper = swiper__WEBPACK_IMPORTED_MODULE_0__["default"];

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // Handle Default swipers
    const swipers = document.querySelectorAll('[data-swiper]') || [];

    swipers.forEach((elem) => {
      let options = elem.dataset && elem.dataset.options ? JSON.parse(elem.dataset.options) : {};
      var swiper = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"](elem, options);
    });

    // Handle our linked swipers on homepage
    var swiperLinkedTop = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"]('.swiper-linked-top', {
      spaceBetween: 23,
      breakpoints: {
        300: {
          slidesPerView: 2
        },       
        999: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4
        }
      },      
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      }
    });
    var swiperLinkedBottom = new swiper__WEBPACK_IMPORTED_MODULE_0__["default"]('.swiper-linked-bottom', {
      spaceBetween: 0,
      slidesPerView: 1,
      parallax: true,
      thumbs: {
        swiper: swiperLinkedTop
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });  

  })
})();

/***/ }),

/***/ "./src/assets/js/components/typed.js":
/*!*******************************************!*\
  !*** ./src/assets/js/components/typed.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_0__);


(function () {
    const typedElems = document.querySelectorAll('[data-typed]') || [];

    typedElems.forEach(elem => {
      const elemOptions = elem.dataset.typed ? JSON.parse(elem.dataset.typed) : {};

      const defaultOptions = {
        typeSpeed: 50,
        backSpeed: 35,
        backDelay: 1000,
        loop: true,
      };
      const options = {
        ...defaultOptions,
        ...elemOptions
      };
      new typed_js__WEBPACK_IMPORTED_MODULE_0___default.a(elem, options);
    });
})();

/***/ }),

/***/ "./src/assets/js/components/work-listing.js":
/*!**************************************************!*\
  !*** ./src/assets/js/components/work-listing.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ==========================================================================
   Work Listing — Interactive Behaviors
   Yutaabe-inspired vertical scroll menu with hover sync + intro animation
   ✦ ENDLESS LOOP: items repeat infinitely by cloning and wrapping scroll
   ========================================================================== */

(function () {
  'use strict';

  // Global references that persist
  let rafId = null;
  let onKeyDownHandler = null;
  let onResizeHandler = null;

  function init() {
    const section = document.querySelector('.wl-section');
    if (!section) return;

    const menuWrap   = document.querySelector('#wl-menu-wrap');
    const menu       = document.querySelector('#wl-menu');
    const thumbnail  = document.querySelector('#wl-thumbnail');
    const scrollHint = document.querySelector('#wl-scroll-hint');
    const counter    = document.querySelector('#wl-counter');

    if (!menu || !menuWrap) return;

    // Clean up old instances (if PJAX re-triggered)
    if (rafId) cancelAnimationFrame(rafId);
    if (onKeyDownHandler) document.removeEventListener('keydown', onKeyDownHandler);
    if (onResizeHandler) window.removeEventListener('resize', onResizeHandler);

    // Remove old clones to prevent infinite duplication
    menu.querySelectorAll('.wl-clone').forEach(el => el.remove());
    if (thumbnail) thumbnail.querySelectorAll('.wl-clone').forEach(el => el.remove());

    const originalItems = Array.from(menu.querySelectorAll('li'));
    const originalThumbs = thumbnail ? Array.from(thumbnail.querySelectorAll('.wl-thumb-item')) : [];
    const totalOriginal = originalItems.length;

    if (totalOriginal === 0) return;

    const counterCur = counter ? counter.querySelector('.wl-counter__current') : null;
    const counterTotal = counter ? counter.querySelector('.wl-counter__total') : null;

    if (counterTotal) {
      counterTotal.textContent = totalOriginal < 10 ? '0' + totalOriginal : '' + totalOriginal;
    }

    // ── Clone items for seamless infinite loop ──
    const CLONE_SETS = 6;
    for (let s = 0; s < CLONE_SETS; s++) {
      originalItems.forEach((li, i) => {
        const clone = li.cloneNode(true);
        clone.dataset.origIndex = i;
        clone.classList.add('wl-clone');
        menu.appendChild(clone);
      });

      if (thumbnail) {
        originalThumbs.forEach((t, i) => {
          const clone = t.cloneNode(true);
          clone.dataset.origIndex = i;
          clone.classList.add('wl-clone');
          thumbnail.appendChild(clone);
        });
      }
    }

    const allItems = Array.from(menu.querySelectorAll('li'));
    const allThumbs = thumbnail ? Array.from(thumbnail.querySelectorAll('.wl-thumb-item')) : [];

    // ── Sync thumbnail heights to menu item heights ──
    // Both columns share the same translateY, so each thumb must be the
    // same height as its corresponding menu row, otherwise they drift apart.
    function syncThumbHeights() {
      if (!thumbnail || allThumbs.length === 0) return;
      allThumbs.forEach((thumb, i) => {
        const origIdx = i % totalOriginal;
        const menuItem = allItems[origIdx] || allItems[0];
        const h = menuItem.offsetHeight;
        thumb.style.height = h + 'px';
      });
    }

    // ── State ──
    let oneSetHeight = 0;
    function computeSetHeight() {
      let h = 0;
      for (let i = 0; i < totalOriginal; i++) {
        h += allItems[i].offsetHeight;
      }
      oneSetHeight = h;
      syncThumbHeights(); // re-sync whenever set height is recomputed
    }
    computeSetHeight();

    document.body.classList.add('is-work-listing');

    // Start exactly at the top of the second set to prevent white gap at the very top
    const initialOffset = 0;
    let scrollY = oneSetHeight - initialOffset;
    let targetScrollY = oneSetHeight - initialOffset;
    let hasScrolled = false;
    let isTouching = false;
    let touchStartY = 0;
    let touchScrollY = 0;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function updateCounter(index) {
      if (!counterCur) return;
      const wrapped = ((index % totalOriginal) + totalOriginal) % totalOriginal;
      const num = wrapped + 1;
      counterCur.textContent = num < 10 ? '0' + num : '' + num;
    }

    let closestAbsIdx = 0;
    function getActiveOrigIndex() {
      const wrapRect = menuWrap.getBoundingClientRect();
      const centerY  = wrapRect.top + wrapRect.height * 0.4;
      let closestIdx = 0;
      let closestDist = Infinity;

      allItems.forEach((li, i) => {
        const rect = li.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx  = i;
        }
      });

      closestAbsIdx = closestIdx;
      return closestIdx % totalOriginal;
    }

    let lastActiveOrig = -1;
    let lastClosestAbs = -1;
    let isMouseHovering = false; // desktop hover takes priority over scroll

    function syncActiveFromScroll() {
      const origIdx = getActiveOrigIndex();

      if (origIdx !== lastActiveOrig || closestAbsIdx !== lastClosestAbs) {
        lastActiveOrig = origIdx;
        lastClosestAbs = closestAbsIdx;
        updateCounter(origIdx);

        // On mobile: always sync thumbnail from scroll (no hover needed)
        // On desktop: only sync from scroll when mouse is NOT hovering an item
        const isMobile = window.innerWidth <= 768;
        if (isMobile || !isMouseHovering) {
          allItems.forEach((li, i) => {
            li.classList.toggle('is-center', i === closestAbsIdx);
          });
          allThumbs.forEach((t, i) => {
            t.classList.toggle('is-hovered', i === closestAbsIdx);
          });
        }
      }
    }

    function wrapScroll() {
      if (scrollY >= oneSetHeight * 2 && oneSetHeight > 0) {
        scrollY -= oneSetHeight;
        targetScrollY -= oneSetHeight;
      }
      if (scrollY < oneSetHeight && oneSetHeight > 0) {
        scrollY += oneSetHeight;
        targetScrollY += oneSetHeight;
      }
    }

    function animate() {
      if (!document.body.contains(menuWrap)) return; // KILL SWITCH for PJAX
      
      scrollY = lerp(scrollY, targetScrollY, 0.1);

      if (Math.abs(scrollY - targetScrollY) < 0.5) {
        scrollY = targetScrollY;
      }

      wrapScroll();

      menu.style.transform = `translateY(${-scrollY}px)`;
      if (thumbnail) {
        thumbnail.style.transform = `translateY(${-scrollY}px)`;
      }

      syncActiveFromScroll();
      rafId = requestAnimationFrame(animate);
    }

    function onWheel(e) {
      e.preventDefault();
      if (!hasScrolled) {
        hasScrolled = true;
        if (scrollHint) scrollHint.classList.add('is-hidden');
      }
      targetScrollY += e.deltaY * 0.8;
    }

    function onTouchStart(e) {
      isTouching = true;
      touchStartY = e.touches[0].clientY;
      touchScrollY = targetScrollY;
    }

    function onTouchMove(e) {
      if (!isTouching) return;
      e.preventDefault();
      if (!hasScrolled) {
        hasScrolled = true;
        if (scrollHint) scrollHint.classList.add('is-hidden');
      }
      const deltaY = touchStartY - e.touches[0].clientY;
      targetScrollY = touchScrollY + deltaY;
    }

    function onTouchEnd() {
      isTouching = false;
      // Snap to nearest item on mobile for clean UX
      if (window.innerWidth <= 768 && allItems.length > 0) {
        const itemH = allItems[0].offsetHeight;
        targetScrollY = Math.round(targetScrollY / itemH) * itemH;
      }
    }

    function onItemMouseEnter(e) {
      // Desktop only — on mobile, thumbnail is driven by scroll
      if (window.innerWidth <= 768) return;
      isMouseHovering = true;

      const li = e.currentTarget;
      const absIdx = allItems.indexOf(li);
      const origIdx = parseInt(li.dataset.origIndex || li.dataset.index, 10);

      allThumbs.forEach((t, i) => {
        t.classList.toggle('is-hovered', i === absIdx);
      });
      updateCounter(origIdx);
    }

    function onItemMouseLeave() {
      // Desktop only
      if (window.innerWidth <= 768) return;
      isMouseHovering = false;
      // Let syncActiveFromScroll re-take control on next frame
    }

    onKeyDownHandler = function (e) {
      if (!document.body.contains(menuWrap)) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!hasScrolled) {
          hasScrolled = true;
          if (scrollHint) scrollHint.classList.add('is-hidden');
        }
        const itemHeight = allItems[0] ? allItems[0].offsetHeight : 100;
        if (e.key === 'ArrowDown') {
          targetScrollY += itemHeight;
        } else {
          targetScrollY -= itemHeight;
        }
      }
    };

    onResizeHandler = function () {
      if (!document.body.contains(menuWrap)) return;
      computeSetHeight();
    };

    function playIntro() {
      if (!document.body.contains(menuWrap)) return;
      requestAnimationFrame(() => {
        // Initial clip path reveal
        menu.style.transform = `translateY(${-scrollY}px)`;
        if (thumbnail) thumbnail.style.transform = `translateY(${-scrollY}px)`;

        const visibleCount = Math.min(allItems.length, totalOriginal * 3);
        for (let i = 0; i < visibleCount; i++) {
          const li = allItems[i];
          const delay = 0.15 + (i % totalOriginal) * 0.08;
          li.style.transition = `clip-path 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`;
          li.style.clipPath = 'inset(0% 0 0 0)';
        }
        for (let i = visibleCount; i < allItems.length; i++) {
          allItems[i].style.clipPath = 'inset(0% 0 0 0)';
        }

        const visibleThumbCount = Math.min(allThumbs.length, totalOriginal * 3);
        for (let i = 0; i < visibleThumbCount; i++) {
          const t = allThumbs[i];
          const delay = 0.2 + (i % totalOriginal) * 0.08;
          t.style.transition = `clip-path 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`;
          t.style.clipPath = 'inset(0% 0 0 0)';
        }
        for (let i = visibleThumbCount; i < allThumbs.length; i++) {
          allThumbs[i].style.clipPath = 'inset(0% 0 0 0)';
        }

        setTimeout(() => {
          if (!document.body.contains(menuWrap)) return;
          menu.classList.remove('is-intro');
          if (thumbnail) thumbnail.classList.remove('is-intro');

          allItems.forEach(li => {
            li.style.transition = '';
            li.style.clipPath = '';
          });
          allThumbs.forEach(t => {
            t.style.transition = '';
            t.style.clipPath = '';
          });
        }, 1200);
      });
    }

    // Bind events
    menuWrap.addEventListener('wheel', onWheel, { passive: false });
    menuWrap.addEventListener('touchstart', onTouchStart, { passive: true });
    menuWrap.addEventListener('touchmove', onTouchMove, { passive: false });
    menuWrap.addEventListener('touchend', onTouchEnd, { passive: true });

    allItems.forEach(li => {
      li.addEventListener('mouseenter', onItemMouseEnter);
      li.addEventListener('mouseleave', onItemMouseLeave);
    });

    document.addEventListener('keydown', onKeyDownHandler);
    window.addEventListener('resize', onResizeHandler);

    rafId = requestAnimationFrame(animate);

    setTimeout(playIntro, 300);
    updateCounter(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Support PJAX page transitions
  document.addEventListener('page:load', init);

})();


/***/ }),

/***/ "./src/assets/js/components/work-single-webgl.js":
/*!*******************************************************!*\
  !*** ./src/assets/js/components/work-single-webgl.js ***!
  \*******************************************************/
/*! exports provided: webGLStage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webGLStage", function() { return webGLStage; });
/* harmony import */ var three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/build/three.min.js */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_CustomEase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/CustomEase */ "./node_modules/gsap/CustomEase.js");
/* ==========================================================================
   WebGL Stage — Yuta Abe-Inspired Scroll & Pixel Transition
   ========================================================================== */





// Register CustomEase for the title wipe animation
if (typeof window !== 'undefined') {
  gsap__WEBPACK_IMPORTED_MODULE_1__["gsap"].registerPlugin(gsap_CustomEase__WEBPACK_IMPORTED_MODULE_2__["CustomEase"]);
  try {
    gsap_CustomEase__WEBPACK_IMPORTED_MODULE_2__["CustomEase"].create("titleReveal", "M0,0 C0.496,0.004 0,1 1,1");
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
    this._mouseTarget = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0);
    this._mouseEased = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0);
    this._mouseTrail = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0);
    
    this._dummy = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Object3D"]();
    
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
    this.renderer = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Scene"]();

    // 1:1 Pixel Mapping Camera Configuration
    const fov = 45;
    const fovRad = (fov * Math.PI) / 180;
    this.camera = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](fov, width / height, 1, 2000);
    this.camera.position.z = height / (2 * Math.tan(fovRad / 2));

    this._textureLoader = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]();

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
    const texture = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["CanvasTexture"](offCanvas);
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

    const geometry = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](1, 1);
    const material = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: titleVertexShader,
      fragmentShader: titleFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uReveal: { value: 0 },
        uImageRects: { value: [new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"](0,0,0,0), new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"](0,0,0,0), new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"](0,0,0,0), new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"](0,0,0,0)] },
        uImageCount: { value: 0 },
        uImageBottomY: { value: -999999 }
      },
      transparent: true,
      depthWrite: false
    });

    this.titleMesh = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
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
      gsap__WEBPACK_IMPORTED_MODULE_1__["gsap"].to(material.uniforms.uReveal, {
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
    const geometry = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](1, 1);
    const gridPositions = new Float32Array(totalInstances * 2);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const instIdx = r * cols + c;
        gridPositions[instIdx * 2] = c;
        gridPositions[instIdx * 2 + 1] = r;
      }
    }

    geometry.setAttribute('aGridPos', new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferAttribute"](gridPositions, 2));

    const bumpArray = new Float32Array(totalInstances);
    const bumpAttribute = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferAttribute"](bumpArray, 1);
    bumpAttribute.setUsage(three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["DynamicDrawUsage"]);
    geometry.setAttribute('aBump', bumpAttribute);

    const texture = this._textureLoader.load(element.src, (tex) => {
      const mesh = this.imageMeshes.find(m => m.userData.el === element);
      if (!mesh) return;
      const naturalW = (tex.image && (tex.image.naturalWidth || tex.image.width)) || 1;
      const naturalH = (tex.image && (tex.image.naturalHeight || tex.image.height)) || 1;
      mesh.material.uniforms.uImageSize.value.set(naturalW, naturalH);
    });

    const material = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uGrid: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](cols, rows) },
        uPlaneSize: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](width, height) },
        uImageSize: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](element.naturalWidth > 0 ? element.naturalWidth : 1, element.naturalHeight > 0 ? element.naturalHeight : 1) },
        uTime: { value: 0 },
        uMouseLocal: { value: new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](0, 0) },
        uMouseRadius: { value: 150 }
      },
      transparent: true,
      depthWrite: false
    });

    const instancedMesh = new three_build_three_min_js__WEBPACK_IMPORTED_MODULE_0__["InstancedMesh"](geometry, material, totalInstances);
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

const webGLStage = new WebGLStage();


/***/ }),

/***/ "./src/assets/js/components/work-single.js":
/*!*************************************************!*\
  !*** ./src/assets/js/components/work-single.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _work_single_webgl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./work-single-webgl */ "./src/assets/js/components/work-single-webgl.js");
/* ==========================================================================
   Work Single — Scroll Animations & Interactions
   ========================================================================== */



(function () {
  'use strict';

  function init() {
    const page     = document.querySelector('.ws-page');
    if (!page) {
      _work_single_webgl__WEBPACK_IMPORTED_MODULE_0__["webGLStage"].destroy();
      return;
    }

    // Start Yuta Abe-inspired WebGL scroll pixel transition
    _work_single_webgl__WEBPACK_IMPORTED_MODULE_0__["webGLStage"].init();

    const wsHero    = page.querySelector('.ws-hero');
    const heroTitle = page.querySelector('.ws-hero__title');
    const heroMeta  = page.querySelector('.ws-hero__meta');
    const heroImg   = page.querySelector('.ws-image--hero img');
    const scrollHint = page.querySelector('.ws-hero__scroll');

    // ── 1. Hero reveal (scroll -> meta -> title) ──────────────────
    // Stagger: scroll hint first, then meta, then title last
    function triggerAnimations() {
      if (scrollHint) {
        setTimeout(() => {
          scrollHint.offsetHeight; // force reflow so browser sees initial state
          scrollHint.classList.add('is-revealed');
        }, 100);
      }
      if (heroMeta) {
        setTimeout(() => {
          heroMeta.offsetHeight;
          heroMeta.classList.add('is-revealed');
        }, 300);
      }
      if (heroTitle) {
        setTimeout(() => {
          heroTitle.offsetHeight;
          heroTitle.classList.add('is-revealed');
        }, 500);
      }
    }

    // Detect if any overlay (preloader or page-transition) is covering the screen.
    // If so, wait for it to finish before triggering animations.
    function isOverlayActive() {
      const overlay = document.getElementById('page-transition-overlay');
      const hasPreloader = document.body.classList.contains('preloader-active');
      const hasTransition = overlay && (overlay.classList.contains('is-leaving') || overlay.classList.contains('is-entering') || overlay.classList.contains('is-preload-ready'));
      return hasPreloader || hasTransition;
    }

    function checkAndTrigger() {
      if (isOverlayActive()) {
        const checkInterval = setInterval(() => {
          if (!isOverlayActive()) {
            clearInterval(checkInterval);
            triggerAnimations();
          }
        }, 100);
      } else {
        triggerAnimations();
      }
    }

    // Wait for fonts to load so huge text doesn't skip transition due to FOIT
    if ('fonts' in document) {
      document.fonts.ready.then(checkAndTrigger);
    } else {
      checkAndTrigger();
    }

    // ── 2. Scroll-driven active classes (scroll hint + metadata fade out) ──
    function handleScroll(scrollY) {
      // Hide scroll hint
      if (scrollHint) {
        if (scrollY > 60) {
          scrollHint.classList.add('is-hidden');
        } else {
          scrollHint.classList.remove('is-hidden');
        }
      }

      // Hide metadata
      if (heroMeta) {
        if (scrollY > 150) {
          heroMeta.classList.add('is-hidden');
        } else {
          heroMeta.classList.remove('is-hidden');
        }
      }
    }

    // Use Locomotive Scroll if available, else fallback to native scroll
    if (window.locoScroll) {
      window.locoScroll.on('scroll', ({ scroll }) => {
        handleScroll(scroll.y);
      });
    } else {
      document.addEventListener('scroll', () => {
        handleScroll(window.scrollY);
      }, { passive: true });
    }

    // ── 4. Detail items: stagger reveal on scroll ─────────────────────────
    const detailItems = page.querySelectorAll('.ws-detail__item');
    detailItems.forEach((item, i) => {
      item.style.setProperty('--item-delay', i * 80);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    detailItems.forEach(item => revealObserver.observe(item));

    // ── 5. Next project name: clip-path reveal on scroll ──────────────────
    const nextName = page.querySelector('.ws-next__name');
    if (nextName) {
      const nextObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              nextName.classList.add('is-visible');
              nextObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      nextObserver.observe(nextName);
    }

    // ── 6. Sub-image parallax (desktop only) ──────────────────────────────
    if (window.innerWidth > 768) {
      page.querySelectorAll('.ws-sub-image img').forEach(img => {
        img.setAttribute('data-scroll', '');
        img.setAttribute('data-scroll-speed', '-2');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('page:load', init);

})();


/***/ }),

/***/ "./src/assets/js/components/work-slider.js":
/*!*************************************************!*\
  !*** ./src/assets/js/components/work-slider.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Work Slider — faithful port of musabhassan.com
 *
 * Fixed: Using getBoundingClientRect() to avoid offsetParent bugs
 * caused by CSS transforms on parent elements.
 */

(function () {
  'use strict';

  // ──────────────────────────────────────────────────────────────────────────
  // WorkSlider — LERP drag (ported from Musab's WorkSlider class)
  // ──────────────────────────────────────────────────────────────────────────

  class WorkSlider {
    constructor(container, list) {
      this.container     = container;
      this.list          = list;
      this.currentPos    = 0;
      this.targetPos     = 0;
      this.initialPos    = 0;
      this.offsetSpeed   = 5000;
      this.lerpSpeed     = 0.1;
      this.isDragging    = false;
      this.hasMoved      = false;
      this.locked        = false;  // locked when a card is active

      this._bindEvents();
      this._animate();


      // Dynamic left padding to align with container
      const setPadding = () => {
        const containerEl = document.querySelector('#recent-work').previousElementSibling;
        if (containerEl) {
          const subtitle = containerEl.querySelector('h2');
          const rect = subtitle.getBoundingClientRect();
          this.list.style.paddingLeft = rect.left + 'px';
        }
      };
      setPadding();
      window.addEventListener('resize', setPadding);

    }

    _bindEvents() {
      this.container.addEventListener('mousedown', this._onHold.bind(this));
      window.addEventListener('mouseup',           this._onRelease.bind(this));
      window.addEventListener('mousemove',         this._onMouseMove.bind(this));

      this.container.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
      window.addEventListener('touchend',           this._onTouchEnd.bind(this));
      window.addEventListener('touchmove',          this._onTouchMove.bind(this), { passive: false });
    }

    _onHold(e) {
      // Skip if locked or clicking interactive controls
      if (this.locked) return;
      if (e.target.closest('.close-button-wrapper, .btn-panel-link, .btn-view')) return;

      this.isDragging = true;
      this.hasMoved   = false;

      const matrix    = new WebKitCSSMatrix(window.getComputedStyle(this.list).transform);
      this.initialPos = matrix.m41 || 0;
      this._dragStartX = e.clientX;

      this.list.classList.add('hold');
    }

    _onMouseMove(e) {
      if (!this.isDragging || this.locked) return;
      const diff = (e.clientX - this._dragStartX) * -1;
      if (Math.abs(diff) > 5) this.hasMoved = true;

      // Musab's exact formula
      this.targetPos = Math.round(
        (this.initialPos - (this.offsetSpeed * (diff / document.body.clientWidth))) * 100
      ) / 100;
    }

    _onRelease() {
      this.isDragging = false;
      this.list.classList.remove('hold');
      requestAnimationFrame(() => requestAnimationFrame(() => { this.hasMoved = false; }));
    }

    _onTouchStart(e) {
      if (this.locked) return;
      this.isDragging  = true;
      this.hasMoved    = false;
      this._dragStartX = e.touches[0].clientX;
      const matrix     = new WebKitCSSMatrix(window.getComputedStyle(this.list).transform);
      this.initialPos  = matrix.m41 || 0;
      this.list.classList.add('hold');
    }

    _onTouchMove(e) {
      if (!this.isDragging || this.locked) return;
      const diff = (e.touches[0].clientX - this._dragStartX) * -1;
      if (Math.abs(diff) > 5) { this.hasMoved = true; e.preventDefault(); }
      this.targetPos = Math.round(
        (this.initialPos - (this.offsetSpeed * 0.5 * (diff / document.body.clientWidth))) * 100
      ) / 100;
    }

    _onTouchEnd() {
      this.isDragging = false;
      this.list.classList.remove('hold');
      requestAnimationFrame(() => requestAnimationFrame(() => { this.hasMoved = false; }));
    }

    _clamp() {
      const endPoint = this.list.offsetWidth - document.body.clientWidth;
      const limit    = endPoint < 0 ? this.list.offsetWidth : endPoint;
      if (this.targetPos > 0)     this.targetPos = 0;
      if (this.targetPos < -limit) this.targetPos = -limit;
    }

    _lerp(a, b, t) { return a * (1 - t) + b * t; }

    _animate() {
      if (!document.body.contains(this.container)) return;
      if (!this.locked) this._clamp();

      this.currentPos = this._lerp(this.currentPos, this.targetPos, this.lerpSpeed);
      this.list.style.transform = `translate3d(${Math.round(this.currentPos * 100) / 100}px, 0px, 0px)`;

      requestAnimationFrame(() => this._animate());
    }

    /**
     * Scroll formula (equivalent to Musab's targetPos = 0.15W - offsetLeft).
     * By calling this BEFORE adding .active class, offsetLeft reflects the
     * unexpanded position (matching Musab's Svelte synchronous timing).
     */
    scrollToItem(cardEl) {
      const listRect = this.list.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const trueOffsetLeft = cardRect.left - listRect.left;
      this.targetPos = -(trueOffsetLeft - (window.innerWidth / 4) + window.innerWidth / 10);
      this.locked = true;
      this.container.classList.add('disabled');
    }

    unlock() {
      this.locked = false;
      this.container.classList.remove('disabled');
    }
  }


  // ──────────────────────────────────────────────────────────────────────────
  // WorkItems — card expand + panel populate
  // ──────────────────────────────────────────────────────────────────────────

  class WorkItems {
    constructor(slider) {
      this.slider        = slider;
      this.currentActive = -1;
      this.items         = [];
      this.panel         = document.getElementById('workDetailsPanel');
      this.closeBtn      = document.getElementById('workPanelClose');

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._close();
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.currentActive >= 0) this._close();
      });
    }

    register(liEl, index) {
      this.items.push({ el: liEl, index });

      const handleExpand = (e) => {
        e.stopPropagation();
        if (this.slider.hasMoved) return;
        this._toggle(index, liEl);
      };

      // ONLY btn-view triggers expand (desktop)
      const btnView = liEl.querySelector('.btn-view');
      if (btnView) {
        btnView.addEventListener('click', handleExpand);
      }

      // Allow expand by clicking image on mobile view
      const imgWrapper = liEl.querySelector('.img-wrapper');
      if (imgWrapper) {
        imgWrapper.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            handleExpand(e);
          }
        });
      }
    }

    _toggle(index, liEl) {
      this.currentActive === index ? this._close() : this._open(index, liEl);
    }

    _open(index, liEl) {
      this.currentActive = index;
      const cardEl = liEl.querySelector('.list-item');

      // *** Scroll to 15vw visual left BEFORE adding .active ***
      this.slider.scrollToItem(cardEl);

      // Now apply card states (adds margin-left: 10vw, shifting visual left to 25vw)
      this.items.forEach(({ el, index: i }) => {
        const card = el.querySelector('.list-item');
        const top  = el.querySelector('.text-top-wrapper');
        const bot  = el.querySelector('.text-wrapper');

        card.classList.remove('active', 'ambient');
        card.classList.add(i === index ? 'active' : 'ambient');

        // Hide ALL text overlays while any card is expanded
        if (top) top.classList.add('hidden');
        if (bot) bot.classList.add('hidden');
      });

      // Populate & show panel
      if (cardEl && this.panel) {
        this._populatePanel(cardEl, index);
        this.panel.classList.add('is-visible');
        this.panel.setAttribute('aria-hidden', 'false');
      }
    }

    _close() {
      this.currentActive = -1;

      this.items.forEach(({ el }) => {
        const card = el.querySelector('.list-item');
        const top  = el.querySelector('.text-top-wrapper');
        const bot  = el.querySelector('.text-wrapper');
        if (card) card.classList.remove('active', 'ambient');
        if (top)  top.classList.remove('hidden');
        if (bot)  bot.classList.remove('hidden');
      });

      if (this.panel) {
        this.panel.classList.remove('is-visible');
        this.panel.setAttribute('aria-hidden', 'true');
      }

      this.slider.unlock();
    }

    _populatePanel(cardEl, index) {
      const title       = cardEl.dataset.title       || '';
      const summary     = cardEl.dataset.summary     || '';
      const description = cardEl.dataset.description || '';
      const padded      = (index + 1) < 10 ? '0' + (index + 1) : String(index + 1);

      let roles = [], links = [];
      try { roles = JSON.parse(cardEl.dataset.roles || '[]'); } catch (_) {}
      try { links = JSON.parse(cardEl.dataset.links || '[]'); } catch (_) {}

      const get = (sel) => this.panel.querySelector(sel);

      // top-align
      const panelIndex   = get('.panel-index');
      const captionEl    = get('.caption');
      if (panelIndex) panelIndex.textContent = padded;
      if (captionEl)  captionEl.textContent  = summary;

      // mid-align
      const panelTitle = get('.panel-title');
      if (panelTitle) panelTitle.textContent = title;

      // bottom-align
      const panelDesc      = get('.panel-description');
      const panelRolesList = get('.panel-roles-list');
      const linksEl        = get('.links');

      if (panelDesc) panelDesc.textContent = description;

      if (panelRolesList) {
        // Include '+' prefix in text content
        panelRolesList.innerHTML = roles
          .map(r => `<li>+ ${r}</li>`)
          .join('');
      }

      if (linksEl) {
        linksEl.innerHTML = links
          .map(l => `<a href="${l.url || l.link || '#'}" target="_blank" class="btn-panel-link link-body">${l.text}</a>`)
          .join('');
      }
    }
  }


  // ──────────────────────────────────────────────────────────────────────────
  // Entrance animation
  // ──────────────────────────────────────────────────────────────────────────

  function initEntranceAnimations(listItems) {
    const section = document.getElementById('recent-work');
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      listItems.forEach((li, i) => {
        li.style.transitionDelay = `${i * 60}ms`;
        li.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          listItems.forEach((li, i) => {
            setTimeout(() => li.classList.add('is-visible'), i * 80);
          });
          observer.disconnect();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
  }


  // ──────────────────────────────────────────────────────────────────────────
  // Init
  // ──────────────────────────────────────────────────────────────────────────

  function init() {
    const container = document.getElementById('workSliderContainer');
    const list      = document.getElementById('workList');
    if (!container || !list) return;

    const slider    = new WorkSlider(container, list);
    const workItems = new WorkItems(slider);

    const listItems = Array.from(list.querySelectorAll('li'));
    listItems.forEach((li, i) => workItems.register(li, i));

    initEntranceAnimations(listItems);
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('page:load', init);

})();


/***/ }),

/***/ "./src/assets/js/misc.js":
/*!*******************************!*\
  !*** ./src/assets/js/misc.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {

    // Add a body class once page has loaded
    // Used to add CSS transitions to elems
    // and avoids content shifting during page load
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
    
})();

/***/ }),

/***/ "./src/assets/js/theme.js":
/*!********************************!*\
  !*** ./src/assets/js/theme.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _components_dark_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dark-mode */ "./src/assets/js/components/dark-mode.js");
/* harmony import */ var _components_dark_mode__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_dark_mode__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_locomotive_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/locomotive-scroll */ "./src/assets/js/components/locomotive-scroll.js");
/* harmony import */ var _components_swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/swiper */ "./src/assets/js/components/swiper.js");
/* harmony import */ var _components_typed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/typed */ "./src/assets/js/components/typed.js");
/* harmony import */ var _components_contact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/contact */ "./src/assets/js/components/contact.js");
/* harmony import */ var _components_contact__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_contact__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_preloader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/preloader */ "./src/assets/js/components/preloader.js");
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/navbar */ "./src/assets/js/components/navbar.js");
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_components_navbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_page_transition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/page-transition */ "./src/assets/js/components/page-transition.js");
/* harmony import */ var _components_work_slider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/work-slider */ "./src/assets/js/components/work-slider.js");
/* harmony import */ var _components_work_slider__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_components_work_slider__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_work_listing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/work-listing */ "./src/assets/js/components/work-listing.js");
/* harmony import */ var _components_work_listing__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_components_work_listing__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_work_single__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/work-single */ "./src/assets/js/components/work-single.js");
/* harmony import */ var _components_avatar_webgl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/avatar-webgl */ "./src/assets/js/components/avatar-webgl.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./misc */ "./src/assets/js/misc.js");
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_misc__WEBPACK_IMPORTED_MODULE_13__);
// Vendor Imports


// Components





 // Tambahkan ini







// theme misc js


/***/ }),

/***/ "./src/assets/scss/theme.scss":
/*!************************************!*\
  !*** ./src/assets/scss/theme.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1:
/*!*******************************************************************!*\
  !*** multi ./src/assets/js/theme.js ./src/assets/scss/theme.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/assets/js/theme.js */"./src/assets/js/theme.js");
module.exports = __webpack_require__(/*! ./src/assets/scss/theme.scss */"./src/assets/scss/theme.scss");


/***/ })

/******/ });
//# sourceMappingURL=theme.bundle.js.map