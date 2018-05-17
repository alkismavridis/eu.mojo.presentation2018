package eu.mojo.presentation2018.graphql.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.shop.Product
import eu.mojo.presentation2018.shop.ShopComment

class ProductResolver: GraphQLResolver<Product> {
    //region FIELDS
    private var app: App
    constructor(app: App) {
        this.app = app
    }
    //endregion


    fun name(prod: Product, lang:String?): String {
        val langToUse = lang?: app.defaultLanguage
        var ret = prod.names[langToUse]

        //if property does npt exists in the requested language, use app default
        if (ret==null) ret = prod.names[app.defaultLanguage]
        return ret?:""
    }

    fun description(prod: Product, lang:String?): String {
        val langToUse = lang?: app.defaultLanguage
        var ret = prod.descriptions[langToUse]

        //if property does npt exists in the requested language, use app default
        if (ret==null) ret = prod.descriptions[app.defaultLanguage]
        return ret?:""
    }

    fun comments(prod: Product): List<ShopComment> {
        return prod.comments.sortedByDescending { el -> el.date }
    }
}