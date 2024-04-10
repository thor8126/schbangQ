import BookList from "./components/BookList";
import Filter from "./components/Filter";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Book Explorer</h1>
      <Filter />
      <BookList />
    </div>
  );
}

export default App;
