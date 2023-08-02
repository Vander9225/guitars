import React, { useContext} from 'react';
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
        setVoteComment((prevState) => vote + 1);
        setVoteUp(!voteUp);
        setVoteDown(false)
    }

    const decrementVote = () => {
        setVoteComment((prevState) => vote - 1);
        setVoteDown(!voteDown)
        setVoteUp(false)
    }

    return (
    <div className='comment-box'>
        <div className='rate-box'>
          <Rating className="comment-rate" name="read-only" value={rate} readOnly />
          <p className='rate-vote'>
            <button onClick={incrementVote} className='vote-direction' disabled={voteUp}>▲</button>{voteComment}<button onClick={decrementVote} className='vote-direction' disabled={voteDown}>▼</button></p>
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