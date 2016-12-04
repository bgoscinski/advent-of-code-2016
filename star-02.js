document.body.textContent.trim().split(/,\s*/)
  .map(i => ({
    turn: i.charAt(0) === 'R' ? +90 : -90,
    steps: parseInt(i.slice(1), 10)
  }))
  .reduce((acc, {turn, steps}) => acc.concat({
    dir: ((acc[acc.length - 1].dir || 360) + turn) % 360,
    steps
  }), [{ dir: 0, steps: 0 }])
  .reduce((acc, {dir, steps}) => acc.concat(Array(steps).fill(({
    0: { x: 0, y: 1 },
    90: { x: 1, y: 0 },
    180: { x: 0, y: -1 },
    270: { x: -1, y: 0 },
  })[dir])), [])
  .reduce((pos, change) => pos.concat({
    x: pos[pos.length - 1].x + change.x,
    y: pos[pos.length - 1].y + change.y
  }), [{ x: 0, y: 0 }])
  .reduce(([{dup, visited}], {x, y}) => [{
    dup: dup || visited[x + ':' + y],
    visited: Object.assign({}, visited, {
      [x + ':' + y]: { x, y }
    })
  }], [{ visited: {} }])
  .map(({dup}) => Math.abs(dup.x) + Math.abs(dup.y))
  .forEach((answer) => console.log(answer))