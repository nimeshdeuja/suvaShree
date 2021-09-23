type MembersList = object[]
export const MembersModule =(members:any[])=>{
    let toReturn:MembersList = [];
    for(let member of members){
        let memberDetail = {
            birth_date:member.birth_date,
            email:member.email,
            id:member.id,
            name:member.name,
            uid:member.uid,
        }
        console.log("🚀 ~ file: Module.ts ~ line 13 ~ MembersModule ~ memberDetail", memberDetail)
    }
    return toReturn
}