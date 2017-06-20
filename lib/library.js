(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BIJ", [], factory);
	else if(typeof exports === 'object')
		exports["BIJ"] = factory();
	else
		root["BIJ"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STORAGE_KEY = 'BIJ_STORAGE_KEY';

exports.default = {
  inc: function inc(source, referer) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

    var sourceRecords = this.get(source);
    var record = sourceRecords[referer];

    var now = Date.now();
    if (!record) {
      record = sourceRecords[referer] = {
        count: 1,
        updated: null
      };
    } else {
      if (now - record.updated < duration) {
        record.count++;
      } else {
        record.count = 1;
      }
    }

    record.updated = now;

    this.set(source, sourceRecords);

    return record;
  },
  set: function set(source, records) {
    var allRecordsString = sessionStorage.getItem(STORAGE_KEY) || '';
    var allRecords = void 0;
    try {
      allRecords = JSON.parse(allRecordsString);
    } catch (e) {
      allRecords = {};
    }
    allRecords[source] = records;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allRecords));
  },
  get: function get(source) {
    var allRecordsString = sessionStorage.getItem(STORAGE_KEY);
    try {
      var result = JSON.parse(allRecordsString);
      return (result || {})[source] || {};
    } catch (e) {
      return {};
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = __webpack_require__(0);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindEvent = function bindEvent(record, duration, maxJump) {
  var STOP_STRING = 'stop';
  window.addEventListener('beforeunload', function (event) {
    if (Date.now() - record.updated < duration && record.count >= maxJump) {
      event.returnValue = STOP_STRING;
      return STOP_STRING;
    }
  });
};

exports.default = {
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var breakMode = options.breakMode || 'jump';
    var jumpTo = options.jumpTo;
    var duration = options.duration || 5000;
    var maxJump = options.maxJump || 5;
    var source = options.source || location.href;

    var record = _storage2.default.inc(source, document.referrer, duration);

    if (breakMode === 'unload') {
      bindEvent(record, duration, maxJump);
    } else {
      if (!jumpTo) {
        throw new Error('[BIJ] jumpTo is required when breakMode equals to jump.');
      }

      if (Date.now() - record.updated < duration && record.count >= maxJump) {
        window.location.href = jumpTo;
      }
    }
  }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Library.js.map