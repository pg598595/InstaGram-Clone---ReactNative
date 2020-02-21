export function setToken(token,uri){
    console.log("caleed UserAction : " + token)
    console.log("caled uri : " + uri)
    return{
        type: 'TOKEN',
        value: 'Bearer '+token,
        uriValue: uri
    };
}

export function setProfilePic(uri){
    console.log("caled setProfilePic : " + uri)
    return{
        type: 'PROFILEPICTURE',
        value: uri
    };
}