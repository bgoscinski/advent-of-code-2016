document.body.textContent
  .trim()
  .split('\n')
  .map(line => line
    .match(/\d+/g)
    .map(parseFloat)
  )
  .reduce(([cA, cB, cC], [a, b, c]) => [
    [...cA, a],
    [...cB, b],
    [...cC, c],
  ], [[], [], []])
  .reduce((acc, colItems) => [
    ...acc,
    ...colItems
      .slice(3)
      .reduce(([last, ...rest], item) => [
        ...last.length === 3 ? [[item], last] : [[...last, item]],
        ...rest,
      ], [colItems.slice(0, 3)])
  ], [])
  .filter(([a, b, c]) => (
    a + b > c &&
    a + c > b &&
    b + c > a
  ))
  .length