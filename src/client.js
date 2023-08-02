import { collection, getDocs, getDoc, doc, addDoc, query, where} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL} from "firebase/storage";

// export async function getCities(db, collectionName) {
//   const citiesCol = collection(db, collectionName);
//   const citySnapshot = await getDocs(citiesCol);
//   // const cityList = citySnapshot.docs.map((doc) => doc.id);
  
//   return citySnapshot;
// }


  // export const fetchComments = async (db, value) => {
  //   const q = query(collection(db, 'comments'), where('guitar', '==', value));
  //   const fetchDocs = await getDocs(q);
  //   const ddd = fetchDocs.docs.map((item) => {
  //       return {
  //         comment: item.data().comment,
  //         rate: item.data().rate,
  //         date: item.data().date
  //       }
  //   });
  //   return ddd;
  // }

//   export const fetchDatas = async (db, field, symbol, value) => {

//         const q = query(collection(db, 'guitars'), where(field, symbol, value));
//         const fetchDocs = await getDocs(q);
//         const storage = getStorage();
//         const ddd = Promise.all(fetchDocs.docs.map(async (doc) => {
//             const {image, ...item} = doc.data();
//             return {
//                 ...item,
//                 image: await getDownloadURL(ref(storage, `${image._key.collectionGroup}/${image.id}`))
//             }
//         }));
//         return ddd;
//     }  

    // export const fetchData = async (db, model) => {

    //     const q = query(doc(db, 'guitars', model));
    //     const fetchDoc = await getDoc(q);
    //     const storage = getStorage();
        
        
    //     const {image, ...item} = fetchDoc.data();
 
    //     return {
    //         ...item,
    //         image: await getDownloadURL(ref(storage, `${image._key.collectionGroup}/${image.id}`))
    //     }
    // }  

// export async function addComment(db, guitar, comment, rate) {
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const formattedDate = `${day}/${month}/${year}`;
//   await addDoc(collection(db, 'comments'), {
//     guitar,
//     comment,
//     rate,
//     date: formattedDate
//   });
// }


