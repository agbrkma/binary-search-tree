function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    return `You made it in 0 moves! Here's your path:\n${JSON.stringify([
      start,
    ])}`;
  }

  // All possible moves a knight can make
  const knightMoves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  // BFS initialization
  const queue = [[start, [start]]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [currentPosition, path] = queue.shift();

    for (let i = 0; i < knightMoves.length; i++) {
      const move = knightMoves[i];
      const newPosition = [
        currentPosition[0] + move[0],
        currentPosition[1] + move[1],
      ];

      if (
        newPosition[0] >= 0 &&
        newPosition[0] < 8 &&
        newPosition[1] >= 0 &&
        newPosition[1] < 8
      ) {
        if (newPosition[0] === end[0] && newPosition[1] === end[1]) {
          return `You made it in ${path.length} moves! Here's your path:\n${path
            .concat([newPosition])
            .map(JSON.stringify)
            .join("\n")}`;
        }

        if (!visited.has(newPosition.toString())) {
          visited.add(newPosition.toString());
          queue.push([newPosition, path.concat([newPosition])]);
        }
      }
    }
  }

  return "No possible path.";
}

// Example usage:
console.log(knightMoves([3, 3], [4, 3]));
