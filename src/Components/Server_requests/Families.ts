import { collection, doc, getDocs, getFirestore, setDoc, updateDoc, deleteDoc } from '@firebase/firestore';
import { Log, uuid } from '../Shared/Utility';
import { app, getAuthentication } from './Firebase';

const db = getFirestore(app);
let dbCollection = collection(db, 'families')

interface CreateFamilyProps {
    name:string,
    members?:string[]|null,
    contactPerson?:string | null,
}
export const CreateFamily=({name, members, contactPerson}:CreateFamilyProps)=>{
    new Promise<number>((resolve, reject) => {
        getAuthentication()
            .then(()=>{
                let id = uuid();
                const dataDoc = doc(dbCollection, id);
                let data = {
                    name,
                    id,
                    members:members?members:null,
                    contactPerson:contactPerson?contactPerson:null
                }
                setDoc(dataDoc, data)
                    .then(() => {
                        Log(`Family has been successfully created!`);
                        resolve(200)
                    })
                    .catch((error) => {
                        Log(`Error on CreateFamily:`, error);
                        reject(500)
                    })
            })
            .catch(status=>reject(status))
    })
}

export const GetFamilies = () => {
    return new Promise<object[] | number>((resolve, reject) => {
        getDocs(dbCollection)
            .then((querySnapshot)=>{
                let list:object[] = []
                querySnapshot.forEach((doc) => list.push(doc.data()));
                resolve(list) 
            })
            .catch(error=>{
                Log(`Error on GetFamily`, error);
                reject(500)
            })
    })
}

interface UpdateFamilyProps {
    name:string,
    id:string
    members?:string[]|null,
    contactPerson?:string | null,
}
export const UpdateFamily = ({name, members, contactPerson, id}:UpdateFamilyProps)=>{
    new Promise<number>((resolve, reject) => {
        let data = {
            name,
            members:members?members:null,
            contactPerson:contactPerson?contactPerson:null
        }
        getAuthentication()
            .then(()=>{
                const dataDoc = doc(dbCollection, id);
                updateDoc(dataDoc, data)
                    .then(() => {
                        Log(`Family (${id}) has been successfully updated!`);
                        resolve(200)
                    })
                    .catch((error) => {
                        Log(`Error on UpdateFamily:`, error);
                        reject(500)
                    });
            })
            .catch(status=>reject(status))
    })
}

export const DeleteFamily =(id:string)=>{
    new Promise<number>((resolve, reject) => {
        deleteDoc(doc(dbCollection, id))
            .then(()=>{
                Log(`Family (${id}) has been successfully deleted!`);
                resolve(200)
            })
            .catch(error=>{
                Log(`Error on DeleteFamily:`, error);
                reject(500)
            })  
    })
}