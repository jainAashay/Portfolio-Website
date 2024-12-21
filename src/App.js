import React from 'react'

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './Components/Portfolio_Website/Home';
import Test from './Components/Test';
import NotFound from './Components/NotFound';
import SchemaManagerHome from './Components/SchemaManager/SchemaManagerHome';
import StudentInformation from './Components/SchemaManager/StudentInformation';
import StudentInformationUpdate from './Components/SchemaManager/StudentInformationUpdate';
import StudentInformationDelete from './Components/SchemaManager/StudentInformationDelete';
import SchemaDataView from './Components/SchemaManager/SchemaDataView';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/schema-manager" element={<SchemaManagerHome />} />
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/student-information/update" element={<StudentInformationUpdate />} />
        <Route path="/student-information/delete" element={<StudentInformationDelete />} />
        <Route path="/schema-manager/schema/:schema/view" element={<SchemaDataView />} />
        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;