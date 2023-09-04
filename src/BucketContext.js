import React , {useState} from 'react';

export const BucketContext = React.createContext();

export const BucketProvider = ({children}) =>{
    const bucketItems = JSON.parse(localStorage.getItem('bucket')) || [];
    const [bucketGuitars, setBucketGuitars] = useState(bucketItems);

    return(
        <BucketContext.Provider value={{bucketGuitars,setBucketGuitars}}>
            {children}
        </BucketContext.Provider>
    )

}