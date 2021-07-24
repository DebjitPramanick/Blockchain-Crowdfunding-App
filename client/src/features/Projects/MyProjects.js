import React, { useContext, useState } from 'react'
import { AppContext } from '../../utils/AppContext'
import LeftSideBar from '../../components/sidebars/LeftSideBar'
import RightSideBar from '../../components/sidebars/RightSideBar'
import Project from '../View/Project'
import MyProject from './MyProject'

const MyProjects = () => {

  const { projects, accounts, web3 } = useContext(AppContext)
  const [query, setQuery] = useState('')

  let allProjects = projects.filter(p => {
    return p.projectTitle.toLowerCase().includes(query.toLowerCase())
    && p.projectStarter === accounts[0]
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
              <MyProject
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

export default MyProjects
