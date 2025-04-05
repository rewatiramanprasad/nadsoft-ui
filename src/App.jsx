import React from 'react'
import NotFound from '../components/NotFound'
import Dashboard from './Dashboard'

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
