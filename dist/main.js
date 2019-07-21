/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PaperPlane; });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _plane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plane */ \"./src/plane.js\");\n// Canvas\n\n\n\n\nclass PaperPlane {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.listenForEvents();\n    this.restart();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n\n  restart() {\n    this.running = false;\n    this.score = 0;\n    this.plane = new _plane__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions); // pass in canvas dimensions.\n    this.animate();\n  }\n\n  animate() {\n    this.level.animate(this.ctx);\n    this.plane.animate(this.ctx);\n\n    if (this.gameOver()) {\n      alert(`You scored ${this.score}`);\n      this.restart();\n    }\n\n    this.level.passedTower(this.plane.bounds(), () => {\n      this.score += 1;\n      console.log(this.score);\n    });\n\n    this.drawScore();\n\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  gameOver() {\n    return (\n      this.level.collidesWith(this.plane.bounds()) || this.plane.outOfBounds(this.height)\n    );\n  }\n\n  listenForEvents() {\n\n    window.addEventListener(\"keydown\", (e) => {\n      switch (e.keyCode) {\n        case 65:\n          this.moveLeft();\n          // console.log(\"left was pressed\");\n          break;\n        case 68:\n          this.moveRight();\n          // console.log(\"right was pressed\");\n          break;\n      }\n    }, false);\n  }\n\n  moveLeft() {\n    if (!this.running) {\n      this.play();\n    }\n    this.plane.flyLeft();\n  }\n\n  moveRight() {\n    if (!this.running) {\n      this.play();\n    }\n    this.plane.flyRight();\n  }\n\n  drawScore() {\n    const loc = { x: 10, y: 32 };\n    this.ctx.font = \"bold 18pt 'Press Start 2P'\";\n    this.ctx.fillStyle = \"white\";\n    this.ctx.fillText(`SCORE: ${this.score}`, loc.x, loc.y);\n    this.ctx.strokeStyle = \"black\";\n    this.ctx.lineWidth = 1;\n    this.ctx.strokeText(`SCORE: ${this.score}`, loc.x, loc.y);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('plane-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n// Responsible for drawing the background and obstacles.\n// Will control the logic for how the obstacles move and how they are generated\n\nconst TUNE = {\n  TOWER_SPEED: 2,\n  GAP_HEIGHT: 170,\n  TOWER_WIDTH: 50,\n  EDGE_BUFFER: 10,\n  TOWER_SPACING: 320, // distance between pairs of towers\n  WARM_UP_SECONDS: 1 // gap between two towers\n};\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    const firstTowerDistance =\n      this.dimensions.width + (TUNE.WARM_UP_SECONDS * 60 * TUNE.TOWER_SPEED);\n\n    this.towers = [\n      this.randomTower(firstTowerDistance),\n      this.randomTower(firstTowerDistance + TUNE.TOWER_SPACING),\n      this.randomTower(firstTowerDistance + (TUNE.TOWER_SPACING * 2)),\n    ];\n  }\n\n  randomTower(b) {\n    // const heightRange = this.dimensions.height - (2 * TUNE.EDGE_BUFFER) - TUNE.GAP_HEIGHT;\n    const heightRange = this.dimensions.height / 2;\n    // const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;\n    const gapTop = (Math.random() * heightRange) + TUNE.EDGE_BUFFER;\n    const tower = {\n      // topTower: {\n      //   left: b,\n      //   right: TUNE.TOWER_WIDTH + b,\n      //   top: 0,\n      //   bottom: gapTop\n      // },\n      bottomTower: {\n        left: b,\n        right: TUNE.TOWER_WIDTH + b,\n        top: gapTop + TUNE.GAP_HEIGHT,\n        bottom: this.dimensions.height\n      },\n      passed: false\n    };\n    return tower;\n  }\n\n  animate(ctx) {\n    this.drawBackground(ctx);\n    this.moveTowers();\n    this.drawTowers(ctx);\n  }\n\n  drawBackground(ctx) {\n    let img = document.getElementById(\"hidden-sf-bg\");\n    ctx.drawImage(img, 0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  passedTower(plane, callback) {\n    this.eachTower((tower) => {\n      // if (tower.topTower.right < plane.left) {\n      if (tower.bottomTower.right < plane.left) {\n        if (!tower.passed) {\n          tower.passed = true;\n          callback();\n        }\n      }\n    });\n  }\n\n  moveTowers() {\n    this.eachTower(tower => {\n      // tower.topTower.left -= TUNE.TOWER_SPEED;\n      // tower.topTower.right -= TUNE.TOWER_SPEED;\n      tower.bottomTower.left -= TUNE.TOWER_SPEED;\n      tower.bottomTower.right -= TUNE.TOWER_SPEED;\n    });\n\n    // if (this.towers[0].topTower.right <= 0) {\n    if (this.towers[0].bottomTower.right <= 0) {\n      this.towers.shift();\n      // const newX = this.towers[1].topTower.left + TUNE.TOWER_SPACING + 75;\n      const newX = this.towers[1].bottomTower.left + TUNE.TOWER_SPACING + 75;\n      this.towers.push(this.randomTower(newX));\n    }\n  }\n\n  eachTower(callback) {\n    this.towers.forEach(callback.bind(this));\n  }\n\n\n  drawTowers(ctx) {\n    this.eachTower(tower => {\n      // ctx.fillStyle = \"darkred\";\n      let img1 = document.getElementById(\"hidden-sf-tower\");\n      let img2 = document.getElementById(\"hidden-ta-pyr\");\n\n      let towers = [img1, img2];\n\n      // ctx.fillRect(\n      //   ctx.drawImage(\n      //   img1,\n      //   tower.topTower.left,\n      //   tower.topTower.top,\n      //   TUNE.TOWER_WIDTH,\n      //   tower.topTower.bottom - tower.topTower.top\n      // );\n      // ctx.fillRect(\n      ctx.drawImage(\n        img2,\n        tower.bottomTower.left,\n        tower.bottomTower.top,\n        TUNE.TOWER_WIDTH,\n        tower.bottomTower.bottom - tower.bottomTower.top\n      );\n    });\n  }\n\n\n  collidesWith(plane) {\n    const _overlap = (rect1, rect2) => {\n      if (rect1.left > rect2.right || rect1.right < rect2.left) {\n        return false;\n      }\n      if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n        return false;\n      }\n      return true;\n    };\n    let collision = false;\n    this.eachTower((tower) => {\n      if (\n        // _overlap(tower.topTower, plane) ||\n        _overlap(tower.bottomTower, plane)\n      ) { collision = true; }\n    });\n    return collision;\n  }\n\n\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/plane.js":
/*!**********************!*\
  !*** ./src/plane.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plane; });\nconst TUNE = {\n  GRAVITY: 0.4,\n  FLT_SPEED: 8,\n  TERMINAL_VEL: 12,\n  PLANE_WIDTH: 40,\n  PLANE_HEIGHT: 30\n};\n\nclass Plane {\n\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = this.dimensions.width / 3;\n    this.y = this.dimensions.height / 2;\n    this.vel = 0;\n  }\n\n  flyLeft() {\n    this.vel = -1 * TUNE.FLT_SPEED;\n  }\n\n  flyRight() {\n    this.vel = -1 * TUNE.FLT_SPEED;\n  }\n\n  movePlane() {\n    this.y += this.vel;\n    this.vel += TUNE.GRAVITY;\n    if (Math.abs(this.vel) > TUNE.TERMINAL_VEL) {\n      if (this.vel > 0) {\n        this.vel = TUNE.TERMINAL_VEL;\n      } else {\n        this.vel = TUNE.TERMINAL_VEL * -1;\n      }\n    }\n  }\n\n  animate(ctx) {\n    this.movePlane();\n    this.drawPlane(ctx);\n  }\n\n  drawPlane(ctx) {\n    let img = document.getElementById(\"hidden-plane\");\n    ctx.drawImage(img, this.x, this.y, TUNE.PLANE_WIDTH, TUNE.PLANE_HEIGHT);\n  }\n\n  bounds() {\n    return {\n      left: this.x,\n      right: this.x + TUNE.PLANE_WIDTH,\n      top: this.y,\n      bottom: this.y + TUNE.PLANE_HEIGHT\n    };\n  }\n\n  outOfBounds() {\n    const aboveTheTop = this.y < 0;\n    const belowTheBottom = this.y + TUNE.PLANE_HEIGHT > this.dimensions.height;\n    return aboveTheTop || belowTheBottom;\n  }\n}\n\n//# sourceURL=webpack:///./src/plane.js?");

/***/ })

/******/ });