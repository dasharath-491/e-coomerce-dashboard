import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    })

    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch("http://localhost:5001/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            },
        })
        result = await result.json()
        console.warn(result)
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result))
            navigate("/")
        }
        else {
            alert("please enter correct details")
        }

    }

    return (
        <div className='login'>
            <h1>Login Page</h1>
            <input className='inputBox' value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Email' />
            <input className='inputBox' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password' />
            <button onClick={handleLogin} className='appButton' type='button'>LogIn</button>
        </div>
    )
}

export default Login
