import React , { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api';


const Register = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
        // e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) =>{
                console.log(error)
            })
    }

    return(
        <form className='modal'
            onSubmit={register}>
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
            <input className='submit' id='submitRegister' type='submit'/>
            <label className='submit' htmlFor='submitRegister'>Register</label>
        </form>
    )
}

export default Register;