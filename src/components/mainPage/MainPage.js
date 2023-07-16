import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'better-react-carousel';
import { fetchDatas } from '../../client';
import db from '../../api';
import { AppContext } from '../AppContext'; 
import Spinner from '../spinner/Spinner'
import './mainPage.css';

const MainPage = () => {

    const [items, setItems] = useState();
    const { loading, setLoading } = useContext(AppContext);

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

    const MyDot = ({ isActive }) => (
        <span
          style={{
            display: 'inline-block',
            height: isActive ? '8px' : '5px',
            width: isActive ? '8px' : '5px',
            background: 'rgba(255, 221, 3, 0.751)',
            borderRadius: "50%"
          }}
        ></span>
    )

    const carouselStyle = {
        maxWidth: '350px',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    }

    if(loading){
        return <Spinner/>
    }else{
        return (
            <div className='main-page'>
                <Carousel containerStyle={carouselStyle} dot={MyDot} cols={1} rows={1} gap={10} autoplay={2000} showDots loop>
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
                <div className='title-text'>
                    <h2>Welcome to HAMBACKER GUITARS! <br/>
                        Introducing our unique online store dedicated to guitars. Here, you will find the widest selection of instruments suitable for every skill level and musical style.<br/><br/>
                        Our guitars are more than just instruments; they embody a passion for music. We meticulously curate each model to offer you the best sound quality, playing comfort, and aesthetic pleasure.<br/><br/>
                        Whether you're a beginner guitarist or an experienced musician, our online store provides a wide range of guitars, accessories, and related products to help you unleash your creative potential.<br/><br/>
                        Leave your doubts behind and join us today! Harness your musical abilities to create breathtaking melodies with our exceptional guitars. Your musical dreams will come to life with our guitar online store.
                    </h2>
                </div>
            </div>
        )
    }

    
}

export default MainPage;