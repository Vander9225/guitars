import { useEffect, useContext } from 'react';
import { BucketContext } from '../BucketContext';
import { BucketGuitar } from '../types';

const useBucket = () => {
  const { bucketGuitars, setBucketGuitars } = useContext(BucketContext);

  const addToBucket = (guitarId: string): void => {
    setBucketGuitars((prevState: BucketGuitar[] | null[]) => [...prevState, { guitar: guitarId, quantity: 1 }]);
  };

  const outFromBucket = (guitarId: string): void =>{
    setBucketGuitars((prevState: BucketGuitar[]) => prevState.filter(({ guitar }) => guitar !== guitarId));
   }

  const changeQuantity = (guitarId: string, quantity: number): void => {
    if (!quantity) {
      outFromBucket(guitarId)
      return;
    }
    setBucketGuitars((prevState: BucketGuitar[]) =>
      prevState.map((item: BucketGuitar ) => {
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
