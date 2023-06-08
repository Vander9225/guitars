import React from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import {useState, useEffect} from 'react';
import db from '../../api';
import { fetchData, addComment, fetchComments } from '../../client';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import './singleGuitar.css';

const SingleGuitar = () => {
    const [guitar, setGuitar] = useState();
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState();
    const [comments,setComments] = useState([]);
    const [commentRate, setCommentRate] = useState();
    const {guitarId} = useParams();

    
    
    useEffect(() => {
        const getData = async () => {
            const res = await fetchData(db, guitarId);
            const commentData = await fetchComments(db, guitarId);
            if(commentData.length > comments.length){
                setComments(commentData);
                console.log(commentData);
            }
            setGuitar(res);
            setLoading(false)
        }
        getData();
    }, [comments]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(comment && commentRate){
            await addComment(db, guitarId, comment, commentRate);
            setComment('');
            setComments([]);
            setCommentRate(null);

        }else{
            setLoading(false);
            return
        }
        setLoading(false);
    }

    
    return (
        <>
            <AppHeader/>
            <input id="tab1" type="radio" name='tabs' defaultChecked/> 
            <label className='labelTab' htmlFor="tab1">{guitar ? guitar.model : 'GUITAR'}</label> 
            <input id="tab2" type="radio" name='tabs'/> 
            <label className='labelTab' htmlFor="tab2">Reviews</label>
            {
                loading ? <Spinner/> :
                <section id="content1"> 
                    <div className='single-guitar'>
                        <div className='guitar-slider'>
                            <img className="single-guitar-image" src={guitar.image} alt="guitar"/>
                        </div>
                        <h1>{guitar.brand}</h1>
                        <h2>{guitar.model}</h2>
                        <p>Strings: {guitar.strings}</p>
                        <p>{guitar.description}</p>
                    </div>
                </section>  
            }
            <section id="content2"> 
                <div className='comments'>
                    {
                        comments && !loading ?
                        comments.map((element, i) => {
                            return (
                                <div key={i} className='comment'>
                                    <Rating
                                        className='comment-rate'
                                        name="read-only"
                                        value={element.rate}
                                        readOnly
                                    />                                    
                                    <p className='comment-text'>{element.comment}</p>
                                    <p className='comment-date'>{element.date}</p>
                                </div>
                            )
                        }) : <Spinner/>
                    }
                    <form id="usrform" onSubmit={onSubmit}>
                            <Rating
                                className='rate'
                                name="simple-controlled"
                                onChange={(event, newValue) => {
                                    setCommentRate(newValue);
                                    console.log(newValue)
                                }}
                            />  
                        <textarea className='comment-place' name="comment" form="usrform" value={comment} 
                            onChange={(e) => setComment(e.target.value)}></textarea>
                        <input className='submit' id="sendComment" type="submit"/>
                            <label htmlFor='sendComment' className='submitButton'>Отправить</label>
                    </form>   
                </div>
            </section> 
        </>
    )
}
export default SingleGuitar;