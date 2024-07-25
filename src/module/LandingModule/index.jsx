import React from 'react'
import HomeScreen from '../homemodule/HomeScreen'
import GameBoard from '../GameBoardModule'


const LandingScreen = () => {
  return (
    <div className='px-4'>
      {/* <HomeScreen /> */}
      <h1>Defender vs. Attacker Game</h1>
      <GameBoard/>
    </div>
  )
}

export default LandingScreen