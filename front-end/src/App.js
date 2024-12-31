import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentWorkspace from "./components/StudentWorkspace";
import ProfessorWorkspace from "./components/ProfessorWorkspace";
import JuryAssignedProjects from "./components/JuryAssignedProjects";
import GradeProject from "./components/GradeProject";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student-workspace" element={<StudentWorkspace />} />
                <Route path="/professor-workspace" element={<ProfessorWorkspace />} />
                <Route path="/jury-projects" element={<JuryAssignedProjects />} />
                <Route path="/grade/:projectId" element={<GradeProject />} />
            </Routes>
        </Router>
    );
}

export default App;
