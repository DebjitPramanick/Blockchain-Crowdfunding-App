import React, { useState, useEffect } from "react";
import CrowdFunding from "./contracts/CrowdFunding.json";
import Project from "./contracts/Project.json"
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import "./App.css";
import { AppContext } from "./utils/AppContext";
import CreateProject from "./features/Create/CreateProject";
import AllProjects from "./features/View/AllProjects";
import MyProjects from "./features/Projects/MyProjects"
import Page from "./features/LandingPage/Page";
import Register from "./features/Auth/Register";
import Login from "./features/Auth/Login";

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [projects, setProjects] = useState([])
  const [curUser, setCurUser] = useState(null)

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

  const getUser = async () => {
    contract.methods.curUserAddress()
      .call()
      .then(r => {
        if(r !== '0x0000000000000000000000000000000000000000'){
          setCurUser(r)
        }
      })
  }

  useEffect(() => {
    if (contract) {
      getUser()
    }
  }, [contract])

  console.log(curUser)

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
            console.log(projectData)
            const projectInfo = projectData;
            projectInfo.isLoading = false;
            projectInfo.contract = projectInst;
            console.log(projectInfo)
            setProjects(p => [...p, projectInfo])
          })
      });
    })
  }

  useEffect(() => {
    if (web3 !== undefined
      && accounts !== undefined
      && contract
      && curUser) {

      getAllProjects()
    }
  }, [web3, accounts, contract])


  const values = { web3, accounts, contract, crowdfundProject, projects, setProjects, curUser }


  if (typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else {
    return (
      <AppContext.Provider value={values}>
        <div className="App">
          <Router>
            <Switch>
              {!curUser && <Redirect from="/all" to="/login" />}
              {!curUser && <Redirect from="/create" to="/login" />}
              {!curUser && <Redirect from="/projects/my" to="/login" />}

              <Route path="/" exact component={Page} />
              <Route path="/all" component={AllProjects} />
              <Route path="/create" component={CreateProject} />
              <Route path="/projects/my" component={MyProjects} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;