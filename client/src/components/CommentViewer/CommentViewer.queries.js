export default {
    GET_COMMENTS:`query($productId:Long!) {
        shop{
            product(id:$productId) {
                comments {
                    id, text, date, author {userName}
                }
            }
        }
    }`,

    SUBMIT_COMMENT:`mutation($productId:Long!, $text:String!) {
        createComment(productId:$productId, text: $text) {
            id, text, date, author {userName}
        }
    }`
};