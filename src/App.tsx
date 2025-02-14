// Import the Board component
import Board from "./components/Board";

function App() {
  // Render the main application layout
  return (
    // Full-screen container with centered content and purple background
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-200">
      <Board />
    </div>
  )
}

export default App
