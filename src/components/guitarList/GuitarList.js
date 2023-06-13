import React from 'react';
import Spinner from '../spinner/Spinner';

import {Link, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { fetchDatas } from '../../client';
import db from '../../api';

import './guitarList.css'





const GuitarList = () => {
    
    const [guitarList, setGuitarList] = useState();
    const [loading, setLoading] = useState(true);
    const {category} = useParams();

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const newGuitars = await fetchDatas(db, 'type', '==', category);
            setLoading(false);      
            setGuitarList(newGuitars); 
        }
        getData();
          
    }, [category]);

    const renderItems = (guitarList) => {

        return (
            <div className='Guitar-List'>
                    {
                        Boolean(guitarList) && guitarList.map((item, i) => {
                            const {image, brand, model, strings} = item;

                            return (
                                    <Link to={`/${category}/${brand} ${model}`} key={i}>
                                        <div tabIndex={0} className='guitar'>
                                            <img className="guitar-image" src={image} alt="guitar"/>
                                            <p>{brand}</p>
                                            <p>{model}</p>
                                            <p>Strings: {strings}</p>
                                        </div>
                                    </Link>
                            )
                        })
                    }
            </div>
        )
    };

    
    const viewItems = loading ? <Spinner/> : renderItems(guitarList);

    return (
        <>
            {viewItems}
        </>

    )
}



export default GuitarList;