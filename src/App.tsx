// Import the Board component
import Board from "./components/Board";

function App() {
  // Render the main application layout
  return (
    // Full-screen container with centered content and purple background
    <div className="w-screen h-screen flex items-center justify-center bg-purple-200">
      <Board />
    </div>
  )
}

// Export the App component as the default export
export default App
