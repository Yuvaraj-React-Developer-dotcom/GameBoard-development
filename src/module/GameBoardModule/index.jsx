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
import Lottie from 'react-lottie-player'
// attackers
import dinosaurJson from '../../assets/lottie/dinosaur.json'
import kangaruJson from '../../assets/lottie/kangaru.json'
import snackJson from '../../assets/lottie/snack.json'
import crocodileJson from '../../assets/lottie/crocodile.json'
import gorillaJson from '../../assets/lottie/gorilla.json'
import tigerJson from '../../assets/lottie/tiger.json'
// defenders
import buffaloJson from '../../assets/lottie/buffalo.json'

import duckJson from '../../assets/lottie/duck.json'
import donkeyJson from '../../assets/lottie/donkey.json'
import sevalJson from '../../assets/lottie/seval.json'
import dogjson from '../../assets/lottie/dog.json'
// common 
import blastJson from '../../assets/lottie/blast.json'
import fireJson from '../../assets/lottie/fire.json'
// plant
import powerPlant from '../../assets/lottie/powerPlant.json'




const GameBoard = () => {
    const rows = 5;
    const cols = 10;

    const [grid, setGrid] = useState([]);
    const [defenders, setDefenders] = useState([]);
    const [attackers, setAttackers] = useState([]);
    const [update, setUpdate] = useState(0)

    const showAnimal = (animalName) => {
        return (
            <Lottie
                loop
                animationData={animalName}
                play
                style={{ width: "100%", height: "100%" }}
            // forceSegments={false}
            // direction={ -1}
            // speed={1}
            // segments={[50, 100]}
            />

        )
    }

    const showFire = (fire) => {
        return (
            <Lottie
                loop
                animationData={fire}
                play
                style={{ width: "40%", height: "40%" }}
            />
        )
    }
    const showPlant = (plant) => {
        return (
            <Lottie
                loop
                animationData={plant}
                play
                style={{ width: "100%", height: "100%" }}
                segments={[18, 100]}
            />
        )
    }



    const defendersList = useMemo(() => [
        { category: 'defender', emoji: showAnimal(dogjson), defencePower: 10, attackPower: 2, fireEmoji: showFire(fireJson), },
        { category: 'defender', emoji: showAnimal(buffaloJson), defencePower: 10, attackPower: 2, fireEmoji: showFire(fireJson), },
        { category: 'defender', emoji: showAnimal(duckJson), defencePower: 10, attackPower: 2, fireEmoji: showFire(fireJson), },
        { category: 'defender', emoji: showAnimal(donkeyJson), defencePower: 10, attackPower: 2, fireEmoji: showFire(fireJson), },
        { category: 'defender', emoji: showAnimal(sevalJson), defencePower: 10, attackPower: 2, fireEmoji: showFire(fireJson), }
    ], []);

    const attackersList = useMemo(() => [
        { category: 'attacker', emoji: showAnimal(gorillaJson), attackPower: 5, defencePower: 10, blastEmoji: showAnimal(blastJson), },
        { category: 'attacker', emoji: showAnimal(kangaruJson), attackPower: 5, defencePower: 10, blastEmoji: showAnimal(blastJson), },
        { category: 'attacker', emoji: showAnimal(dinosaurJson), attackPower: 5, defencePower: 10, blastEmoji: showAnimal(blastJson), },
        { category: 'attacker', emoji: showAnimal(snackJson), attackPower: 5, defencePower: 10, blastEmoji: showAnimal(blastJson), },
        { category: 'attacker', emoji: showAnimal(tigerJson), attackPower: 5, defencePower: 10, blastEmoji: showAnimal(blastJson), }
    ], []);
    const powerPlantList = useMemo(() => [
        { category: 'attacker', emoji: showPlant(powerPlant), powerEnergy: 5, },
        { category: 'attacker', emoji: showPlant(powerPlant), powerEnergy: 5, },
        { category: 'attacker', emoji: showPlant(powerPlant), powerEnergy: 5, },
        { category: 'attacker', emoji: showPlant(powerPlant), powerEnergy: 5 },
        { category: 'attacker', emoji: showPlant(powerPlant), powerEnergy: 5, }
    ], []);

    console.log(powerPlantList, 'find powerPlantList')



    useEffect(() => {
        const initialGrid = Array(rows).fill().map(() => Array(cols).fill(''));
        setGrid(initialGrid);

        const initialDefenders = defendersList.map((defender, index) => ({
            id: `defender-${index}`,
            row: index,
            col: 0,
            ...defender
        }));
        setDefenders(initialDefenders);

        const initialAttackers = attackersList.map((attacker, index) => ({
            id: `attacker-${index}`,
            row: index,
            col: cols - 1,
            ...attacker
        }));
        setAttackers(initialAttackers);
    }, [defendersList, attackersList]);

    const launchFireEmoji = (defender) => {
        const { row: defenderRow } = defender;
        const updatedGrid = [...grid];

        let col = 1;

        const interval = setInterval(() => {
            if (col > cols - 1) {
                clearInterval(interval);
                return;
            }

            if (col > 1) {
                updatedGrid[defenderRow][col - 1] = '';
            }

            const attackerInCol = attackers.find(attacker => attacker.row === defenderRow && attacker.col === col);

            if (attackerInCol) {
                attackerInCol.defencePower -= defender.attackPower;

                if (attackerInCol.defencePower <= 0) {
                    const index = attackers.indexOf(attackerInCol);
                    const updatedAttackers = [...attackers];
                    updatedAttackers[index] = { ...attackerInCol, emoji: attackerInCol.blastEmoji };
                    setAttackers(updatedAttackers);
                }

                clearInterval(interval);
                setGrid(updatedGrid);
                return;
            }

            updatedGrid[defenderRow][col] = defender.fireEmoji;
            setGrid(updatedGrid);

            col++;
        }, 500);
    };

    const moveAttackers = () => {
        const updatedAttackers = attackers.map(attacker => {
            if (attacker.col > 0) {
                return { ...attacker, col: attacker.col - 1 };
            }
            return attacker;
        });
        setAttackers(updatedAttackers);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // moveAttackers();
        }, 1500); // Move attackers every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleDefenderClick = (defender) => {
        launchFireEmoji(defender);
    };

    useEffect(() => {
        if (grid.length === 0) return;

        const updatedGrid = Array(rows).fill().map(() => Array(cols).fill(''));

        defenders.forEach(defender => {
            updatedGrid[defender.row][defender.col] = defender.emoji;
        });

        attackers.forEach(attacker => {
            updatedGrid[attacker.row][attacker.col] = attacker.emoji;
        });

        setGrid(updatedGrid);
    }, [rows, cols, defenders, attackers]);
    useEffect(() => {
        setInterval(() => {
            setUpdate((prevData) => prevData + 1)
        }, [500])
    }, [])

    return (
        <>
            <div className=''>
                <div className='h-[10vh] bg-[#508C9B]'></div>
                <div className='h-[80vh] bg-[#FF8225]'>
                    <div className='flex h-full'>
                        <div className="w-[20vw] bg-[#134B70]">
                            {powerPlantList?.map((plant, plantIndex) => (
                                <div className='w-full h-[20%]'>
                                    {plant?.emoji}
                                </div>
                            ))}F
                        </div>
                        <div className="w-[80vw] bg-[#677D6A]">
                            <div className="grid grid-cols-10 grid-rows-5 w-[80vw] h-[80vh] bg-[black]">
                                {grid.map((row, rowIndex) => (
                                    row.map((col, colIndex) => {
                                        console.log(defenders[0].category, "Find mapped data")

                                        return (
                                            <div key={`${rowIndex}-${colIndex}`} className="relative border border-gray-300 text-center content-center"
                                                onClick={() => { grid[rowIndex][colIndex] ? handleDefenderClick(defenders.find(defender => defender.row === rowIndex)) : () => { } }}>
                                                <div className="absolute w-[40px] h-[40px] bottom-[0] overflow-hidden"><iframe className="w-full h-full" src="https://lottie.host/embed/0c25cd9d-12cf-413f-b959-52f299358823/RyRU2SW9AQ.json"></iframe></div>
                                                {grid[rowIndex][colIndex] && (
                                                    <div className={`flex justify-center ${defenders[colIndex]?.category === "defender" ? "scale-x-[-1]" : ""}`}>
                                                        {grid[rowIndex][colIndex]}
                                                    </div>
                                                )}


                                            </div>
                                        )
                                    })
                                ))}
                            </div>
                        </div>
                        <div className="w-[20vw] bg-[#134B70]"></div>
                    </div>
                </div>
                <div className='h-[10vh] bg-[#508C9B]'></div>
            </div>

            {/* <div className="grid grid-cols-10 grid-rows-5 gap-1 p-4 w-[80vw] h-[80vh] bg-[red]">
                {grid.map((row, rowIndex) => (
                    row.map((col, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10 border border-gray-300 text-center content-center"
                            onClick={() => handleDefenderClick(defenders.find(defender => defender.row === rowIndex))}>
                            <div>{grid[rowIndex][colIndex]}</div>
                        </div>
                    ))
                ))}
            </div> */}
        </>
    );

};

export default GameBoard;



