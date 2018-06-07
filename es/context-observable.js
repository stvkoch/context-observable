function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Observable, Subject } from "rxjs";
import React, { createContext } from "react";

var Context = createContext();
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

    _this.rx = new Subject().switchMap(function (payload) {
      return Observable.merge.apply(Observable, props.epics.map(function (f) {
        return f(Observable.of(payload.action), payload.store);
      }));
    });

    _this.rx.subscribe(function (a) {
      var newState = _this.props.reducer(_this.state, a);
      _this.setState(newState);
    });
    return _this;
  }

  ContextObservable.prototype.render = function render() {
    return React.createElement(
      Provider,
      { value: { state: this.state, dispatch: this.dispatch } },
      this.props.children
    );
  };

  return ContextObservable;
}(React.Component);

ContextObservable.defaultProps = {
  epics: [],
  reducer: function reducer(state) {
    return state;
  }
};

export { ContextObservable, Consumer };