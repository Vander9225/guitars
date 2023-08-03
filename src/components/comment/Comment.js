import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Rating } from '@mui/material';
import { useState, useEffect } from 'react';
import db from '../../api';


const CommentItem = ({commentary}) => {
    const {rate, email, date, comment, vote, id} = commentary;
    const { changeVoteComment } = useContext(AppContext);
    const [voteComment, setVoteComment] = useState(vote);
    const [voteUp, setVoteUp] = useState(false)
    const [voteDown, setVoteDown] = useState(false)


    useEffect(() =>{
        const changeVote = async () =>{
            await changeVoteComment(db, id, voteComment)
        }
        changeVote()
    },[voteComment])

    const incrementVote = () => {
        setVoteComment(vote + 1);
        setVoteUp(!voteUp);
        setVoteDown(false)
        console.log(vote, voteComment)
        if(voteUp){
            setVoteComment(vote)
        }
    }

    const decrementVote = () => {
        setVoteComment(vote - 1);
        setVoteDown(!voteDown)
        setVoteUp(false)
        if(voteDown){
            setVoteComment(vote)
        }

    }



    return (
    <div className='comment-box'>
        <div className='rate-box'>
          <Rating className="comment-rate" name="read-only" value={rate} readOnly />
          <p className='rate-vote'>
            <button onClick={incrementVote} style={{ color: voteUp ? 'black' : 'rgb(215, 214, 214)' }} className='vote-direction'>▲</button>{voteComment}<button onClick={decrementVote} style={{ color: voteDown ? 'black' : 'rgb(215, 214, 214)' }} className='vote-direction'>▼</button></p>
        </div>
        <div  className="comment">
            <p className='comment-text'>{email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)}</p>
            <p className="comment-text">{comment}</p>
            <p className="comment-date">{date}</p>
        </div>
    </div>
    )
}

export default CommentItem;