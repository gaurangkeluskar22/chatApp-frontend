import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import getRequestedHeader from '../../utils/util'
import { useAuthContext } from '../../Context/AuthContext'
import { env } from '../../env'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const headers = getRequestedHeader()
    const {authUser, setAuthUser, setUserId} = useAuthContext()
    
    useEffect(()=>{
        if(authUser?.length) {
            navigate('/home')
        }
    },[authUser])

    const handleSignUpText = () =>{
        navigate('/')
    }

    const emailChange = (e) => {
        const value = e?.target?.value
        setEmail(value)
    } 

    const passwordChange = (e) => {
        const value = e?.target?.value
        setPassword(value)
    }


    const handleLogin = async () => {
        const payload = {
            email : email, 
            password : password,
        }

        await axios.post(`https://chatapp-backend-p2tw.onrender.com/api/auth/login`, payload, headers).then((res)=>{
            if(res?.data?.success){
                const token = res?.data?.token
                localStorage.setItem("token", token)
                setAuthUser(token)
                setUserId(res?.data?.userId)
            }else{
                alert(res?.data?.message)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'row', width: 'inherit', margin:'100px 100px'}}>
                <div style={{width:'50vw', marginLeft:'200px'}}>
                    <img src="https://herobot.app/wp-content/uploads/2022/11/26-1024x1024.jpg" width={500} />
                </div>
                <div style={{width:'50vw', display:'flex', flexDirection:'column', alignItems: 'center', marginTop:'80px', marginRight:'250px'}}>
                    <h1>Login</h1>
                        <input type="text" placeholder="Enter Email:" required onChange={emailChange}/>
                        <input type="password" placeholder="Enter password:" required onChange={passwordChange}/>
                        <button onClick={handleLogin} className='button-login'>Login</button> 
                    <p onClick={handleSignUpText}>Don't have an account ? SignUp Here</p>
                </div>
            </div>
        </>
    )
}

export default Login