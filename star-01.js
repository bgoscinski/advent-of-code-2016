document.body.textContent.trim().split(/,\s*/)
  .map(i => ({
    turn: i.charAt(0) === 'R' ? +90 : -90,
    steps: parseInt(i.slice(1), 10)
  }))
  .reduce((acc, {turn, steps}) => acc.concat({
    dir: ((acc[acc.length - 1].dir || 360) + turn) % 360,
    steps
  }), [{ dir: 0, steps: 0 }])
  .reduce(([acc], {dir, steps}) => (
    acc[dir] += steps,
    [acc]
  ), [{ 0: 0, 90: 0, 180: 0, 270: 0 }])
  .map(stepsInDir => (
    Math.abs(stepsInDir[0] - stepsInDir[180]) +
    Math.abs(stepsInDir[90] - stepsInDir[270])
  ))
  .forEach((answer) => console.log(answer))