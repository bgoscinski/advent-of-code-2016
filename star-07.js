document.body.textContent
  .trim()
  .split('\n')
  .map(line => ({
    roomName: line.match(/[a-z-]+/)[0].slice(0, -1),
    sectorId: line.match(/\d+/)[0],
    checksum: line.match(/\[([a-z]+)\]/)[1],
  }))
  .map(({roomName, sectorId, checksum}) => ({
    roomName,
    sectorId,
    checksum,
    charCount: roomName
      .replace(/-/g, '')
      .split('')
      .reduce((charCount, char) => Object.assign({}, charCount, {
        [char]: (charCount[char] || 0) + 1
      }), {})
  }))
  .map(({roomName, sectorId, checksum, charCount}) => ({
    roomName,
    sectorId,
    checksum,
    calcChecksum: Object.keys(charCount)
      .map(char => [char, charCount[char]])
      .sort(([charA, countA], [charB, countB]) => (
        (countA - countB) ||
        (charB.charCodeAt(0) - charA.charCodeAt(0))
      ))
      .reverse()
      .slice(0, 5)
      .map(([char]) => char)
      .join('')
  }))
  .filter(({ checksum, calcChecksum }) => checksum === calcChecksum)
  .reduce((sum, { sectorId }) => sum + parseFloat(sectorId), 0)