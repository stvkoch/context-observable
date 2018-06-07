import React from "react";
import { render } from "react-dom";
import Product from "./context-container/product";

import { ContextObservable } from "../src/index";
import combineReducers from "../src/combine-reducers";

import epics from "./epics";
import product from "./reducers/product";
import products from "./reducers/products";

const reducer = combineReducers({
  product,
  products
});

const App = () => (
  <ContextObservable {...{ epics, reducer }}>
    <Product />
  </ContextObservable>
);

render(<App />, document.getElementById("root"));
