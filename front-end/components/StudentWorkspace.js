import React from "react";
import AddProject from "../Projects/AddProject";
import ProjectList from "../Projects/ProjectList";

function StudentWorkspace() {
    return (
        <div>
            <h1>Student Workspace</h1>
            <AddProject />
            <ProjectList />
        </div>
    );
}

export default StudentWorkspace;