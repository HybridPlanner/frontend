import { useState } from "react"

function App() {

  const [count, setCount] = useState(0)

  return (
    <div className="container px-4 mx-auto">
      <p className='font-bold text-3xl'><span className='text-blue-500'>Hybrid</span><span className='text-blue-900'>Planner</span></p>
      <div>
        <button className="btn btn-primary btn-lg text-6xl" onClick={() => { setCount(count + 1) }}>
          {count}
        </button>
      </div>
    </div>
  )
}

export default App
