import React from 'react'
import Dice from './components/Dice'
import DiceTwo from './components/dice2/DiceTwo'



function App() {

  return (
    <>
    <header>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to React with Vite!</h1>
        <p className="text-lg text-gray-600">This is a simple starter template, for making different components.</p>

        <h2>Try out the dice !</h2>
        <p>( Its a cool webcomponent i made 😀 )</p>
      </div>
      </header>

      <DiceTwo />
      
    </>
  )
}

export default App
