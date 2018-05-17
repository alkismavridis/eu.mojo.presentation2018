package eu.mojo.presentation2018.shop

class ShopCategory {
    var names = mutableMapOf<String, String>()

    var next:ShopCategory? = null
    var prev:ShopCategory? = null
    val products =  mutableListOf<Product>()
    var id:Long = 0



    //region SETTERS
    fun setName(lang:String, name:String):ShopCategory {
        this.names[lang] = name
        return this //for chaining
    }
    //endregion
}