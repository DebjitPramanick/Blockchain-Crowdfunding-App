import React, { useContext, useState } from 'react'
import "./style.css"
import { AppContext } from "../../utils/AppContext"
import { Link, useHistory } from 'react-router-dom'

const Register = (props) => {
    const { accounts, contract, crowdfundProject } = useContext(AppContext)
    const hist = useHistory()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: null
    })

    const handleRegister = (e) => {
        e.preventDefault()
        contract.methods.register(accounts[0], user.name, user.email, user.password).call().then(u => {
            alert(u)
            hist.push("/login")
        })
    }

    return (
        <div className="create-container">
            <Link to="/all" className="backto-home">Back to home</Link>
            <div className="split-container">
                <div className="form-container auth">
                    <form onSubmit={handleRegister}>
                        <h2 className="heading">Register</h2>
                        <div className="ip-fields">
                            <input placeholder="Name"
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}/>

                            <input placeholder="Email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}/>
                        </div>

                        <div className="ip-fields">
                            <input placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}/>
                        </div>

                        <div className="flex-container">
                            <button type="submit">Register</button>
                            <Link to="/login">Already an user? Login</Link>
                        </div>
                        
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register
