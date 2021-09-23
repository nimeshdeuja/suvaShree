import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { GetMember } from '../Server_requests/Members';
import { Log } from './Utility';
import { auth, SignOut } from '../Server_requests/Firebase';
import { GetRoles } from '../Server_requests/Roles';

type Users = {
        birth_date:string,
        email:string,
        id:string,
        name:string,
        uid:string,
        role:{
            id:string,
            name:string,
            code:number
        } 
    } | null
interface AuthContextProps {
    authLoading: boolean,
    setAuthLoading: (authLoading: boolean) => void,
    userData:Users,
    setUserData: (user: Users) => void,
}
export const AuthContext = React.createContext({} as AuthContextProps);

const getUserData =(member:any, roles:any[])=>{
    let role = roles.filter(item=>item.id === member.roleId);
    return {
        birth_date:member.birth_date,
        email:member.email,
        id:member.id,
        name:member.name,
        uid:member.uid,
        role:role.length>0?role[0]:null
    }
}

export const AuthProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<Users>(null)

    useEffect(() => {
        const signOutHandler =()=>{
            SignOut();
            setAuthLoading(false)
            setUserData(null);
        }
        if (authLoading) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setAuthLoading(true);
                    GetMember(user.uid)
                        .then(memberData=>{
                            GetRoles()
                                .then(roles=>{
                                    let data = getUserData(memberData, roles);
                                    if(data && data.role){
                                        setUserData(data);
                                        setAuthLoading(false);
                                    } else {
                                        Log('Role can not be empty!');
                                        signOutHandler();
                                    }
                                })
                                .catch(status=>{
                                    Log('Error on GetRoles:', status);
                                    signOutHandler();
                                })
                        })
                        .catch(status=>{
                            Log('Error on GetMember:', status);
                            signOutHandler();
                        })
                } else {
                    setAuthLoading(false);
                }
            })
        }
    }, [authLoading])

    return (
        <AuthContext.Provider
            value={{
                authLoading,
                setAuthLoading,
                userData,
                setUserData
            }}
        >
            {authLoading ? 'Loading page...' : children}
        </AuthContext.Provider>
    )
}
