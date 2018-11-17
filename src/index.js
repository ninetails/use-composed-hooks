export default function useComposedHooks (...hooks) {
  return hooks.reduce(
    (acc, [useHook, ...args]) => [
      ...acc,
      useHook(...args.map(arg => (typeof arg === 'function' ? arg(acc) : arg)))
    ],
    []
  )
}
