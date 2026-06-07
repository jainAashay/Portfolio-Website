import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Portfolio_Website/Home';
import ProjectsPage from './Components/Portfolio_Website/ProjectsPage';
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
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dataforge" element={<SchemaManagerHome />} />
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/student-information/update" element={<StudentInformationUpdate />} />
        <Route path="/student-information/delete" element={<StudentInformationDelete />} />
        <Route path="/dataforge/schema/:schema/view" element={<SchemaDataView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
