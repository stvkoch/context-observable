# Context-Observable


Context-Observable manager the state of you React App follow same interface of Redux (actions and reducers) and use same ideia behind redux-observable to avoid "side-effect".

### Dependencies

- React v16.3 (https://reactjs.org/)
- Rxjs 5 (http://reactivex.io/rxjs)


## What you need to manager the state of your app?

As a redux, you will need create reducers and actions


## What you need to avoid "side-effect"?

Context-Observable follow same ideia behind redux-observable, so what you will need is create your epics the same way that you do in redux-observable.


## How I setup Context-Observable?

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
