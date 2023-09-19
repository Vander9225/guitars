import React, { useEffect, useContext, useState, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../api';
import { User, signOut } from 'firebase/auth';
import { AppContext } from '../AppContext'; 
import useBucket from '../useBucket';
import bucket from "../../images/shopping-cart.png"

import './appHeader.css';

const AppHeader = () => {

  const { authUser, setAuthUser } = useContext(AppContext);
  const [bucketItems, setBucketItems] = useState(0);
  const { bucketGuitars } = useBucket();

  useEffect(() =>{
    const bucket = bucketGuitars.reduce((acc, item) =>{
      return acc + item.quantity;
    }, 0)
    setBucketItems(bucket)
  },[bucketGuitars])

  const userSignOut = (e: React.FormEvent<HTMLFormElement>) => {
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
          <form className="authUser" onSubmit={userSignOut}>
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
        <Link to={'/bucket'}>
          <img className='bucket-link' src={bucket}/>
          <div className='bucket-items'>{bucketItems}</div>
        </Link>
      </div>

      <Link to={'/'}>
        <h1>PET PROJECT</h1>
      </Link>
      <ul className="categories">
        <Link className="link" to={`/electro`}>
          <li>
            <button  name="electro">Electro</button>
          </li>
        </Link>
        <Link className="link" to={`/bass`}>
          <li>
            <button  name="bass">Bass</button>
          </li>
        </Link>
        <Link className="link" to={`/acoustic`}>
          <li>
            <button  name="acoustic">Acoustic</button>
          </li>
        </Link>
      </ul>
    </div>
  );
};


export default AppHeader;
