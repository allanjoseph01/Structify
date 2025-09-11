import { useState } from 'react'
import './App.css'
import Index from './Pages/Index'

function App() {
  const [count, setCount] = useState(0)
  return(
    <div style={{backgroundColor:"#0A1018" , height:"100%"}}>
      <Index />
    </div>
  )
}

export default App
