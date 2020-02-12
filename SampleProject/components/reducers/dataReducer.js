const dataReducer = (state = {
    recipeFeed: []
}, action) => {
    console.log("Called dataReducer");

    switch (action.type) {
        case 'SET_FEED_LIST':
            console.log("Called dataReducer SET_FEED_LIST");
            console.log(action.recipeList);
            //state.token
            return { recipeFeed: action.recipeList }

        default: { recipeFeed: state.recipeFeed }
    }
    return { recipeFeed: state.recipeFeed }
}
export default dataReducer;