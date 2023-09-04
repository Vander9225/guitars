import React, { useEffect, useContext } from 'react';
import { BucketContext } from '../BucketContext';

const useBucket = () => {
  const { bucketGuitars, setBucketGuitars } = useContext(BucketContext);

  const addToBucket = (guitarId) => {
    setBucketGuitars((prevState) => [...prevState, { guitar: guitarId, quantity: 1 }]);
  };

  const outFromBucket = (guitarId) =>{
    setBucketGuitars((prevState) => prevState.filter(({ guitar }) => guitar !== guitarId));
   }

  const changeQuantity = (guitarId, quantity) => {
    if (!quantity) {
      outFromBucket(guitarId)
      return;
    }
    setBucketGuitars((prevState) =>
      prevState.map((item) => {
        if (item.guitar === guitarId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('bucket', JSON.stringify(bucketGuitars));
  }, [bucketGuitars]);

  return { bucketGuitars, changeQuantity, addToBucket, outFromBucket };
};

export default useBucket;
