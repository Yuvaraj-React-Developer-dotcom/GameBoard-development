// import React, { useState, useEffect, useMemo } from 'react';

// const GameBoard = () => {
//   const rows = 5;
//   const cols = 10;

//   // Initialize grid state with useState
//   const [grid, setGrid] = useState([]);

//   // Initialize defenders and attackers
//   const [defenders, setDefenders] = useState([]);
//   const [attackers, setAttackers] = useState([]);

//   // Define different defenders and attackers with their power points
//   const defendersList = useMemo(() => [
//     { emoji: '🐑', power: 1, attackPower: 1, blastEmoji: '💥' },
//     { emoji: '🐕', power: 2, attackPower: 1, blastEmoji: '💥' },
//     { emoji: '🐎', power: 3, attackPower: 2, blastEmoji: '💥' },
//     { emoji: '🐄', power: 4, attackPower: 2, blastEmoji: '💥' },
//     { emoji: '🦙', power: 5, attackPower: 3, blastEmoji: '💥' }
//   ], []);

//   const attackersList = useMemo(() => [
//     { emoji: '🦊', power: 2 },
//     { emoji: '🐺', power: 3 },
//     { emoji: '🦁', power: 4 },
//     { emoji: '🐯', power: 5 },
//     { emoji: '🐻', power: 6 }
//   ], []);

//   // Initialize grid and positions on component mount
//   useEffect(() => {
//     const initialGrid = Array(rows).fill().map(() => Array(cols).fill(''));
//     setGrid(initialGrid);

//     // Initialize defenders at fixed positions on the left side
//     const initialDefenders = defendersList.map((defender, index) => ({
//       id: `defender-${index}`,
//       row: index,
//       col: 0, // Start at the beginning of columns (left side)
//       ...defender
//     }));
//     setDefenders(initialDefenders);

//     // Initialize attackers at fixed positions on the right side
//     const initialAttackers = attackersList.map((attacker, index) => ({
//       id: `attacker-${index}`,
//       row: index,
//       col: cols - 1, // Start at the end of columns (right side)
//       ...attacker
//     }));
//     setAttackers(initialAttackers);
//   }, [rows, cols, defendersList, attackersList]);

//   // Function to handle defender click and attack
//   const handleDefenderClick = (defender) => {
//     const updatedAttackers = [...attackers];

//     // Find adjacent attackers on the same row
//     const adjacentAttackers = updatedAttackers.filter(attacker =>
//       attacker.row === defender.row && attacker.col === cols - 1 // On the right side of defender
//     );

//     // Reduce attacker's power based on defender's attack power
//     adjacentAttackers.forEach(attacker => {
//       attacker.power -= defender.attackPower;
//       if (attacker.power <= 0) {
//         // If attacker's power drops to zero or below, show blast emoji
//         const index = updatedAttackers.indexOf(attacker);
//         updatedAttackers[index] = { ...attacker, emoji: defender.blastEmoji };
//       }
//     });

//     // Update attackers state
//     setAttackers(updatedAttackers);
//   };

//   // Update grid with defenders and attackers positions
//   useEffect(() => {
//     if (grid.length === 0) return; // Ensure grid is initialized

//     const updatedGrid = Array(rows).fill().map(() => Array(cols).fill(''));

//     // Place defenders on the grid
//     defenders.forEach(defender => {
//       updatedGrid[defender.row][defender.col] = defender.emoji;
//     });

//     // Place attackers on the grid
//     attackers.forEach(attacker => {
//       updatedGrid[attacker.row][attacker.col] = attacker.emoji;
//     });

//     // Update the grid state
//     setGrid(updatedGrid);

//   }, [rows, cols, defenders, attackers]);

//   // Render grid and game board
//   return (
//     <div className="grid grid-cols-10 grid-rows-5 gap-1 p-4">
//       {grid.map((row, rowIndex) => (
//         row.map((col, colIndex) => (
//           <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10 border border-gray-300"
//                onClick={() => handleDefenderClick(defenders.find(defender => defender.row === rowIndex))}>
//             {grid[rowIndex][colIndex]}
//           </div>
//         ))
//       ))}
//     </div>
//   );
// };

// export default GameBoard;


import React, { useState, useEffect, useMemo } from 'react';

