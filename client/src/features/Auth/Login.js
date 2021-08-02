import React, { useContext } from 'react'
import "./style.css"
import { Link, Redirect } from 'react-router-dom'
import MetamaskPNG from "../../assets/metamask.png"
import AppPNG from "../../assets/app.png"
import { AppContext } from '../../utils/AppContext'


const Login = () => {

    const { web3, accounts } = useContext(AppContext)

    const handleConnect = async (e) => {
        e.preventDefault()
        await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{eth_accounts: {}}]
        });
        const address = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [{  }]
        })
        let ad = web3.utils.toChecksumAddress(address[0])
        const networkId = await web3.eth.net.getId();
        localStorage.setItem('cacheKey', ad)
        localStorage.setItem('cacheNID', networkId)
        window.location.href = "/all"
    }

    if(accounts.length > 0){
        return <Redirect to="/all" />
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
