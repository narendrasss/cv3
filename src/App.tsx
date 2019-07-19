import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './screens/dashboard'

const App: React.FC = () => {
  return (
    <Router>
      <Dashboard path="/" />
    </Router>
  )
}

export default App
