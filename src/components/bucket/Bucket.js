import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Quantity from '../quantity/Quantity';
import { AppContext } from '../AppContext';
import db from '../../api';
import './bucket.css';
import { useAsync } from 'react-use';
import useBucket from '../useBucket';
import remove from '../../images/remove.png';

const Bucket = () => {
  const { loading, fetchData } = useContext(AppContext);

  const { bucketGuitars, outFromBucket } = useBucket();

  const {
    loading: backetsLoading,
    error,
    value: backetsValue = [],
  } = useAsync(
    () =>
      Promise.all(bucketGuitars.map(async (item) => await fetchData(db, item.guitar.toString()))).then(
        (items) => items
      ),
    [bucketGuitars.length]
  );
  if (error) {
    return <span>error.message</span>;
  }




  const renderItems = (items) => {

    return (
      <div className="bucket">
        {items.length ? (
          items.map((item, i) => {
            const { image, brand, model, type } = item;
            const guitarId = `${brand} ${model}`;
            const quantity = bucketGuitars.find(({ guitar }) => guitar === guitarId)?.quantity;
            
            const removeBucketItem = () =>{
              outFromBucket(guitarId)
            }
            
            return (
              <div className="bucket-item" key={i}>
                <button onClick={removeBucketItem} className='remove-button'><img src={remove}/></button>
                <Link to={`/${type}/${guitarId}`}>
                  <div className="image-box">
                    <img className="bucket-item-img" src={image} />
                  </div>
                </Link>
                <h3 className="bucket-item-name">
                  {brand} {model}
                </h3>
                <Quantity guitarId={guitarId} quantity={quantity} />
              </div>
            );
          })
        ) : (
          <span>Кошик пустий</span>
        )}
      </div>
    );
  };

  return loading || backetsLoading ? <Spinner /> : renderItems(backetsValue);
};

export default Bucket;
