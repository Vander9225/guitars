import React, { Dispatch, useState } from 'react';
import { BucketGuitar } from './types';

interface BucketContextProps {
  bucketGuitars: BucketGuitar[];
  setBucketGuitars: Dispatch<any>;
}


export const BucketContext = React.createContext<BucketContextProps>({} as BucketContextProps);

export const BucketProvider = ({ children }) => {
  const bucketItems = JSON.parse(localStorage.getItem('bucket')!) || [];
  const [bucketGuitars, setBucketGuitars] = useState<BucketGuitar[]>(bucketItems);

  return (
    <BucketContext.Provider value={{ bucketGuitars, setBucketGuitars }}>{children}</BucketContext.Provider>
  );
};
