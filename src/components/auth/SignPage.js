import React , { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api';


const SignPage = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) =>{
                console.log(error)
            })
    }

    return(
        <form className='modal'
            onSubmit={signIn}>
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
            <label htmlFor='submitSign'>Sign In</label>
        </form>
    )
}

export default SignPage;