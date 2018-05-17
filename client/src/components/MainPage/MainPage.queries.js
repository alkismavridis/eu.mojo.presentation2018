export default {
  INIT_FETCH: `query($lang:String, $categoryId:Long){
        order {
            value
            entries {
                times
                product{ id, name(lang:$lang), description(lang:$lang), price }
            }
        }
        user {
            id, userName, isRoot
        }
        shop {
          currency
          currencyCode
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
    }
  `,
};