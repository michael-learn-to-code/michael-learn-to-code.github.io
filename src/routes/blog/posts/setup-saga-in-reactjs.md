---
title: Setup Saga in Reactjs
date: "2019-12-13"
tags: Saga, Redux, reactjs
---

In this post, I will learn how to setup saga

<!-- more -->

## Steps

1. Create react app
1. Setup redux
1. Setup saga

TLTR;

https://codesandbox.io/s/naughty-wildflower-fnzcp?fontsize=14&hidenavigation=1&theme=dark

## Create react app
this is simplest step, which can be done by using `create-react-app` util.

```
yarn create react-app test_saga
```

then wait a bit.

## Setup redux

I'm going to use new redux toolkit to setup the redux.

```
yarn add react-redux redux @reduxjs/toolkit
```

then I need to write some code to setup the reducer.

### Create a reducer
 A reducer contains 2 main elements: State and action.

 ```javascript
 // app/reducers/user-reducer.js

import { createAction, createReducer } from "@reduxjs/toolkit";

// declare an action
const addUserAction = createAction("@user/addUser");

// declare intialize state of reducer
const initialState = {
  users: []
};

// action handler
// here we use immer.js, so we don't need to return state.
const handleAddUser = (state, action) => {
  state.users.push(action.payload);
};

// export actions to easier access
export const UserActions = {
  addUserAction
};

// the reducer
export const reducer = createReducer(initialState, {
  [addUserAction.toString()]: handleAddUser
});
```

At this step, we have some notes:

- `@reduxjs/toolkit` use `immer.js` for state, so we don't need to return new state in action handler.

- by default, action object should be 

```json
{
    @type: string
    payload: any
}
```

- why do I have to use `toString()` of action object in the reducer?

because we declare action object with name is different then the object name. And the reducer will handle aciton by action name, not object name.

### Setup store

```js
// app/store/createStore.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../reducers/user-reducer";

export function createStore() {
  const rootReducer = combineReducers({
    user: userReducer
  });
  const store = configureStore({
    reducer: rootReducer
  });

  return store;
}
```

at this step, we create a store which is our application state. This store will be passed into Application context, so that it can be accessed from everwhere inside the app.

### Mount the store to the app

```js
// index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./styles.css";
import RootApp from "./App";
import { createStore } from "./store";

function App() {
  const store = createStore();
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Here we wrap our root app inside the Provider which provide our store.

### Write some code to demo how to use reducer in our app

```js
// App.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserActions } from "./reducers/user-reducer";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const handleAddUser = () => {
    dispatch(
      UserActions.addUserAction({
        name: "test user"
      })
    );
  };
  return (
    <div className="App">
      My App
      <div>Number of Users:{users.length} </div>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
export default App;
```

At here, when we click "Add user" button, action "addUserAction" will be fired and sent out with the payload is new user's information.

This action will be cauched by store, and pass to the user reducer. In its turn, user reducer call handleAddUser action handler to process the action.

When the state changed, useSelector will trigger re-render.

## Setup saga

By using saga, we try go put all our business logic at one place.
The flow will be like that:

- the GUI fires action `addUserRequest` with new user information in the payload

- Saga take the action:
  - at first, it fires a `setLoading` action to ask the app showing loading state.
  - next, it send data to api and wait the response.
  - when get the response, it fires a `addUserSuccess` action to save new data, then fires another `setLoading` action to ask the app turn off loading state.

### Update the reducer
```js
// app/reducers/user-reducer.js

import { createAction, createReducer } from "@reduxjs/toolkit";

// this action will be handle by the saga
const addUserRequest = createAction("@user/addUserRequest");

// we (this reducer) only take care this action
const addUserSuccess = createAction("@user/addUserSuccess");
const initialState = {
  users: []
};

const handleAddUser = (state, action) => {
  state.users.push(action.payload);
};
export const UserActions = {
  addUserRequest,
  addUserSuccess
};
export const reducer = createReducer(initialState, {
  // we only handle this action.
  [addUserSuccess.toString()]: handleAddUser
});

```

add a new reducer to handle loading state
```js
// app/reducers/loading-reducer.js
import { createAction, createReducer } from "@reduxjs/toolkit";

const setLoadingAction = createAction("@ui/setLoading");

function handleSetLoading(state, action) {
  state.loading = action.payload;
}
export const LoadingActions = {
  setLoadingAction
};
export const reducer = createReducer(
  {
    loading: false
  },
  {
    [setLoadingAction.toString()]: handleSetLoading
  }
);
```

### Declare the saga

```js
// app/sagas/user-saga.js

import { takeLatest, put, call } from "redux-saga/effects";

import { UserActions } from "../reducers/user-reducer";
import { LoadingActions } from "../reducers/loading-reducer";

// fake api
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function fakeApi() {
  await sleep(2000);
}

// this saga contains business logic of creating user
function* addingUserSaga({ payload }) {
  yield put(LoadingActions.setLoadingAction(true));
  console.log(`userinfo: ${payload.name}`);
  yield call(fakeApi);
  yield put(UserActions.addUserSuccess(payload));
  yield put(LoadingActions.setLoadingAction(false));
}

// this is important function, which delcare what we want.
// here we will to register that we will handle `addUserRequest`.
// `takeLatest` says that we only handle that latest one. 
export function setup() {
  return [takeLatest(UserActions.addUserRequest.toString(), addingUserSaga)];
}
```

and the main saga
```js
// app/sagas/index.js

import { all } from "redux-saga/effects";
import * as userSaga from "./user-saga";

export function* setupSaga() {
  yield all([...userSaga.setup()]);
}

```

### Update the app
```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserActions } from "./reducers/user-reducer";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.loading.loading);
  const handleAddUser = () => {
    dispatch(
      UserActions.addUserRequest({
        name: "test user"
      })
    );
  };
  return (
    <div className="App">
      My App
      <div>Number of Users:{users.length} </div>
      {loading && <span>Loading...</span>}
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
export default App;
```
