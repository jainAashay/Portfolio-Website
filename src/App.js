import React from 'react'

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Test from './Components/Test';
import NotFound from './Components/NotFound';
import SchemaManagerHome from './Components/SchemaManager/SchemaManagerHome';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/schema-manager" element={<SchemaManagerHome />} />
        
        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;