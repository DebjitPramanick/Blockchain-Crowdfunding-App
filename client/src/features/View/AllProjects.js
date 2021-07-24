import React, { useContext, useState } from 'react'
import { AppContext } from '../../utils/AppContext'
import "./style.css"
import LeftSideBar from '../../components/sidebars/LeftSideBar'
import RightSideBar from '../../components/sidebars/RightSideBar'
import Project from './Project'

const AllProjects = () => {

    const { projects, accounts, web3 } = useContext(AppContext)
    const [query, setQuery] = useState('')

    let allProjects = projects.filter(p => {
        return p.projectTitle.toLowerCase().includes(query.toLowerCase())
        && p.projectStarter !== accounts[0]
    })

    return (
        <div className="main-container">

            <div className="tri-div-view">
                <LeftSideBar />
                <div className="mid-container">
                    <div className="search-bar">
                        <input 
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Project"></input>
                    </div>
                    <div className="cards">
                        {allProjects.map((p, i) => (
                            <Project
                                pIndex={i}
                                project={p}
                                accounts={accounts}
                                web3={web3} />
                        ))}
                    </div>
                </div>
                <RightSideBar />
            </div>
        </div>
    )
}

export default AllProjects
