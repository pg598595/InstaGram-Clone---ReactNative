const dataReducer = (state = {
    recipeFeed: []
}, action) => {
    console.log("Called dataReducer");

    switch (action.type) {
        case 'FEED':

            console.log(action.value);
            //state.token
            return { recipeFeed: action.value }

        default: { recipeFeed: state.recipeFeed }
    }
    return { recipeFeed: state.recipeFeed }
}
export default dataReducer;