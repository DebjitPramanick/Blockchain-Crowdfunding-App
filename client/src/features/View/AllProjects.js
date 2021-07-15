import React, { useContext } from 'react'
import { AppContext } from '../../utils/AppContext'

const AllProjects = () => {

    const {projects} = useContext(AppContext)

    console.log(projects)

    return (
        <div className="projects-container">
            <h2>All Rpojects...</h2>
            {projects.map(p => (
                <p>{p.projectTitle}</p>
            ))}
        </div>
    )
}

export default AllProjects
