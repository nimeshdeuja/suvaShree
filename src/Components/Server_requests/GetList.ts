import { auth } from "./Firebase";

const listByUser = (data:any)=>{
    let list:{
        id:string,
        name:string,
        email:string,
        age:string,
        accountId:string
    }[] = []
    for (const key of Object.keys(data)) {
        let isExist = list.some((item) => item.id === key);
        if(!isExist) list.push({
            id:key,
            name:data[key].name,
            email:data[key].email,
            age:data[key].age,
            accountId:data[key].accountId,
        })
    }
    if(auth && auth.currentUser) {
        let uid = auth.currentUser.uid
        return list.filter(item=>item.accountId === uid)
    }
    return list
}

export const getList= (data:object, URL:string)=>{
    switch (URL){
        case 'users':
            return listByUser(data);
        default:
            return []; 
}
}