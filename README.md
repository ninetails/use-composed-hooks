# useComposedHooks

> Yet another library to compose React Hooks, yay!

![No Maintenance Intended](http://unmaintained.tech/badge.svg)
[![GitHub license](https://img.shields.io/github/license/ninetails/use-composed-hooks.svg)](https://github.com/ninetails/use-composed-hooks/blob/master/LICENSE)
[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://github.com/ninetails/use-composed-hooks/)

## Why use this?

Because its simpler :D

```js
function NotComposed() {
  const [count, setCount] = useState(1)
  const result = useCustomHook(count, anotherArg)

  return <button onClick={() => setCount(count + 1)}>Result: {result}</button>
}

function Composed() {
  const [[count, setCount], result] = useComposedHooks(
    [useState, 1],
    [useCustomHook, ([count]) => count, anotherArg]
  )

  return <button onClick={() => setCount(count + 1)}>Result: {result}</button>
}
```

## And why you should not use this?

It's so simple that I'd recommend you to just copy this to your source!

```js
export default function useComposedHooks(...hooks) {
  return hooks.reduce(
    (acc, [useHook, ...args]) => [
      ...acc,
      useHook(...args.map(arg => (typeof arg === 'function' ? arg(acc) : arg)))
    ],
    []
  )
}
```

## But I am too stubborn

So just install it

> npm install --save use-composed-hooks

### Prerequisites

`react@^16.7.0`, but...

(Currently it's based on `react@^16.7.0-alpha.2`, so it may change... or just use it, because it don't depends on React at all, it's just a reducer that run over functions)

## Example mixing functions with hooks

```js
function doubleIt(num) {
  return num * 2
}

function sum(...args) {
  return args.reduce((acc, arg) => acc + arg, 0)
}

const useComposed = initialCountState =>
  useComposedHooks(
    [useState, initialCountState],
    [doubleIt, ([[count]]) => count],
    [sum, ([[count]]) => count, ([, doubled]) => doubled, 4],
    [useState, ([, , summed]) => summed]
  )

function MyComponent() {
  const [[, setCount], , summed, [statedSum]] = useComposed(1)

  return (
    <button data-testid='button' onClick={() => setCount(summed)}>
      {summed} - {statedSum}
    </button>
  )
}
```

Will render `7 - 7` and after clicking once, will render `25 - 7` because the second one come from state and it was not changed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
