import React, { useState } from "react";
import '../App.css'
import catImg from '../img/cat.png'
import { useDispatch } from 'react-redux'
import { loginUser } from "../redux/slice/userSlice";
const Login = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleUserLogin = async (e) =>{
        e.preventDefault()
        console.log(name)
        dispatch(loginUser({name}))
    }

    return (
        <div className="login_container">
            <div className="img_box">
                <h1>CAT KITTEN</h1>
                <img src={catImg} />
            </div>
            <div className="login_box">
                <form className="login_form" onSubmit={(e) => handleUserLogin(e)}>
                    <input type="text" className="input" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <button type="submit" className="button button_primary" style={{ width: '90%', fontSize: 20 }}>Start</button>
                </form>
            </div>
        </div>
    )
}

export default Login