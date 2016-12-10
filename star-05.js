document.body.textContent
  .trim()
  .split('\n')
  .map(line => line
    .match(/\d+/g)
    .map(parseFloat)
  )
  .filter(([a, b, c]) => (
    a + b > c &&
    a + c > b &&
    b + c > a
  ))
  .length