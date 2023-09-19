import React, { useContext } from 'react';
import Spinner from '../spinner/Spinner';
import { AppContext } from '../AppContext'; 
import {Link, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import db from '../../api';

import './guitarList.css'
import { Guitar } from '../../types';


const GuitarList = () => {

    const {loading, setLoading, fetchDatas} = useContext(AppContext);
    const [guitarList, setGuitarList] = useState<Guitar[]>();
    const {category} = useParams();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const newGuitars = await fetchDatas(db, 'type', '==', category);
            setLoading(false);      
            setGuitarList(newGuitars as Guitar[]); 
        }
        getData();
          
    }, [category]);


    const renderItems = (guitarList: Guitar[]) => {

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

    
    const viewItems = loading ? <Spinner/> : renderItems(guitarList!);

    return (
        <>
            {viewItems}
        </>

    )
}



export default GuitarList;