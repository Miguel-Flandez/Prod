import {Pomodoro, Habits, Todolist} from '@/pages'
import './App.css'
import { Routes, Route } from 'react-router-dom'

export default function App() {


  return (
    
    <Routes>
      <Route path='/pomodoro' element={<Pomodoro/>} />
      <Route path='/' element={<Habits/>} />
      <Route path='to-do-list' element={<Todolist/>} />
    </Routes>
  )
}
