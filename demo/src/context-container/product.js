import React from "react";

import { addProduct, rmProduct } from "../actions/product";

import { Consumer } from "../../../src";

export default function Product(props) {
  const showProductName = product => product && <h1>{product.name}</h1>;

  return (
    <div>
      <Consumer>
        {({ state, dispatch }) => (
          <React.Fragment>
            <ul>
              {state &&
                state.products.map(p => (
                  <li key={p.id}>
                    <button onClick={() => dispatch(addProduct(p))}>
                      {p.name}
                    </button>
                  </li>
                ))}
            </ul>
            {showProductName(state.product)}
          </React.Fragment>
        )}
      </Consumer>
    </div>
  );
}
