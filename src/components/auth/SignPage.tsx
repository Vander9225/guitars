import React, { useState, useContext} from 'react';
import { User, UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api';
import '../auth/auth.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext'; 
import Spinner from '../spinner/Spinner';


const SignPage = () => {
  const {message, setMessage, authUser, setAuthUser, loading, setLoading} = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthUser(userCredential.user);
        setLoading(false);
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

  if (authUser) {
    return (
      <div className="modal">
        <span>Welcome {authUser.email}</span>
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
    <form className="modal" onSubmit={signIn}>
      <span>E-mail: </span>
      <input className="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <span>Password: </span>
      <input
        className="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input className="submit" id="submitSign" type="submit" />
      <label className="button" htmlFor="submitSign">
        Sign In
      </label>
    </form>
  );
};

export default SignPage;
