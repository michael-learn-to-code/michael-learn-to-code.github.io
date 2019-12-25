---
title: Diary Log
date: 2019-12-08
tags: Diary
---


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
