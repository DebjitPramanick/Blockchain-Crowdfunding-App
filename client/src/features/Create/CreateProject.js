import React, { useContext, useState } from 'react'
import "./style.css"
import { AppContext } from "../../utils/AppContext"

const CreateProject = (props) => {

    const { accounts, contract, crowdfundProject } = useContext(AppContext)

    const [project, setProject] = useState({
        title: '',
        description: '',
        duration: null,
        amountGoal: null
    })

    const create = async (e) => {
        e.preventDefault()
        contract.methods.startProject(
            project.title,
            project.description,
            project.duration,
            project.amountGoal
        ).send({ from: accounts[0] })
            .then(res => {
                const projectInfo = res.events.ProjectStarted.returnValues;
                projectInfo.isLoading = false;
                projectInfo.curBalance = 0;
                projectInfo.curState = 0;
                projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
                props.history.push("/all")
            })
    }

    return (
        <div className="cretae-container">
            <h2>Let's create the project.</h2>

            <form onSubmit={create}>
                <div className="ip-fields">
                    <input placeholder="Title"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value })} />

                    <input placeholder="Description"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value })} />
                </div>

                <div className="ip-fields">
                    <input placeholder="Duration (days)"
                        value={project.duration}
                        onChange={(e) => setProject({ ...project, duration: e.target.value })} />

                    <input placeholder="Goal Amount (ether)"
                        value={project.amountGoal}
                        onChange={(e) => setProject({ ...project, amountGoal: e.target.value })} />
                </div>

                <button>Create</button>
            </form>
        </div>
    )
}

export default CreateProject
