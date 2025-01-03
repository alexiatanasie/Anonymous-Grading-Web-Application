import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentWorkspace from "./components/StudentWorkspace";
import ProfessorWorkspace from "./components/ProfessorWorkspace";
import JuryAssignedProjects from "./components/JuryAssignedProjects";
import ProtectedRoute from "./components/ProtectedRoute"; 
import ForgotPassword from "./components/ForgotPassword";


function App() {
    return (
        <Router>
    <Navbar />
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
            path="/student-workspace"
            element={
                <ProtectedRoute requiredRoles={["student"]}>
                    <StudentWorkspace />
                </ProtectedRoute>
            }
        />
        <Route
            path="/professor-workspace"
            element={
                <ProtectedRoute requiredRoles={["professor"]}>
                    <ProfessorWorkspace />
                </ProtectedRoute>
            }
        />
        <Route
            path="/jury-projects"
            element={
                <ProtectedRoute requiredRoles={["student", "jury"]}>
                    <JuryAssignedProjects />
                </ProtectedRoute>
            }
        />
    </Routes>
</Router>


    );
}

export default App;