const GameBoard = () => {
  const rows = 5;
  const cols = 10;

  // Initialize grid state with useState
  const [grid, setGrid] = useState([]);

  // Initialize defenders and attackers
  const [defenders, setDefenders] = useState([]);
  const [attackers, setAttackers] = useState([]);

  // Define different defenders and attackers with their power points
  const defendersList = useMemo(() => [
    { emoji: '🐑', power: 1, attackPower: 1, fireEmoji: '🔥' },
    { emoji: '🐕', power: 2, attackPower: 1, fireEmoji: '🔥' },
    { emoji: '🐎', power: 3, attackPower: 2, fireEmoji: '🔥' },
    { emoji: '🐄', power: 4, attackPower: 2, fireEmoji: '🔥' },
    { emoji: '🦙', power: 5, attackPower: 3, fireEmoji: '🔥' }
  ], []);

  const attackersList = useMemo(() => [
    { emoji: '🦊', power: 2, blastEmoji: '💥' },
    { emoji: '🐺', power: 3, blastEmoji: '💥' },
    { emoji: '🦁', power: 4, blastEmoji: '💥' },
    { emoji: '🐯', power: 5, blastEmoji: '💥' },
    { emoji: '🐻', power: 6, blastEmoji: '💥' }
  ], []);

  // Initialize grid and positions on component mount
  useEffect(() => {
    const initialGrid = Array(rows).fill().map(() => Array(cols).fill(''));
    setGrid(initialGrid);

    // Initialize defenders at fixed positions on the left side
    const initialDefenders = defendersList.map((defender, index) => ({
      id: `defender-${index}`,
      row: index,
      col: 0, // Start at the beginning of columns (left side)
      ...defender
    }));
    setDefenders(initialDefenders);

    // Initialize attackers at fixed positions on the right side
    const initialAttackers = attackersList.map((attacker, index) => ({
      id: `attacker-${index}`,
      row: index,
      col: cols - 1, // Start at the end of columns (right side)
      ...attacker
    }));
    setAttackers(initialAttackers);
  }, [rows, cols, defendersList, attackersList]);

  // Function to handle defender click and launch fire emoji
  const handleDefenderClick = (defender) => {
    // Launch fire emoji towards attackers
    launchFireEmoji(defender);
  };

  // Function to launch fire emoji towards attackers
  const launchFireEmoji = (defender) => {
    const { row: defenderRow } = defender;
    const updatedGrid = [...grid];

    let col = 1; // Start at column 1 (next to defender)

    const interval = setInterval(() => {
      if (col > cols - 1) {
        clearInterval(interval); // Stop moving fire emoji if it reaches the last column
        return;
      }

      // Clear previous fire emoji position
      if (col > 1) {
        updatedGrid[defenderRow][col - 1] = '';
      }

      // Move fire emoji to the next column
      updatedGrid[defenderRow][col] = defender.fireEmoji;

      // Check for any attacker in the current column
      const attackerInCol = attackers.find(attacker => attacker.row === defenderRow && attacker.col === col);

      if (attackerInCol) {
        // Reduce attacker's power based on defender's attack power
        attackerInCol.power -= defender.attackPower;

        // If attacker's power drops to zero or below, show blast emoji in attackers array
        if (attackerInCol.power <= 0) {
          const index = attackers.indexOf(attackerInCol);
          const updatedAttackers = [...attackers];
          updatedAttackers[index] = { ...attackerInCol, emoji: attackerInCol.blastEmoji };
          setAttackers(updatedAttackers);
          clearInterval(interval); // Stop fire animation if attacker is destroyed
        }
      }

      // Update grid state with fire emoji movement
      setGrid(updatedGrid);

      col++; // Move to the next column
    }, 500); // Move fire emoji every 0.5 seconds
  };

  // Update grid with defenders and attackers positions
  useEffect(() => {
    if (grid.length === 0) return; // Ensure grid is initialized

    const updatedGrid = Array(rows).fill().map(() => Array(cols).fill(''));

    // Place defenders on the grid
    defenders.forEach(defender => {
      updatedGrid[defender.row][defender.col] = defender.emoji;
    });

    // Place attackers on the grid
    attackers.forEach(attacker => {
      updatedGrid[attacker.row][attacker.col] = attacker.emoji;
    });

    // Update the grid state
    setGrid(updatedGrid);

  }, [rows, cols, defenders, attackers]);

  // Render grid and game board
  return (
    <div className="grid grid-cols-10 grid-rows-5 gap-1 p-4">
      {grid.map((row, rowIndex) => (
        row.map((col, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10 border border-gray-300"
               onClick={() => handleDefenderClick(defenders.find(defender => defender.row === rowIndex))}>
            {grid[rowIndex][colIndex]}
          </div>
        ))
      ))}
    </div>
  );
};

export default GameBoard;


