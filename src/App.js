import './App.css'
import React from 'react'
import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
