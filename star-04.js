[
  `
    __1__
    _234_
    56789
    _ABC_
    __D__
  `,
  document.body.textContent
]
  .reduce((acc, str) => (
    acc[0].push(str
      .trim()
      .split('\n')
      .map(line => line
        .trim()
        .split('')
        .map(char => char === '_' ? null : char)
      )
    ),
    acc
  ), [[]])
  .map(([padLines, directions]) => ({
    pad: padLines
      .reduce((acc, line, y) => line
        .reduce((acc, num, x) => Object.assign(acc, {
          [[x, y].join(',')]: num
        }), acc), {}),
    deltas: directions
      .map(lineDirections => lineDirections
        .map(direction => ({
          U: { x: 0, y: -1 },
          D: { x: 0, y: 1 },
          R: { x: 1, y: 0 },
          L: { x: -1, y: 0 },
        })[direction])
      )
  }))
  .map(({pad, deltas}) => deltas
    .reduce(
      (acc, lineDeltas) => [
        ...acc,
        lineDeltas.reduce(
          ({x, y}, {x: dx, y: dy}) => ({
            x: pad[[x + dx, y + dy].join(',')] ? x + dx : x,
            y: pad[[x + dx, y + dy].join(',')] ? y + dy : y,
          }),
          {
            x: acc[acc.length - 1] ? acc[acc.length - 1].x : 1,
            y: acc[acc.length - 1] ? acc[acc.length - 1].y : 1,
          }
        )
      ],
      []
    )
    .map(({x, y}) => pad[[x, y].join(',')])
    .join('')
  )[0]