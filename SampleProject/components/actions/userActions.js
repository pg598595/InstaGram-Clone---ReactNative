export function setToken(token){
    console.log("caleed UserAction : " + token)
    return{
        type: 'TOKEN',
        value: 'Bearer '+token
    };
}