import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import StudentWorkspace from "../../components/Workspace/StudentWorkspace";
import ProfessorWorkspace from "../../components/Workspace/ProfessorWorkspace";
import JuryAssignedProjects from "../../components/Grading/JuryAssignedProjects";
import GradeProject from "../../components/Grading/GradeProject";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/student-workspace" element={<StudentWorkspace />} />
                <Route path="/professor-workspace" element={<ProfessorWorkspace />} />
                <Route path="/jury-projects" element={<JuryAssignedProjects />} />
                <Route path="/grade/:projectId" element={<GradeProject />} />
            </Routes>
        </Router>
    );
}

export default App;