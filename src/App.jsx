import './App.css'
import LoginForm from '../src/features/auth/LoginForm'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <section>
      <Routes>
        <Route Component={LoginForm} path=''/>

        <Route Component={Protected}>

        </Route>
      </Routes>
    </section>
  )
}

export default App
