import React, { useContext } from 'react'
import "./style.css"
import { Link, useHistory } from 'react-router-dom'
import MetamaskPNG from "../../assets/metamask.png"
import AppPNG from "../../assets/app.png"
import { AppContext } from '../../utils/AppContext'
import CrowdFunding from "../../contracts/CrowdFunding.json";
import Project from "../../contracts/Project.json"
import getWeb3 from "../../getWeb3";
import { useWallet, UseWalletProvider } from 'use-wallet'


const Login = () => {

    const { setWeb3, setAccounts, setContract, web3 } = useContext(AppContext)
    const wallet = useWallet()
    const blockNumber = wallet.getBlockNumber()

    const handleConnect = async(e) => {
        await wallet.connect()
        .then(res => {
            window.location.href = "/all"
        })
    }

    const handleDisconnect= async() => {
        await wallet.reset()
        // .then(res => {
        //     window.location.reload()
        // })
    }

    return (
        <div className="create-container">
            <Link to="/" className="backto-home">Back to home</Link>
            <div className="split-container">

                <div className="form-container auth">
                    <div className="form">
                        <h2 className="heading">Log In</h2>

                        <div className="login-dg">
                            <img width="60" height="60" src={MetamaskPNG} alt="" />
                            <p>- - - - - - -</p>
                            <img width="60" height="60" src={AppPNG} alt="" />
                        </div>

                        <p className="login-message">Login with Metamask</p>

                        <div className="flex-container">
                            <button onClick={handleConnect}>Connect Metamask</button>
                            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                                Add Metamask To Chrome
                            </a>
                            <button onClick={handleDisconnect}>Disconnect</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default () => (
    <UseWalletProvider
        chainId={1}
        connectors={{
            provided: { provider: window.cleanEthereum },
        }}
    >
        <Login />
    </UseWalletProvider>
)
