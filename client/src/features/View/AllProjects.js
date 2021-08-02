import React, { useContext, useState } from 'react'
import { AppContext } from '../../utils/AppContext'
import "./style.css"
import RightSideBar from '../../components/sidebars/RightSideBar'
import Project from './Project'
import Header from '../../components/header/Header'

const AllProjects = () => {

    const { projects, accounts, web3 } = useContext(AppContext)
    const [query, setQuery] = useState('')
    const [sortingIdx, setSortingIdx] = useState(0)

    const compare = (a, b) => {
        if (sortingIdx === 1) {
            if (a.projectTitle > b.projectTitle) return 1;
            else if (a.projectTitle < b.projectTitle) return -1;
            return 0
        }
        else if (sortingIdx === 2) {
            let a1 = Number(a.goalAmount)
            let b1 = Number(b.goalAmount)
            if (a1 > b1) return 1;
            else if (a1 < b1) return -1;
            return 0
        }
        else if (sortingIdx === 3) {
            let a1 = Number(a.deadline)
            let b1 = Number(b.deadline)
            if (a1 > b1) return 1;
            else if (a1 < b1) return -1;
            return 0
        }
        return 0
    }

    let allProjects = projects.filter(p => {
        return p.projectTitle.toLowerCase().includes(query.toLowerCase())
            && p.projectStarter !== accounts[0]
    })

    return (
        <div className="main-container">
            <div className="tri-div-view">
                <div className="mid-container">
                    <Header
                        title={`All Projects(${allProjects.length})`}
                        query={query}
                        setQuery={setQuery}
                        projects={projects}
                        setSortingIdx={setSortingIdx} />

                    {allProjects.length > 0 ? <div className="cards">
                        {allProjects
                            .sort(compare)
                            .map((p, i) => (
                                <Project
                                    pIndex={i}
                                    project={p}
                                    accounts={accounts}
                                    web3={web3} />
                            ))}
                    </div>
                        : <p className='no-message'>No project is available.</p>}
                </div>
                <RightSideBar />
            </div>
        </div>
    )
}

export default AllProjects
