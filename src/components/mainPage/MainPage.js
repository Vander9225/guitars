import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'better-react-carousel';
import { fetchDatas } from '../../client';
import db from '../../api';
import './mainPage.css';

const MainPage = () => {

    const [items, setItems] = useState();

    useEffect(() =>{
        async function getGuitars() {
            const guitars = await fetchDatas(db, 'model', '!=', false);
            setItems(guitars);
            return guitars
        }
         getGuitars();
    },[])
    
    return (
        
        <Carousel cols={3} rows={1} gap={10} loop>
            {
                items ? items.map((item) =>{
                    return (
                        
                            <Carousel.Item key={item.model}>
                                <Link to={`/${item.category}/${item.brand} ${item.model}`} >
                                    <img style={{transform: "rotate(30deg)"}} width="208px" height="600px" alt={item.model} src={item.image} />
                                </Link>
                            </Carousel.Item>
                        
                    )
                }) : null
            }

        </Carousel>
        

    )
    
}

export default MainPage;