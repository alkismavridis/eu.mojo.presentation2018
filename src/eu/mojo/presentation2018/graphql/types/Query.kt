package eu.mojo.presentation2018.graphql.types

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.boot.ShopSession
import eu.mojo.presentation2018.shop.Order
import eu.mojo.presentation2018.shop.Product
import eu.mojo.presentation2018.shop.Shop
import eu.mojo.presentation2018.user.User
import eu.mojo.presentation2018.user.UserService
import graphql.schema.DataFetchingEnvironment
import java.util.*

class Query: GraphQLQueryResolver {

    //region FIELDS
    private var app: App

    constructor(app: App) {
        this.app = app
    }
    //endregion



   //region RESOLVERS
    fun shop(): Shop {
        return app.shop
    }

    fun languages(): List<String> {
        return listOf("ar", "en", "de", "gr", "fa", "it", "uk")
    }

    fun users(env:DataFetchingEnvironment): List<User> {
        return app.userService.getAll()
    }

    fun user(id:Long?, env:DataFetchingEnvironment): User? {
       if (id != null) return app.userService.get(id)
       return (env.getContext() as ShopSession).user
    }

    fun order(env:DataFetchingEnvironment): Order? {
        return (env.getContext() as ShopSession).order
    }

    fun defaultLanguage():String {
        return app.defaultLanguage
    }
   //endregion
}