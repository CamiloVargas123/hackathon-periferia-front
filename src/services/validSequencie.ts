interface Positions {
  row: number
  column: number
}
export function validSequencie({ adn }: { adn: string[] }): boolean {
  const rows = adn.length;
  const columns = adn[0].length;
  const sequencieLength = 4;
  const allMutants: Array<Positions[]> = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i === 0) verticalMutans(j);
      if (j === 0) horizontalMutans(i);
      if (i < rows - sequencieLength + 1 && j < columns - sequencieLength + 1) diagonalMutans(i, j)
    }
  }

  function verticalMutans(column: number) {
    for (let row = 0; row < rows - sequencieLength + 1; row++) {
      let equal = true;
      for (let i = 1; i < sequencieLength; i++) {
        if (adn[row][column] !== adn[row + i][column]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        const positions: Positions[] = new Array(sequencieLength)
          .fill(undefined)
          .map((_, i) => ({ row: row + i, column }));
        allMutants.push(positions);
        row += sequencieLength;
      }
    }
  }

  function horizontalMutans(row: number) {
    for (let column = 0; column < columns - sequencieLength + 1; column++) {
      let equal = true;
      for (let i = 1; i < sequencieLength; i++) {
        if (adn[row][column] !== adn[row][column + i]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        const positions: Positions[] = new Array(sequencieLength)
          .fill(undefined)
          .map((_, i) => ({ row: row, column: column + i }));
        allMutants.push(positions);
        column += sequencieLength;
      }
    }
  }

  function diagonalMutans(row: number, column: number) {
    let equal = true;
    for (let i = 1; i < sequencieLength; i++) {
      if (adn[row][column] !== adn[row + i][column + i]) {
        equal = false;
        break;
      }
    }
    if (equal) {
      const positions: Positions[] = new Array(sequencieLength)
        .fill(undefined)
        .map((_, i) => ({ row: row + i, column: column + i }));
      allMutants.push(positions);
    }
  }

  return allMutants.length > 1;
}