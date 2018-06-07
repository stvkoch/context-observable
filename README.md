# Context-Observable

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
[context-observable-component]: https://raw.githubusercontent.com/stvkoch/context-observable/master/context-observable-component.png


Context-Observable Component manages the state of your React App using new React Context Api following same interfaces of Redux (actions and reducers) and using the same idea behind redux-observable to avoid "side-effect".


### The Context-Observable Component

![Look how it's simple][context-observable-component]


### Dependencies

- React v16.3 (https://reactjs.org/)
- Rxjs 5 (http://reactivex.io/rxjs)

## Install

Via npm

`npm install --save context-observable

Via UMD (to use as jsbin, etc..)

`https://raw.githubusercontent.com/stvkoch/context-observable/master/umd/context-observable.js

## Run Demo

```
git clone git@github.com:stvkoch/context-observable.git
cd context-observable
npm start
```

## What you need to manager the state of your app?

As a redux, you will need create reducers and actions.

## What you need to avoid "side-effect"?

Context-Observable following same ideia behind redux-observable, so what you will need is create your epics the same way that you already do in redux-observable.

## How I setup Context-Observable?

Then you import Context-Observable Component and pass your epics and reducers.

```
import { ContextObservable } from "context-observable";

import rootEpics as epics from "./epics";
import rootReducers as reducer from "./reducers";

const App = () => (
  <ContextObservable {...{ epics, reducer }}>
    <Product />
  </ContextObservable>
);
```

## How you dispatch actions to epics and to reducers?

```
import {Consumer} from 'context-observable';

  // ... in your render method:
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
      </React.Fragment>
    )}
  </Consumer>
```
