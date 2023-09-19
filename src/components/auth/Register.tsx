import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext'; 
import Spinner from '../spinner/Spinner';
import '../auth/auth.css';

const Register = () => {

  const {message, setMessage, success, setSuccess, loading, setLoading} = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.code.split('auth/').join('').replaceAll('-', ' '));
      });
  };

  const goBack = () => {
    setMessage(null);
    setPassword('');
    setEmail('');
  };

  if (success) {
    return (
      <div className="modal">
        <span>Registration {email} is successfull</span>
        <Link to={'/'}>
          <button className="button" onClick={goBack}>
            go back
          </button>
        </Link>
      </div>
    );
  }else if (message) {
    return (
      <div className="modal">
        <span>{message}</span>
        <button className="button" onClick={goBack}>
          go back
        </button>
      </div>
    );
  }else if(loading){
    return <Spinner/>
  }

  return (
    <form className="modal" onSubmit={register}>
      <span>E-mail: </span>
      <input className="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <span>Password: </span>
      <input
        className="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input className="submit" id="submitRegister" type="submit" />
      <label className="button" htmlFor="submitRegister">
        Register
      </label>
    </form>
  );
};

export default Register;
