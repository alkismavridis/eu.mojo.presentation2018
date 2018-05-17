export default {
  LOAD_CATEGORY: `query($categoryId:Long!, $lang:String){
    shop {
        category(id:$categoryId) {
            id
            name(lang:$lang)
            next {name(lang:$lang), id}
            prev {name(lang:$lang), id}
            products {
              id, name(lang:$lang), description(lang:$lang), price
            }
        }
    }
  }`,
};