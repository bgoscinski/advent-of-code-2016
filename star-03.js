document.body.textContent.trim().split('\n')
  .map(line => line.split('')
    .map((dir) => ({
      U: { x: 0, y: 1 },
      D: { x: 0, y: -1 },
      R: { x: 1, y: 0 },
      L: { x: -1, y: 0 },
    })[dir])
    .reduce(({x, y}, delta) => ({
      x: Math.max(0, Math.min(2, (x + delta.x))),
      y: Math.max(0, Math.min(2, (y + delta.y))),
    }), { x: 1, y: 1 })
  )
  .map(({x, y}) => ({
    '0,0': 7,
    '1,0': 8,
    '2,0': 9,
    '0,1': 4,
    '1,1': 5,
    '2,1': 6,
    '0,2': 1,
    '1,2': 2,
    '2,2': 3,
  })[[x, y].join(',')])
  .join('')