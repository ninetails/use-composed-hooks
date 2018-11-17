# useComposedHooks

> Yet another library to compose React Hooks, yay!

## Why use this?

Because its simpler :D

```js
function NotComposed () {
  const [count, setCount] = setState(1)
  const [doubledCount] = setState(count)

  <button onClick={() => setCount(count + 1)}>
    Twiced counter: {doubledCount}
  </button>
}
```
