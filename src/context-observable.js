import { Observable, Subject } from "rxjs";
import React, { createContext } from "react";

const Context = createContext();
const { Provider, Consumer } = Context;
/**
 * const epics = [epicAddProd, epicFetchProds];
 * const reducer = combineReducers({product: productReducer, products: productsReducers, fetching: fetchingReducer});
 *
 * <ContextObservable epics={epics} reducer={reducer}>
 *    <Shell />
 * </ContextObservable>
 */
class ContextObservable extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.reducer(props.initialState, {});

    this.rx = new Subject().switchMap(payload =>
      Observable.merge(
        ...props.epics.map(f => f(Observable.of(payload.action), payload.store))
      )
    );

    this.rx.subscribe(a => {
      const newState = this.props.reducer(this.state, a);
      this.setState(newState, this.props.onSetState);
    });
  }

  dispatch = action => {
    this.rx.next({ action, store: this.store });
  };

  getState = () => this.state;

  store = { getState: this.getState, dispatch: this.dispatch };

  render() {
    return (
      <Provider
        contextObservable
        value={{ state: this.state, dispatch: this.dispatch }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

ContextObservable.defaultProps = {
  epics: [$a => $a],
  reducer: state => state
};

export { ContextObservable, Consumer };
