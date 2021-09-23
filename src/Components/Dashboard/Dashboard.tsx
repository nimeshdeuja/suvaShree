import { useContext, useEffect } from "react";

import { AuthContext } from "../Shared/AuthProvider";
import { CreateMember, DeleteMember, UpdateMember } from "../Server_requests/Members";
import { SignOut } from "../Server_requests/Firebase";
import { CreateFamily, DeleteFamily, GetFamilies, UpdateFamily } from "../Server_requests/Families";

const Dashboard = () => {
  const { userData,  setUserData, setAuthLoading } = useContext(AuthContext);
  const logoutHandler = () => {
    SignOut();
    setAuthLoading(true);
    setUserData(null);
  };

  useEffect(() => {
    GetFamilies()
      .then((list) => {
        console.table(list);
      })
      .catch((error) => {
        console.log("🚀 ~ file: Dashboard.tsx ~ line 18 ~ Get ~ error", error);
      });
    }, []);


  const addMemberHandler = () => {
    let toSend ={
      birth_date:'1987-11-28',
      email:'test@gmail.com',
      name:'test',
      roleId:'e42528c2-cd09-4876-98d7-11f55c927947',
      uid:'22phfZ0fuVMwyHuG5ERk8dz7U7k2',
    }
    CreateMember(toSend)
  }

  const updateMemberHandler =()=>{
    let toSend ={
      birth_date:'1987-11-28',
      name:'Nimesh Deuja',
      roleId:'e42528c2-cd09-4876-98d7-11f55c927947',
      id:'e05fbb51-6207-43b6-a9d9-933022633a2d'
    }
    UpdateMember(toSend)
  }

  return (
    <div>
      From Dashboard
      <button onClick={logoutHandler}>Sign Out</button>
      <button
        onClick={() =>
          CreateFamily({
            name: "nimesh deuja"
          })
        }
      >
        Add Family
      </button>
      <button
        onClick={() =>
          UpdateFamily({
            name:'testing',
            contactPerson:'c4164deb-56c5-42a6-a815-2f192c6a8234',
            id:'c4164deb-56c5-42a6-a815-2f192c6a8234'
          })
        }
      >
        update Family
      </button>
      <button
        onClick={() => DeleteFamily("c4164deb-56c5-42a6-a815-2f192c6a8234")}
      >
        Delete Family
      </button>
      {userData?.role?.code === 1 && <button onClick={addMemberHandler}>Add member</button>}
      {userData?.role?.code === 1 && <button onClick={updateMemberHandler}>Update member</button>}
      {userData?.role?.code === 1 && <button onClick={()=>DeleteMember('ea2b48e8-a8b6-42d3-98b0-9d3186b6ed70')}>Delete member</button>}
    </div>
  );
};

export default Dashboard;
