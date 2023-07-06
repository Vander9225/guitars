import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useState, useEffect } from 'react';
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
      if (commentData.length > comments.length) {
        setComments(commentData);
      }
      setGuitar(res);
    };
    setLoading(true);
    getData();
    setLoading(false);
  }, [comments]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (comment && commentRate) {
      await addComment(db, guitarId, comment, commentRate, authUser);
      setComment('');
      setComments([]);
      setCommentRate(null);
    } else {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const renderItems = () => {
    return (
      <>
        <input id="tab1" type="radio" name="tabs" defaultChecked />
        <label className="labelTab" htmlFor="tab1">
          {guitar ? guitar.model : 'GUITAR'}
        </label>
        <input id="tab2" type="radio" name="tabs" />
        <label className="labelTab" htmlFor="tab2">
          Reviews
        </label>
          <section id="content1">
            <div className="single-guitar">
              <div className="guitar-slider">
                <img className="single-guitar-image" src={guitar.image} alt="guitar" />
              </div>
              <h1>{guitar.brand}</h1>
              <h2>{guitar.model}</h2>
              <p>Strings: {guitar.strings}</p>
              <p>{guitar.description}</p>
            </div>
          </section>
        <section id="content2">
          <div className="comments">
            {
              comments.map((element, i) => {
                return (
                  <div key={i}>
                    <Rating className="comment-rate" name="read-only" value={element.rate} readOnly />
                    <div  className="comment">
                        <p className='comment-text'>{element.email.split("@")[0].charAt(0).toUpperCase() + element.email.split("@")[0].slice(1)}</p>
                        <p className="comment-text">{element.comment}</p>
                        <p className="comment-date">{element.date}</p>
                    </div>
                  </div>
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
      </>
    );
  };

  const viewItems = loading || !guitar || !comments ? <Spinner /> : renderItems();

  return <>{viewItems}</>;
};

export default SingleGuitar;
