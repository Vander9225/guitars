import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../api';
import { signOut } from 'firebase/auth';
import { AppContext } from '../AppContext'; 

import './appHeader.css';

const AppHeader = () => {

  const { authUser, setAuthUser } = useContext(AppContext);



  const userSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setAuthUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App-header">
      <div className="auth">
        {authUser ? (
          <form onSubmit={userSignOut}>
            <p>{authUser.email}</p>
            <input type="submit" id="signOut" />
            <label className="signOutButton" htmlFor="signOut">
              Sign Out
            </label>
          </form>
        ) : (
          <>
            <Link to={'/sign'}>
              <button className="signOutButton">Sign in</button>
            </Link>
            <Link to={'/register'}>
              <button className="signOutButton">Register</button>
            </Link>
          </>
        )}
      </div>

      <Link to={'/'}>
        <h1>HAMBACKER GUITARS</h1>
      </Link>
      <ul className="categories">
        <Link className="link" to={`/electro`}>
          <li>
            <button name="electro">Electro</button>
          </li>
        </Link>
        <Link className="link" to={`/bass`}>
          <li>
            <button name="bass">Bass</button>
          </li>
        </Link>
        <Link className="link" to={`/acoustic`}>
          <li>
            <button name="acoustic">Acoustic</button>
          </li>
        </Link>
      </ul>
    </div>
  );
};




export default AppHeader;
