import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import getRequestedHeader from '../../utils/util'
import { useAuthContext } from '../../Context/AuthContext'
import { env } from '../../env'

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const headers = getRequestedHeader()

    const {authUser, setAuthUser} = useAuthContext()
    
    useEffect(()=>{
        if(authUser?.length) {
            navigate('/home')
        }
    },[authUser])

    const handleLoginText = () =>{
        navigate('/login')
    }

    const nameChange = (e) => {
        const value = e?.target?.value
        setName(value)
    } 

    const emailChange = (e) => {
        const value = e?.target?.value
        setEmail(value)
    } 

    const passwordChange = (e) => {
        const value = e?.target?.value
        setPassword(value)
    }

    const genderChange = (e) => {
        const value = e?.target?.value
        setGender(value)
    } 

    const handleSubmit = async () => {
        const payload = {
            name : name,
            email : email, 
            password : password,
            gender : gender,
            profilePic : ''
        }

        await axios.post(`http://localhost:9999/api/auth/signup`, payload, headers).then((res)=>{
            if(res?.data?.success){
                navigate('/login')
            }
            else{
                alert(res?.data?.message)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'row', width: 'inherit', margin:'100px 100px'}}>
                <div style={{width:'50vw', marginLeft:'100px'}}>
                    <img src="https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg" width={700} />
                </div>
                <div style={{width:'50vw', display:'flex', flexDirection:'column', alignItems: 'center', marginTop:'50px', marginRight:'100px'}}>
                    <h1>Sign Up</h1>
                        <input type="text" placeholder="Enter Name:" required onChange={nameChange}/>
                        <input type="text" placeholder="Enter Email:" required onChange={emailChange}/>
                        <input type="password" placeholder="Enter password:" required onChange={passwordChange}/>
                        <select onChange={genderChange}>
                            <option>Select Gender</option>
                            <option name="male" value={'male'}>Male</option>
                            <option name="female" value={'female'}>Female</option>
                        </select>
                        <button onClick={handleSubmit} className='button-signup'>Submit</button> 
                    <p onClick={handleLoginText}>Already have an account ? Login Here</p>
                </div>
            </div>
        </>
    )
}

export default SignUp