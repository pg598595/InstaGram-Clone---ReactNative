const userReducer = (state = {
    token: '', userProfilePic: ''
}, action) => {
    console.log("Called userReducer");

    switch (action.type) {
        case 'TOKEN':

            console.log("Token for saving :" + action.value);
            console.log("ProfilePic :" + action.uriValue);
            //state.token
            return { token: action.value,userProfilePic:action.uriValue }

       
        default: [{ token: state.token  },{userProfilePic: state.userProfilePic}]
    }
    return { token: state.token,userProfilePic: state.userProfilePic }
}

export default userReducer;