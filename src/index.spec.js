import React, { useState } from 'react'
import { render, fireEvent } from 'react-testing-library'
import useComposedHooks from '.'

function doubleIt (num) {
  return num * 2
}

function sum (...args) {
  return args.reduce((acc, arg) => acc + arg, 0)
}

describe('useComposedHooks', () => {
  it('should work', () => {
    const useComposed = initialCountState =>
      useComposedHooks(
        [useState, initialCountState],
        [doubleIt, ([[count]]) => count],
        [sum, ([[count]]) => count, ([, doubled]) => doubled, 4],
        [useState, ([, , summed]) => summed]
      )

    function MyComponent () {
      const [[, setCount], , summed, [statedSum]] = useComposed(1)

      return (
        <button data-testid='button' onClick={() => setCount(summed)}>
          {summed} - {statedSum}
        </button>
      )
    }

    const { container, getByTestId } = render(<MyComponent />)
    expect(container.firstChild).toHaveTextContent('7 - 7')
    fireEvent.click(getByTestId('button'))
    expect(container.firstChild).toHaveTextContent('25 - 7')
  })
})
