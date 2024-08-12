
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
import speedPlant from '../../assets/lottie/speedPlant.json'
import butterflyPlant from '../../assets/lottie/butterflyPlant.json'
import pointFlower from '../../assets/lottie/pointFlower.json'
import waterAttack from '../../assets/lottie/waterAttack.json'




const GameBoard = () => {
    const rows = 5;
    const cols = 10;

    const [grid, setGrid] = useState([]);
    const [defenders, setDefenders] = useState([]);
    const [attackers, setAttackers] = useState([]);
    const [canClickDefender, setCanClickDefender] = useState(true);
    const [canClickAttacker, setCanClickAttacker] = useState(true);


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
    const showWater = (fire) => {
        return (
            <Lottie
                loop
                animationData={fire}
                play
                style={{ width: "40%", height: "40%" }}
                segments={[20, 22]}
                speed={0.1}
            />
        )
    }
    const controlLottiePlant = (plant) => {
        return (
            <Lottie
                loop
                animationData={plant}
                play
                style={{ width: "100%", height: "100%" }}
                segments={[34, 100]}
                speed={0.8}
            />
        )
    }
    const speedLottiePlant = (plant) => {
        return (
            <Lottie
                loop
                animationData={plant}
                play
                style={{ width: "100%", height: "100%" }}
                segments={[50, 100]}
                speed={0.5}
            />
        )
    }
    const powerLottiePlant = (plant) => {
        return (
            <Lottie
                loop
                animationData={plant}
                play
                style={{ width: "100%", height: "100%" }}
            />
        )
    }

    const normalLottiePlane = (plant) => {
        return (
            <Lottie
                loop
                animationData={plant}
                play
                style={{ width: "100%", height: "100%" }}

            />
        )
    }



    const defendersList = useMemo(() => [
        { category: 'defender', emoji: showAnimal(dogjson), defencePower: 10, attackPower: 2, fireEmoji: showWater(waterAttack), blastEmoji: showFire(blastJson) },
        { category: 'defender', emoji: showAnimal(buffaloJson), defencePower: 10, attackPower: 2, fireEmoji: showWater(waterAttack), blastEmoji: showFire(blastJson) },
        { category: 'defender', emoji: showAnimal(duckJson), defencePower: 10, attackPower: 2, fireEmoji: showWater(waterAttack), blastEmoji: showFire(blastJson) },
        { category: 'defender', emoji: showAnimal(donkeyJson), defencePower: 10, attackPower: 2, fireEmoji: showWater(waterAttack), blastEmoji: showFire(blastJson) },
        { category: 'defender', emoji: showAnimal(sevalJson), defencePower: 10, attackPower: 2, fireEmoji: showWater(waterAttack), blastEmoji: showFire(blastJson) }
    ], []);

    const attackersList = useMemo(() => [
        { category: 'attacker', emoji: showAnimal(gorillaJson), attackPower: 5, defencePower: 10, blastEmoji: showFire(blastJson), fireEmoji: showFire(fireJson), },
        { category: 'attacker', emoji: showAnimal(kangaruJson), attackPower: 5, defencePower: 10, blastEmoji: showFire(blastJson), fireEmoji: showFire(fireJson), },
        { category: 'attacker', emoji: showAnimal(dinosaurJson), attackPower: 5, defencePower: 10, blastEmoji: showFire(blastJson), fireEmoji: showFire(fireJson), },
        { category: 'attacker', emoji: showAnimal(snackJson), attackPower: 5, defencePower: 10, blastEmoji: showFire(blastJson), fireEmoji: showFire(fireJson), },
        { category: 'attacker', emoji: showAnimal(tigerJson), attackPower: 5, defencePower: 10, blastEmoji: showFire(blastJson), fireEmoji: showFire(fireJson), }
    ], []);
    const powerPlantList = useMemo(() => [
        { category: 'plant', emoji: controlLottiePlant(powerPlant), powerEnergy: 5, },
        { category: 'plant', emoji: speedLottiePlant(speedPlant), speedEnergy: 5, },
        { category: 'plant', emoji: normalLottiePlane(butterflyPlant), recoveryEnergy: 5 },
    ], []);


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

    const moveAttackers = () => {
        const updatedAttackers = attackers.map(attacker => {
            if (attacker.col > 0) {
                return { ...attacker, col: attacker.col - 1 };
            }
            return attacker;
        });
        setAttackers(updatedAttackers);
    };
    const defenderFireEmoji = (defender) => {
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

    const attackerFireEmoji = (attacker) => {
        const { row: attackerRow } = attacker;
        const updatedGrid = [...grid];

        let col = cols - 2;

        const interval = setInterval(() => {
            if (col < 0) {
                clearInterval(interval);
                return;
            }

            if (col < cols - 2) {
                updatedGrid[attackerRow][col + 1] = '';
            }

            const defenderInCol = defenders.find(defender => defender.row === attackerRow && defender.col === col);

            if (defenderInCol) {
                defenderInCol.defencePower -= attacker.attackPower;

                if (defenderInCol.defencePower <= 0) {
                    const index = defenders.indexOf(defenderInCol);
                    const updatedDefenders = [...defenders];
                    updatedDefenders[index] = { ...defenderInCol, emoji: defenderInCol.blastEmoji };
                    setDefenders(updatedDefenders);
                }
                clearInterval(interval);
                setGrid(updatedGrid);
                return;
            }

            updatedGrid[attackerRow][col] = attacker.fireEmoji;
            setGrid(updatedGrid);

            col--;
        }, 1500); // Animation interval time
    };



    const handleDefenderClick = (defender) => {
        if (!canClickDefender) return; // Prevent click if not allowed
        if (defender.defencePower > 0) {
            setCanClickDefender(false); // Disable clicks
            defenderFireEmoji(defender);

            setTimeout(() => {
                setCanClickDefender(true);
            }, 500);
        }
    };

    const handleAttackerClick = (attacker) => {
        if (!canClickAttacker) return; // Prevent click if not allowed
        if (attacker.defencePower > 0) {
            setCanClickAttacker(false); // Disable clicks
            attackerFireEmoji(attacker);

            setTimeout(() => {
                setCanClickAttacker(true);
            }, 1500);
        }
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

    return (
        <>
            <div className=''>
                <div className='h-[10vh] bg-[#508C9B]'>{powerLottiePlant(pointFlower)}</div>
                <div className='h-[80vh] bg-[#FF8225]'>
                    <div className='flex h-full'>
                        <div className="w-[20vw] bg-[#134B70]">
                            {powerPlantList?.map((plant, plantIndex) => (
                                <div key={plantIndex} className='w-full h-[20%]'>
                                    {plant?.emoji}
                                </div>
                            ))}
                        </div>
                        <div className="w-[80vw] bg-[#677D6A]">
                            <div className="grid grid-cols-10 grid-rows-5 w-[80vw] h-[80vh] bg-[black]">
                                {grid.map((row, rowIndex) => (
                                    row.map((col, colIndex) => {
                                        return (
                                            <div key={`${rowIndex}-${colIndex}`} className="relative border border-gray-300 text-center content-center"
                                                onClick={() => {
                                                    if (grid[rowIndex][colIndex]) {
                                                        if (colIndex === 0 && canClickDefender) {
                                                            handleDefenderClick(defenders.find(defender => defender.row === rowIndex));
                                                        } else if (colIndex === cols - 1 && canClickAttacker) {
                                                            handleAttackerClick(attackers.find(attacker => attacker.row === rowIndex));
                                                        }
                                                    }
                                                }}
                                            >
                                                {grid[rowIndex][colIndex] && (
                                                    <div className={`flex justify-center ${colIndex === 0 ? "scale-x-[-1]" : ""}`}>
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
        </>
    );

};

export default GameBoard;








