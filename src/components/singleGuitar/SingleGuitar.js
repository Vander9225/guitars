import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useState, useEffect } from 'react';
import CommentItem from '../comment/Comment';
import db from '../../api';

import Spinner from '../spinner/Spinner';
import './singleGuitar.css';

const SingleGuitar = () => {
  const { authUser, fetchComments, fetchData, addComment, loading, setLoading } = useContext(AppContext);

  const [guitar, setGuitar] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentRate, setCommentRate] = useState(0);
  const { guitarId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(db, guitarId);
      const commentData = await fetchComments(db, guitarId);
      setComments(commentData);
      setGuitar(res);
    };
    // setLoading(true);
    getData();
    // setLoading(false);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (comment && commentRate) {
      await addComment(db, guitarId, comment, commentRate, authUser);
      setComment('');
      setCommentRate(null);
      const commentData = await fetchComments(db, guitarId);
      setComments(commentData);
    } else {
      return;
    }
  };

  const renderItems = () => {
    return (
      <div className='single-guitar-page'>
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
              <div className="guitar-slider">
                <img className="single-guitar-image" src={guitar.image} alt="guitar" />
              </div>
              <div className='single-guitar-descr'>
                <h1>{guitar.brand}</h1>
                <h2>{guitar.model}</h2>
                <p>Strings: {guitar.strings}</p>
                <p>{guitar.description}</p>
              </div>
            </div>
          </section>
        <section id="content2">
          <div className="comments">
            {
              comments.map((element) => {
                // console.log(element.id)
                return (
                  <CommentItem commentary={element} key={element.id}/>
                );
              })
            }
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
                {comment && commentRate ? 'Відправити' : 'Оцініть'}
              </label>
            </form>
          </div>
        </section>
      </div>
    );
  };

  const viewItems = loading || !guitar || !comments ? <Spinner /> : renderItems();

  return <>{viewItems}</>;
};

export default SingleGuitar;
