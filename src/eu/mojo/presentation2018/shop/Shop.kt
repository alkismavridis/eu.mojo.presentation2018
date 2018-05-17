package eu.mojo.presentation2018.shop

import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.user.User


/**These is only one shop in an App.*/
class Shop {
    var currency: String
    var currencyCode: String

    private var products = mutableListOf<Product>()
    private var categories = mutableListOf<ShopCategory>()
    private var lastProductID:Long = 0
    private var lastCategoryID:Long = 0
    private var lastCommentID: Long = 0



    //region LIFE CYCLE
    constructor(app: App) {
        this.currency = "€"
        this.currencyCode = "EUR"
    }

    private fun generateProductId():Long {
        return ++lastProductID
    }

    private fun generateCategoryId():Long {
        return ++lastCategoryID
    }


    private fun generateCommentId():Long {
        return ++lastCommentID
    }



    //endregion



    //region GETTERS
    fun products():List<Product> {
        return products
    }

    fun product(id:Long): Product? {
        return products.find { p -> p.id==id }
    }

    fun categories():List<ShopCategory> {
        return categories
    }

    fun category(id:Long): ShopCategory? {
        if (id==0L && categories.size > 0) return categories[0]
        return categories.find { c -> c.id==id }
    }
    //endregion




    //region CONFIGURING THE SHOP
    fun setCurrency(symbol:String, code:String): Shop {
        this.currency = symbol
        this.currencyCode = code
        return this
    }

    fun addProduct(prod:Product): Shop {
        prod.setId(generateProductId())

        prod.category.products.add(prod) //add the product to category
        this.products.add(prod)
        return this
    }

    fun addCategory(cat:ShopCategory): Shop {
        cat.id = generateProductId()
        //bind prev and next references
        if (categories.size > 0) {
            cat.prev = categories.last()
            cat.next = categories.first()

            categories.last().next = cat
            categories.first().prev = cat
        }

        this.categories.add(cat)
        return this
    }

    fun makeComment(text: String, user: User, product: Product): ShopComment {
        val shopComment = ShopComment(text,user)
        shopComment.id = generateCommentId()
        product.comments.add(shopComment)

        return shopComment
    }
    //endregion
}