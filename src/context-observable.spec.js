import expect from "expect";
import React from "react";
import { Observable } from "rxjs";

import { shallow, mount, render } from "enzyme";

import { ContextObservable, Consumer } from "src/";

const reducerSetState = (state, action) => (action && action.state) || state;
const actionSetState = newState => ({ state: newState });

const epicSync = $action => $action;

const epicAsync = ($action, store) =>
  $action.switchMap(action =>
    Observable.interval(200)
      .timeInterval()
      .pluck("interval")
      .take(3)
      .map(value => ({ state: { count: store.getState().count + 1 } }))
  );

describe("ContextObservable", () => {
  // let node

  beforeEach(() => {
    // node = document.createElement('div')
  });

  afterEach(() => {
    // unmountComponentAtNode(node)
  });

  it("without arguments", done => {
    const wrapper = shallow(<ContextObservable />);
    expect(wrapper.find("[contextObservable]").length).toEqual(1);
    expect(wrapper.state()).toEqual(null);
    done();
  });

  it("with initialState", done => {
    const initialState = { s: "test" };
    const wrapper = shallow(<ContextObservable initialState={initialState} />);
    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);
    done();
  });

  it("without epics", done => {
    const initialState = { s: "test" };
    const expectedState = { s: "should be a state" };
    const wrapper = shallow(
      <ContextObservable
        reducer={reducerSetState}
        initialState={initialState}
      />
    );
    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);
    wrapper.instance().dispatch(actionSetState(expectedState));
    expect(wrapper.state()).toEqual(expectedState);
    done();
  });

  it("with sync epics", done => {
    const initialState = { s: "test" };
    const expectedState = { s: "should be a state" };
    const wrapper = shallow(
      <ContextObservable
        reducer={reducerSetState}
        epics={[epicSync]}
        initialState={initialState}
      />
    );
    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);
    wrapper.instance().dispatch(actionSetState(expectedState));
    expect(wrapper.state()).toEqual(expectedState);
    done();
  });

  it("with sync epics to get state", done => {
    const initialState = { count: 0 };
    const expectedState = { count: 1 };

    const epicGetState = ($action, store) =>
      $action.switchMap(a =>
        Observable.of({ state: { count: store.getState().count + 1 } })
      );

    const wrapper = shallow(
      <ContextObservable
        reducer={reducerSetState}
        epics={[epicGetState]}
        initialState={initialState}
      />
    );
    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);
    wrapper.instance().dispatch(actionSetState(expectedState));
    expect(wrapper.state()).toEqual(expectedState);
    done();
  });

  it("with reducer", done => {
    const newState = { anyProp: "reducer alway will return this state" };
    const reducer = (state, action) => newState;
    const initialState = { s: "test" };

    const wrapper = shallow(
      <ContextObservable
        reducer={reducer}
        epics={[epicSync]}
        initialState={initialState}
      />
    );

    expect(wrapper.state()).toEqual(newState);
    expect(wrapper.state()).toNotEqual(null);
    wrapper.instance().dispatch(actionSetState("I could set anything but..."));
    expect(wrapper.state()).toEqual(newState);
    done();
  });

  it("with reducer and sync epics", done => {
    const initialState = { count: 0 };
    const newState = { count: 1 };

    const wrapper = shallow(
      <ContextObservable
        epics={[epicSync]}
        reducer={reducerSetState}
        initialState={initialState}
        onSetState={s => {
          expect(wrapper.state()).toEqual(newState);
          done();
        }}
      />
    );

    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);

    wrapper.instance().dispatch(actionSetState(newState));
  });

  it("with reducer and async epics", done => {
    const initialState = { count: 0 };

    const wrapper = shallow(
      <ContextObservable
        epics={[epicAsync]}
        reducer={reducerSetState}
        initialState={initialState}
        onSetState={s => {
          initialState.count++;
          expect(wrapper.state()).toEqual(initialState);
          if (wrapper.state().count == 3) done();
        }}
      />
    );

    expect(wrapper.state()).toEqual(initialState);
    expect(wrapper.state()).toNotEqual(null);

    wrapper.instance().dispatch(actionSetState(initialState));
  });
});

describe("Consumer", () => {
  it("mount", done => {
    const wrapper = shallow(
      <div>
        <Consumer contextConsumer>{() => <div>hello</div>}</Consumer>
      </div>
    );
    expect(wrapper.find("[contextConsumer]").length).toEqual(1);
    done();
  });

  it("check state from consumer", done => {
    const initialState = { count: 200 };
    let called = false;

    const spyConsumer = ({ state, dispatch }) => {
      expect(state).toEqual(initialState);
      called = true;
      done();
    };

    const wrapper = render(
      <div>
        <ContextObservable initialState={initialState}>
          <Consumer contextConsumer>{spyConsumer}</Consumer>
        </ContextObservable>
      </div>
    );

    setTimeout(() => {
      expect(called).toEqual(true);
      done;
    }, 10);
  });

  it("change state via consumer", done => {
    const initialState = { count: 0 };
    const newState = { count: 212 };
    let called = 0;

    const spyConsumer = ({ state, dispatch }) => {
        expect(state).toEqual(initialState);
        return <button onClick={() => dispatch(actionSetState(newState))}>ok</button>;
    };

    const wrapper = shallow(
        <ContextObservable
          reducer={reducerSetState}
          initialState={initialState}
        >
          <Consumer contextConsumer>{spyConsumer}</Consumer>
        </ContextObservable>
    );

    done();
  });
});
