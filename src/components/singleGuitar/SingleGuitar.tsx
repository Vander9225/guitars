import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useState, useEffect } from 'react';
import useBucket from '../useBucket';
import Quantity from '../quantity/Quantity';
import CommentItem from '../comment/Comment';
import db from '../../api';

import Spinner from '../spinner/Spinner';
import './singleGuitar.css';
import { Comment, Guitar } from '../../types';

const SingleGuitar = () => {
  const { authUser, fetchComments, fetchData, addComment, loading } = useContext(AppContext);
  const { bucketGuitars, addToBucket, outFromBucket } = useBucket();

  const [guitar, setGuitar] = useState<Guitar>();
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentRate, setCommentRate] = useState<number | null>(0);
  const { guitarId = '' } = useParams();
  const quantity = bucketGuitars.find(({ guitar }) => guitar === guitarId)?.quantity;


  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(db, guitarId);
      const commentData = await fetchComments(db, guitarId);
      setComments(commentData);
      setGuitar(res);
    };
    getData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment && commentRate) {
      await addComment(db, guitarId, comment, commentRate, authUser);
      setComment('');
      setCommentRate(0);
      const commentData = await fetchComments(db, guitarId);
      setComments(commentData);
    } else {
      return;
    }
  };

  const buyItem = () => {
   addToBucket(guitarId);
  };

  const removeItem = () =>{
    outFromBucket(guitarId)
  }

  const renderItems = () => {
    return (
      <div className="single-guitar-page">
        <input id="tab1" type="radio" name="tabs" defaultChecked />
        <label className="labelTab" htmlFor="tab1">
          {guitar ? guitar.model : 'GUITAR'}
        </label>
        <input id="tab2" type="radio" name="tabs" />
        <label className="labelTab" htmlFor="tab2">
          Відгуки
        </label>
        <section id="content1">
          <div className="single-guitar">
          {
            quantity? (<button onClick={removeItem} className='bucketRemove'>Видалити з кошика</button>) : null
          }

            <div className="guitar-slider">
              <img className="single-guitar-image" src={guitar?.image} alt="guitar" />
            </div>
            <div className="single-guitar-descr">
              <h1>{guitar?.brand}</h1>
              <h2>{guitar?.model}</h2>
              <p>Strings: {guitar?.strings}</p>
              <p>{guitar?.description}</p>
            </div>
          </div>
          {!quantity ? (
            <button onClick={buyItem} className="buy">
              У кошик
            </button>
          ) : (
            <Quantity guitarId={guitarId} quantity={quantity} />
          )}
        </section>
        <section id="content2">
          <div className="comments">
            {comments.map((element) => {
              return <CommentItem comment={element} key={element.id} />;
            })}
            <form id="usrform" onSubmit={onSubmit}>
              <Rating
                className="rate"
                value={commentRate}
                name="simple-controlled"
                onChange={(event, newValue) => {
                  setCommentRate(newValue);
                }}
              />
              <textarea
                className="comment-place"
                name="comment"
                form="usrform"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input className="submit" id="sendComment" type="submit" />
              <label htmlFor="sendComment" className="submitButton">
                {comment && commentRate ? 'Відправити' : 'Оцініть ☆'}
              </label>
            </form>
          </div>
        </section>
      </div>
    );
  };

  const viewItems = loading || !guitar || !comments ? <Spinner /> : renderItems();

  return viewItems;
};

export default SingleGuitar;
