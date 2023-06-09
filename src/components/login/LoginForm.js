import React, {useEffect} from 'react'
import {useState} from 'react'
import {Card, Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import axios from '../../api/axios'
import {useNavigate} from 'react-router-dom'
import {useRef} from 'react'

const LOGIN_URL = '/auth/login'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef(null);
    const [passwordError, setPasswordErr] = useState("")
    //const userRef = useRef(null)

    // useEffect(() => {
    //   userRef.current.focus()
    // }, [])
    useEffect(() => {
        console.log(errMsg);
        console.log(errRef);
        setErrMsg('Cannot login')
    }, [email, password, errMsg])

    const navigate = useNavigate()
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({email, password}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true,
                    },
                }
            )

            const accessToken = response.data.token

            sessionStorage.setItem('token', accessToken)
            sessionStorage.setItem('username', response.data.userName)
            if (response.status === 200) {
                navigate('/home')
            }
        } catch (error) {
            console.log('Invalid credentials')
            setPasswordErr("Invalid email or password");
        }
    }

    return (
        <Card className="panelStyle">
            {/* <p ref={errRef} className={errMsg ? 'error' : 'offscreenError'}>
        {errMsg}
      </p> */}
            <Form
                className="LoginForm"
                controlId="loginForm"
                onSubmit={handleLoginSubmit}
            >
                <FormGroup controlId="formEmail" className="formGroup">
                    <FormControl
                        type="email"
                        controlId="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="formInput"
                    />
                </FormGroup>
                <FormGroup controlId="formPassword" className="formGroup">
                    <FormControl
                        controlId="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="formInput"
                    />
                </FormGroup>
                <FormGroup controlId='formPasswordStrength' className='formGroup'>
                    <p>{passwordError}</p>
                </FormGroup>
                <div className="formGroup">
                    <label className="forgotPassword">
                        {/**put router link here */}
                        <a href="/forgot-password">Forgot password?</a>
                    </label>
                </div>
                <FormGroup className="formGroup" controlId="formSubmit">
                    <Button type="submit" className="btn formButton">
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Card>
    )
}
