import React from 'react'
import NotFound from '../components/NotFound'
import Dashboard from './Dashboard'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
