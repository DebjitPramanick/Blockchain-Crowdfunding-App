import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="create-container">
            <Link to="/all" className="backto-home">Back to home</Link>
            <div className="split-container">
                <div className="form-container auth">
                    <form>
                        <h2 className="heading">Login</h2>
                        <div className="ip-fields">
                            <input placeholder="Email" />
                        </div>

                        <div className="ip-fields">
                            <input placeholder="Password" />
                        </div>

                        <div className="flex-container">
                            <button>Login</button>
                            <Link to="/register">Not an user? Register</Link>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
