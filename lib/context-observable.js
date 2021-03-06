"use strict";

exports.__esModule = true;
exports.Consumer = exports.ContextObservable = undefined;

var _rxjs = require("rxjs");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Context = (0, _react.createContext)();
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
      _this.rx.next({ action: action, store: _this.store });
    };

    _this.getState = function () {
      return _this.state;
    };

    _this.store = { getState: _this.getState, dispatch: _this.dispatch };

    _this.state = props.reducer(props.initialState, {});

    _this.rx = new _rxjs.Subject().switchMap(function (payload) {
      return _rxjs.Observable.merge.apply(_rxjs.Observable, props.epics.map(function (f) {
        return f(_rxjs.Observable.of(payload.action), payload.store);
      }));
    });

    _this.rx.subscribe(function (a) {
      var newState = _this.props.reducer(_this.state, a);
      _this.setState(newState, _this.props.onSetState);
    });
    return _this;
  }

  ContextObservable.prototype.render = function render() {
    return _react2.default.createElement(
      Provider,
      {
        contextObservable: true,
        value: { state: this.state, dispatch: this.dispatch }
      },
      this.props.children
    );
  };

  return ContextObservable;
}(_react2.default.Component);

ContextObservable.defaultProps = {
  epics: [function ($a) {
    return $a;
  }],
  reducer: function reducer(state) {
    return state;
  }
};

exports.ContextObservable = ContextObservable;
exports.Consumer = Consumer;