export default function Dice() {

    function diceRoll(event) {
        event.preventDefault();
        const roll = Math.floor(Math.random() * 6) + 1;
        alert(`You rolled a ${roll}`);
    }
 
    return (
        <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dice Roll !</h2>
          <p className="text-gray-600">Click to roll the dice !</p>
          <button onClick={diceRoll} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Roll Dice</button>
        </div>
    )
}