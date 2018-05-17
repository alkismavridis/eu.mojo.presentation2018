package eu.mojo.presentation2018.graphql

import com.coxautodev.graphql.tools.GraphQLResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.shop.ShopComment

class ShopCommentResolver(app: App) : GraphQLResolver<ShopComment> {
    val app: App = app



    //region RESOLVER HANDLERS
    fun date(shopComment: ShopComment) : Long {
        return shopComment.date.toEpochMilli()
    }
    //endregion

}
