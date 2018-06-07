import React from "react";
import { render } from "react-dom";
import {combineReducers, Consumer, ContextObservable} from '../../src'

import Product from "./context-container/product";

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

render(<App />, document.getElementById("demo"));
