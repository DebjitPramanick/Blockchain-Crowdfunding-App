import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CrowdFunding from "./contracts/CrowdFunding.json";
import Project from "./contracts/Project.json"
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import "./App.css";
import { AppContext } from "./utils/AppContext";
import CreateProject from "./features/Create/CreateProject";
import AllProjects from "./features/View/AllProjects";
import MyProjects from "./features/Projects/MyProjects"
import Page from "./features/LandingPage/Page";
import Login from "./features/Auth/Login";

const App = () => {
  const [con, setCon] = useState(false)
  const [web3, setWeb3] = useState(new Web3(window.ethereum))
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const hist = useHistory()

  useEffect(() => {
    const connect = async () => {
      const pk = localStorage.getItem('cacheKey')
      const nId = localStorage.getItem('cacheNID')
      try {
        if (pk && nId) {
          const web3 = new Web3(window.ethereum)
          console.log(pk)
          const accounts = !pk || pk === undefined ? [] : [pk];
          const networkId = nId;
          console.log(networkId)

          const deployedNetwork = CrowdFunding.networks[networkId];
          const instance = new web3.eth.Contract(
            CrowdFunding.abi,
            deployedNetwork && deployedNetwork.address,
          )

          localStorage.setItem("cacheKey", accounts[0]);

          setWeb3(web3)
          setAccounts(accounts)
          setContract(instance)
          setLoading(false)
        }
        else{
          setLoading(false)
        }
      } 
      
      catch (error) {
        setLoading(false)
        console.error(error);
      }
    }
    connect()
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
            console.log(projectData)
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
      && contract) {

      getAllProjects()
    }
  }, [web3, accounts, contract])


  const values = { setWeb3, setAccounts, setContract, web3, accounts, contract, crowdfundProject, projects, setProjects }


  if (typeof web3 === 'undefined') {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  else if (loading) {
    return <p>Loading....</p>
  }
  else {
    return (
      <AppContext.Provider value={values}>
        <div className="App">
          <Router>
            <Switch>
              {accounts.length < 1 && <Redirect from="/all" to="/login" />}
              {accounts.length < 1 && <Redirect from="/create" to="/login" />}
              {accounts.length < 1 && <Redirect from="/projects/my" to="/login" />}

              <Route path="/" exact component={Page} />
              <Route path="/all" component={AllProjects} />
              <Route path="/create" component={CreateProject} />
              <Route path="/projects/my" component={MyProjects} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;