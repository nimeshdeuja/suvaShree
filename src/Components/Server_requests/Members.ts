import { collection, doc, getDocs, getFirestore, query, setDoc, where, deleteDoc, updateDoc } from "@firebase/firestore";
import { Log, uuid } from "../Shared/Utility";
import { app, getAuthentication } from "./Firebase";

const db = getFirestore(app);
let dbCollection = collection(db, 'members')

export const GetMember=(id:string)=>{
    return new Promise<object | number>((resolve, reject)=>{
        const q = query(dbCollection, where("uid", "==", id));
        getDocs(q).then((querySnapshot)=>{
            let list:object[] = []
            querySnapshot.forEach((doc) => list.push(doc.data()));
                if(list.length>0) {
                    resolve(list[0])
                } else {
                    reject(404)
                };
        }).catch(error=>{
            Log(`Error on get members list:`, error);
            reject(500);
        })
    })
}

const CheckForEmail=(email:string)=>{
    return new Promise<number>((resolve, reject)=>{
        const q = query(dbCollection, where("email", "==", email));
        getDocs(q).then((querySnapshot)=>{
            let list:object[] = []
            querySnapshot.forEach((doc) => list.push(doc.data()));
                if(list.length>0) reject(403);
                else resolve(200);
        }).catch(error=>{
            Log(`Error on get users list:`, error);
            reject(500);
        })
    })
}


interface createMemberProps {
    email:string,
    name:string,
    birth_date:string,
    roleId:string,
    uid:string,
}
export const CreateMember = (data:createMemberProps)=>{
    return new Promise<number>((resolve, reject)=>{
        CheckForEmail(data.email).then(()=>{
            getAuthentication()
                .then(()=>{
                    let id = uuid();
                    const dataDoc = doc(dbCollection, id);
                        setDoc(dataDoc, {...data, id:id,}).then(() => {
                            Log(`Member has been successfully created!`);
                            resolve(200)
                        })
                        .catch((error) => {
                            Log(`Error on CreateMember:`, error);
                            reject(500)
                        });
                })
                .catch(status=>reject(status))
        }).catch(status=>{
            if(status === 403) {
                Log(`Already has account width this email`, status);
                reject(status)
            } else {
                Log(`Error on CreateMember`, status);
                reject(500)
            }
        })
    })
}

interface UpdateMemberProps {
    name:string,
    birth_date:string,
    id:string,
    roleId:string
}
export const UpdateMember= ({name, birth_date, roleId, id}:UpdateMemberProps)=>{
    new Promise<number>((resolve, reject) => {
        let data = {
            name,
            birth_date,
            roleId,
        }
        getAuthentication()
            .then(()=>{
                const dataDoc = doc(dbCollection, id);
                updateDoc(dataDoc, data)
                    .then(() => {
                        Log(`Member (${id}) has been successfully updated!`);
                        resolve(200)
                    })
                    .catch((error) => {
                        Log(`Error on UpdateMember:`, error);
                        reject(500)
                    });
            })
            .catch(status=>reject(status))
    })
}

export const DeleteMember = (id:string)=>{
    new Promise<number>((resolve, reject) => {
        deleteDoc(doc(dbCollection, id))
            .then(()=>{
                Log(`Member (${id}) has been successfully deleted!`);
                resolve(200)
            })
            .catch(error=>{
                Log(`Error on DeleteMember:`, error);
                reject(500)
            })
    })
}