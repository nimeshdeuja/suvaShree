export const Log = (message:string, error?:any) => {
    if (process.env.REACT_APP_ENV === "development") {
      if (error) {
        console.error(message + " " + error);
      } else {
        console.log(message);
      }
    }
  };

export const uuid =()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export const checkUserIfAuthorize = (id:string) => {
  let ids = process.env.REACT_APP_ADMIN_ID
    ? process.env.REACT_APP_ADMIN_ID
    : "";
  ids.replace(" ", "");
  ids.split(",");
  return ids.includes(id);
};
