package eu.mojo.presentation2018.graphql.resolvers

import com.coxautodev.graphql.tools.GraphQLResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.shop.Order
import eu.mojo.presentation2018.user.User

class UserResolver: GraphQLResolver<User> {
    //region FIELDS
    private var app: App
    constructor(app: App) {
        this.app = app
    }
    //endregion



    //region RESOLVERS
    //endregion
}