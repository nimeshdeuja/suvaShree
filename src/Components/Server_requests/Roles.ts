import { collection, getDocs, getFirestore} from "@firebase/firestore";
import { Log } from "../Shared/Utility";
import { app } from "./Firebase";

const db = getFirestore(app);
let dbCollection = collection(db, 'roles')

export const GetRoles =()=>{
    return new Promise<object[]>((resolve, reject) => {
        getDocs(dbCollection)
            .then((querySnapshot)=>{
                let list:object[] = []
                querySnapshot.forEach((doc) => list.push(doc.data()));
                resolve(list)
            })
            .catch(error=>{
                Log(`Error on GetRoles`, error);
                reject(500)
            })
    })
   
}