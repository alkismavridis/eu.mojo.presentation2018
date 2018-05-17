package eu.mojo.presentation2018.graphql.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.shop.Product
import eu.mojo.presentation2018.shop.ShopCategory

class ShopCategoryResolver: GraphQLResolver<ShopCategory> {
    //region FIELDS
    private var app: App
    constructor(app: App) {
        this.app = app
    }
    //endregion


    fun name(cat: ShopCategory, lang:String?): String {
        val langToUse = lang?: app.defaultLanguage
        var ret = cat.names[langToUse]

        //if property does npt exists in the requested language, use app default
        if (ret==null) ret = cat.names[app.defaultLanguage]
        return ret?:""
    }
}