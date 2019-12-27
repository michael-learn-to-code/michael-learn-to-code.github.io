---
title: Diary Log
date: 2019-12-08
tags: Diary
---

## 25/12/2019
Way to orgranize redux. Inspired by Mobx State tree, I think about concepts: State, Views, Actions. So my reducer will be like:

```js

const action1 = createAction('@prefix/action1')

// usage
// import Actions from '../reducers/my-reducer
// dispatch(Actions.action1())
//

export default {
    action1
}
```

Then I have State and Actions.
About Views, I use `reselect` so that I can move all views to a common place.
```js
import {createSelector} from 'reselect';

function createAViews() {
    const mySelector = (state) => state.prefix.field

    return {
        getField: createSelector([mySelector], d=> d)
    }
}

export const AViews = createAViews()
```
Why do I have to use `createAViews` function? Naming issue. For me, it's a bit hard to name something clearly and unique. Using function helps me avoid this.

## 22/12/2019
Today I tried new way to write styles for React component with `@material-ui`

The old way
```js
const useStyles = makeStyles(theme => ({
    container: {

    },
    button: {

    }

}))
```

The new way:
```js
const useStyles = makeStyles(theme => ({
    container: {
        ...
        '& .button': {

        }
    }

})
```

Why?:
- less typing
old way I have to
```
<button className={classes.button}>
```
new way
```
<button className="button">
```

Week points:
- have to use brain for css selector.
- no intellisense, easy for typo :(