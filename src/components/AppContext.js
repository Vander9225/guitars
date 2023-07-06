import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../api';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, getDoc, doc, addDoc, query, where} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL} from "firebase/storage";


export const AppContext = createContext();


export const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return listen();
  }, [authUser]);

  const fetchComments = async (db, value) => {
    const q = query(collection(db, 'comments'), where('guitar', '==', value));
    const fetchDocs = await getDocs(q);
    const ddd = fetchDocs.docs.map((item) => {
        return {
          comment: item.data().comment,
          rate: item.data().rate,
          date: item.data().date,
          email: item.data().email
        }
    });
    return ddd;
  }

  const fetchData = async (db, model) => {
    
    const q = query(doc(db, 'guitars', model));
    const fetchDoc = await getDoc(q);
    const storage = getStorage();
    
    const {image, ...item} = fetchDoc.data();
    
    return {
        ...item,
        image: await getDownloadURL(ref(storage, `${image._key.collectionGroup}/${image.id}`))
    }
}  

async function addComment(db, guitar, comment, rate, authUser) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  await addDoc(collection(db, 'comments'), {
    guitar,
    comment,
    rate,
    email: authUser ? authUser.email : 'Guest',
    date: formattedDate
  });
}

  const sharedState = {
    loading,
    setLoading,
    message,
    setMessage,
    success,
    setSuccess,
    authUser,
    setAuthUser,
    fetchComments,
    fetchData,
    addComment
  };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
};