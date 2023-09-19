import React, { Dispatch, createContext, useState, useEffect } from 'react';
import { auth } from '../api';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  Firestore,
  DocumentReference,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { Guitar, Comment } from '../types';

interface AppContextProps {
  loading: boolean;
  setLoading: Dispatch<boolean>;
  message: string | null;
  setMessage: Dispatch<string | null>;
  success: boolean;
  setSuccess: Dispatch<boolean>;
  authUser: User | null;
  setAuthUser: Dispatch<User | null>;
  fetchComments: (db: Firestore, value: string) => Promise<Comment[]>;
  fetchData: (db: Firestore, model: string) => Promise<Guitar>;
  addComment: (db: any, guitar: any, comment: any, rate: any, authUser: any) => Promise<void>;
  fetchDatas: (db: any, field: any, symbol: any, value: any) => Promise<{ image: string }[]>;
  changeVoteComment: (db: Firestore, commentId: string, voteItem: number) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return listen();
  }, []);

  const fetchComments = async (db: Firestore, value: string): Promise<Comment[]> => {
    try {
      const q = query(collection(db, 'comments'), where('guitar', '==', value));
      const fetchDocs = await getDocs(q);
      return fetchDocs.docs.map((item) => ({
        id: item.id,
        comment: item.data().comment,
        rate: item.data().rate,
        date: item.data().date,
        email: item.data().email,
        vote: item.data().vote,
      }));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const changeVoteComment = async (db: Firestore, commentId: string, voteItem: number): Promise<void> => {
    const commentRef: DocumentReference = doc(db, 'comments', commentId);

    await updateDoc(commentRef, {
      vote: voteItem,
    });
  };

  const fetchData = async (db: Firestore, model: string): Promise<Guitar> => {
    //@ts-ignore
    const q = query(doc(db, 'guitars', model));
    //@ts-ignore
    const fetchDoc = await getDoc(q);
    const storage: FirebaseStorage = getStorage();

    const { image, ...item } = fetchDoc.data() as any;

    return {
      ...item,
      image: await getDownloadURL(ref(storage, `${image._key.collectionGroup}/${image.id}`)),
    };
  };

  async function addComment(db: Firestore, guitar: string, comment: string, rate: number, authUser: User): Promise<void> {
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
      date: formattedDate,
      vote: 0,
    });
  }

  const fetchDatas = async (db: Firestore, field: string, symbol: 'array-contains-any', value: string): Promise<Guitar[]> => {
    const q = query(collection(db, 'guitars'), where(field, symbol, value));
    const fetchDocs = await getDocs(q);
    const storage = getStorage();
    const ddd = Promise.all(
      fetchDocs.docs.map(async (doc) => {
        const { image, ...item } = doc.data() as any;
        return {
          ...item,
          image: await getDownloadURL(ref(storage, `${image._key.collectionGroup}/${image.id}`)),
        };
      })
    );
    return ddd;
  };

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
    addComment,
    fetchDatas,
    changeVoteComment,
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
};
