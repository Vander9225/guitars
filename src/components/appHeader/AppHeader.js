import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { auth } from "../../api";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './appHeader.css';


const AppHeader = () => {
    const [authUser, setAuthUser] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [register, setRegister] = useState(false);
    const [authMessage, setAuthMessage] = useState(null);

    useEffect(() => {
        const listen =  onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        })
        return listen();
    },[authUser]);

    const userSignOut = (e) => {
        e.preventDefault();
        signOut(auth)
            .then(() =>{
                setAuthUser(null);
            })
            .catch(error => setAuthMessage(error))
    }


    const onRegister = () => {
        setRegister(!register);
        setSignIn(false);
        setAuthMessage(null);
    }
    const onSignIn = () => {
        setSignIn(!signIn);
        setRegister(false);
        setAuthMessage(null);
    }
    const goBack = () => {
        setAuthMessage(null);
    }

    const RegisterForm = () => {

        const [emailRegister, setEmailRegister] = useState('');
        const [passwordRegister, setPasswordRegister] = useState('');
    

        const handleRegister = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
                .then((userCredential) => {
                    console.log(userCredential)
                }).catch((error) =>{
                    if(error.code){
                        setAuthMessage(error.code)
                    }
                })
        }

            
        if(register && !authMessage){
            return(
                <form className='modal'
                    onSubmit={handleRegister}>
                    <span>E-mail: </span>
                    <input className='mail' 
                        type='email' 
                        value={emailRegister}
                        onChange={(e) => setEmailRegister(e.target.value)}/>
                    <span>Password: </span>
                    <input className='password' 
                        type='password' 
                        value={passwordRegister}
                        onChange={(e) => setPasswordRegister(e.target.value)}/>
                    <input className='submit' id='submitRegister' type='submit'/>
                    <label className='signOutButton' htmlFor='submitRegister'>Register</label>
                </form>
            )   
        }else if(authMessage && register){
            return (
                <div className='modal'>
                    <span>{authMessage}</span>
                    <button className='signOutButton' onClick={goBack}>Go back</button>
                </div> 
            )
        }else{
            return null
        }
    };

    const SignForm = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    

        const handleSignIn = (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential);
                    setAuthUser(userCredential);
                }).catch((error) =>{
                    setAuthMessage(error.code)
                })
        }

        if(signIn && !authMessage){
            return(
                <form className='modal'
                    onSubmit={handleSignIn}>
                    <span>E-mail: </span>
                    <input className='mail' 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <span>Password: </span>
                    <input className='password' 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <input className='submit' id='submitSign' type='submit'/>
                    <label className='signOutButton' htmlFor='submitSign'>Sign In</label>
                </form>
            )
        }else if(authMessage && signIn){
            return (
                <div className='modal'>
                    <span>{authMessage}</span>
                    <button className='signOutButton' onClick={goBack}>Go back</button>
                </div>
            )
        }else{
            return null
        }
    }

    
    

    return (
        <div className="App-header">
            <div className='auth'>
                {authUser ?     <form onSubmit={userSignOut} >
                                        <p>{authUser.email}</p>
                                        <input type="submit" id='signOut' />
                                        <label className='signOutButton' htmlFor='signOut'>Sign Out</label>
                                    </form>
                                : <>
                                    <button className='signOutButton'
                                        onClick={onSignIn}
                                        >Sign in</button>
                                    <button className='signOutButton'
                                        onClick={onRegister}
                                        >Register</button>
                                    <SignForm/> 
                                    <RegisterForm/>     
                                  </>
                }
            </div>

            <Link to={'/'}>
                <h1>HAMBACKER GUITARS</h1>
            </Link>
            <h2>Make rock great again!!!</h2>
            <ul className='categories'>
                <Link className='link' to={`/electro`}>
                    <li>
                        <button name='electro'>Electro</button>
                    </li>
                </Link>
                <Link className='link' to={`/bas`}>
                    <li>
                        <button name='bas'>Bas</button>
                    </li>
                </Link>
                <Link className='link' to={`/acoustic`}>
                    <li>
                        <button name='acoustic'>Acoustic</button>
                    </li>
                </Link>
            </ul>
        </div>
    )
}



export default AppHeader;