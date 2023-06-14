import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'better-react-carousel';
import { fetchDatas } from '../../client';
import db from '../../api';

import Spinner from '../spinner/Spinner'
import './mainPage.css';

const MainPage = () => {

    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        async function getGuitars() {
            const guitars = await fetchDatas(db, 'model', '!=', false);
            setItems(guitars);
            setLoading(false);
            return guitars;
        }
         getGuitars();
         
    },[])
    if(loading){
        return <Spinner/>
    }else{
        return (
            <div className='carousel-container'>
                <Carousel className='carousel' cols={1} rows={1} gap={10} loop>
                    {
                        items ? items.map((item) =>{
                            return (
                                    <Carousel.Item key={item.model}>
                                        <Link to={`/${item.category}/${item.brand} ${item.model}`}>
                                            <div>
                                                <img className="guitar-image" alt={item.model} src={item.image} />
                                            </div>
                                        </Link>
                                        <div  className='guitar-card'>
                                            <h1>{item.brand}</h1>
                                            <h2>{item.model}</h2>
                                        </div>
                                    </Carousel.Item>
                            )
                        }) : null
                    }
                </Carousel>
            </div>
        )
    }

    
}

export default MainPage;