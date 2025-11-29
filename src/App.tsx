import { Listing } from './components/Listing'
import './App.css'
import data from './data.json'

function App() {
  return <Listing data={data} />;
}

export default App
