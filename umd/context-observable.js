/*!
 * context-observable v0.1.0
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["rxjs", "react"], factory);
	else if(typeof exports === 'object')
		exports["RxContextObservable"] = factory(require("rxjs"), require("react"));
	else
		root["RxContextObservable"] = factory(root["Rx"], root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context_observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combine_reducers__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combine_reducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContextObservable", function() { return __WEBPACK_IMPORTED_MODULE_0__context_observable__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Consumer", function() { return __WEBPACK_IMPORTED_MODULE_0__context_observable__["a"]; });





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContextObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Consumer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Context = Object(__WEBPACK_IMPORTED_MODULE_1_react__["createContext"])();
var Provider = Context.Provider,
    Consumer = Context.Consumer;
/**
 * const epics = [epicAddProd, epicFetchProds];
 * const reducer = combineReducers({product: productReducer, products: productsReducers, fetching: fetchingReducer});
 *
 * <ContextObservable epics={epics} reducer={reducer}>
 *    <Shell />
 * </ContextObservable>
 */

var ContextObservable = function (_React$Component) {
  _inherits(ContextObservable, _React$Component);

  function ContextObservable(props) {
    _classCallCheck(this, ContextObservable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.dispatch = function (action) {
      return _this.rx.next({ action: action, store: _this.store });
    };

    _this.getState = function () {
      return _this.state;
    };

    _this.store = { getState: _this.getState, dispatch: _this.dispatch };

    _this.state = props.reducer(undefined, {});

    _this.rx = new __WEBPACK_IMPORTED_MODULE_0_rxjs__["Subject"]().switchMap(function (payload) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"], props.epics.map(function (f) {
        return f(__WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].of(payload.action), payload.store);
      }));
    });

    _this.rx.subscribe(function (a) {
      var newState = _this.props.reducer(_this.state, a);
      _this.setState(newState);
    });
    return _this;
  }

  ContextObservable.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      Provider,
      { value: { state: this.state, dispatch: this.dispatch } },
      this.props.children
    );
  };

  return ContextObservable;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

ContextObservable.defaultProps = {
  epics: [],
  reducer: function reducer(state) {
    return state;
  }
};



/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    return Object.keys(reducers).reduce(function (nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

/***/ })
/******/ ])["default"];
});