import { useState } from "react"
import { Link } from "react-router-dom"

export default function HomePage() {

  const [count, setCount] = useState(0)

  return (
    <div className="container px-4 mx-auto flex flex-col gap-3">
      <p className='font-bold text-3xl'><span className='text-blue-500'>Hybrid</span><span className='text-blue-900'>Planner</span></p>
      <button className="btn btn-primary btn-lg text-6xl" onClick={() => { setCount(count + 1) }}>
        {count}
      </button>
      <Link to="/login" className="link">Let's login !</Link>
    </div>
  )
}