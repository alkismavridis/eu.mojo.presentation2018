package eu.mojo.presentation2018.shop

class Product {
    //region FIELDS
    var id:Long = 0
    var price:Int = 0 //number of cent
    var names = mutableMapOf<String, String>()
    var descriptions = mutableMapOf<String, String>()
    var category:ShopCategory
    var comments = mutableListOf<ShopComment>()



    constructor(price:Int, category:ShopCategory) {
        this.price = price
        this.category = category
    }
    //endregion




    //region GETTERS
    fun setId(id:Long):Product {
        this.id = id
        return this
    }

    fun setPrice(price:Int):Product {
        this.price = price
        return this
    }

    fun setLanguageData(lang:String, name:String, description:String):Product {
        this.names[lang] = name
        this.descriptions[lang] = description
        return this
    }
    //endregion
}
