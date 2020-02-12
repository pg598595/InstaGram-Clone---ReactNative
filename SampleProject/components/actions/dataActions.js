export function setFeedList(feedList){
    console.log("caleed DataUser ===  " );
    
    console.log(feedList)
    return{
        type: 'SET_FEED_LIST',
        recipeList: feedList
    };
}