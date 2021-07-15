import React, { useState, useEffect } from "react";
import CrowdFunding from "./contracts/CrowdFunding.json";
import Project from "./contracts/Project.json"
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import "./App.css";
import { AppContext } from "./utils/AppContext";
import CreateProject from "./features/Create/CreateProject";
import AllProjects from "./features/View/AllProjects";

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();

        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = CrowdFunding.networks[networkId];
        const instance = new web3.eth.Contract(
          CrowdFunding.abi,
          deployedNetwork && deployedNetwork.address,
        )

        setWeb3(web3)
        setAccounts(accounts)
        setContract(instance)
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init()
  }, [])



  const crowdfundProject = (address) => {
    const instance = new web3.eth.Contract(Project.abi, address);
    return instance
  }

  const getAllProjects = () => {
    contract.methods.returnAllProjects().call().then((pr) => {
      pr.forEach(async (projectAddress) => {
        const projectInst = crowdfundProject(projectAddress);
        await projectInst.methods.getInfo().call()
          .then((projectData) => {
            const projectInfo = projectData;
            projectInfo.isLoading = false;
            projectInfo.contract = projectInst;
            setProjects(p => [...p, projectInfo])
          })
      });
    })
  }
  
  useEffect(() => {
    if (web3 !== undefined
      && accounts !== undefined
      && Object.keys(contract).length) {
      getAllProjects()
    }
  }, [web3, accounts, contract])


  const values = { web3, accounts, contract, crowdfundProject, projects }


  if (typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else {
    return (
      <AppContext.Provider value={values}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/all" component={AllProjects} />
              <Route path="/create" component={CreateProject} />
            </Switch>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;