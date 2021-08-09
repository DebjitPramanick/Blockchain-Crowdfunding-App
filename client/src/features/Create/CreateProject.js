import React, { useContext, useState } from 'react'
import "./style.css"
import { AppContext } from "../../utils/AppContext"
import { Link } from 'react-router-dom'

const CreateProject = (props) => {

    const { web3, accounts, contract, crowdfundProject } = useContext(AppContext)

    const [project, setProject] = useState({
        title: '',
        description: '',
        duration: null,
        amountGoal: null
    })

    const create = async (e) => {
        e.preventDefault()
        if (project.title !== '' &&
            project.description !== '' &&
            project.duration &&
            project.amountGoal) {


            contract.methods.startProject(
                project.title,
                project.description,
                project.duration,
                web3.utils.toWei(project.amountGoal, 'ether')
            ).send({ from: accounts[0] })
                .then(res => {
                    const projectInfo = res.events.ProjectStarted.returnValues;
                    projectInfo.isLoading = false;
                    projectInfo.currentState = 0;
                    projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
                    window.location.href = "/projects/my"
                })
        }
        else {
            alert("Fill all the fields.")
        }
    }

    return (
        <div className="create-container">
            <Link to="/all" className="backto-home">Back to home</Link>
            <div className="split-container">
                <div className="form-container">
                    <form onSubmit={create}>
                        <h2 className="heading">Create Project</h2>
                        <div className="ip-fields">
                            <input placeholder="Title"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })} />

                            <input placeholder="Duration (days)"
                                value={project.duration}
                                onChange={(e) => setProject({ ...project, duration: e.target.value })} />
                        </div>

                        <div className="ip-fields">
                            <input placeholder="Goal Amount (ETH)"
                                value={project.amountGoal}
                                onChange={(e) => setProject({ ...project, amountGoal: e.target.value })} />

                            <textarea placeholder="Description"
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })} />
                        </div>

                        <button>Create</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateProject
