import React, { useContext } from 'react'
import { AppContext } from '../../utils/AppContext'
import "./style.css"
import LeftSideBar from '../../components/sidebars/LeftSideBar'
import RightSideBar from '../../components/sidebars/RightSideBar'
import Project from './Project'

const AllProjects = () => {

    const { projects, accounts, web3 } = useContext(AppContext)



    return (
        <div className="main-container">

            <div className="tri-div-view">
                <LeftSideBar />
                <div className="mid-container">
                    <div className="cards">
                        {projects.map((p, i) => (
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
