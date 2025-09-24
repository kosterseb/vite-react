import React from 'react'
import Dice from './components/Dice'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to React with Vite!</h1>
        <p className="text-lg text-gray-600">This is a simple starter template.</p>
      </div>

      <Dice />
    </>
  )
}

export default App
