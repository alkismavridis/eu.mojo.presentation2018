package eu.mojo.presentation2018.boot

import eu.mojo.presentation2018.graphql.GraphqlService
import eu.mojo.presentation2018.shop.Shop
import eu.mojo.presentation2018.user.UserService
import java.nio.file.Path

class App {
    //region FIELDS
    internal var defaultLanguage:String = "en"
    internal var resources:Path
    internal var shop: Shop
    internal var userService: UserService
    internal var graphqlService: GraphqlService
    //endregion




    constructor(resourcesDir:Path) {
        this.resources = resourcesDir
        this.shop = Shop(this)
        this.graphqlService = GraphqlService(this)
        this. userService = UserService(this)
        initApp(this)
    }
}