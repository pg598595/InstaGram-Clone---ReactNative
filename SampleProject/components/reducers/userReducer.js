const userReducer = (state = {
    token: ''
}, action) => {
    console.log("Called userReducer");

    switch (action.type) {
        case 'TOKEN':

            console.log("Token for saving :" + action.value);
            //state.token
            return { token: action.value }

        default: { token: state.token }
    }
    return { token: state.token }
}

export default userReducer;