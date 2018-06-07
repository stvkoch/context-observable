import React from "react";
import { render } from "react-dom";
import ProductContainer from "./context-container/product";

import { ContextObservable } from "context-observable";
import combineReducers from "context-observable/combine-reducers";

import epics from "./epics";
import product from "./reducers/product";
import products from "./reducers/products";

const reducer = combineReducers({
  product,
  products
});

const App = () => (
  <ContextObservable {...{ epics, reducer }}>
    <ProductContainer />
  </ContextObservable>
);

render(<App />, document.getElementById("root"));
