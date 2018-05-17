export default {
  ADD_TO_CART: `mutation($productId:Long!, $times:Int, $lang:String) {
    addToCart(productId:$productId, times:$times) {
        value,
        entry(id:$productId) { times, product {
            id, name(lang:$lang), description(lang:$lang), price
        }}
    }
  }`,

  REMOVE_FROM_CART: `mutation($productId:Long!) {
    removeFromCart(productId:$productId) { value }
  }`,
};