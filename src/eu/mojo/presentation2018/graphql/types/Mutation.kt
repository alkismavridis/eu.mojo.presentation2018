package eu.mojo.presentation2018.graphql.types

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import eu.mojo.presentation2018.boot.App
import eu.mojo.presentation2018.boot.ShopSession
import eu.mojo.presentation2018.error.ErrorCode
import eu.mojo.presentation2018.error.ShopException
import eu.mojo.presentation2018.shop.Order
import eu.mojo.presentation2018.shop.ShopComment
import eu.mojo.presentation2018.user.User
import graphql.schema.DataFetchingEnvironment

class Mutation: GraphQLMutationResolver {

    //region FIELDS
    private var app: App
    //endregion


    constructor(app: App) {
        this.app = app
    }




    //region SESSION RELATED
    fun logout(env:DataFetchingEnvironment): Boolean {
        (env.getContext() as ShopSession).user = null
        return true
    }

    fun login(username:String, password:String, env:DataFetchingEnvironment): User? {
        val user = app.userService.get(username)

        //1 check user name existence
        if (user==null) throw ShopException(ErrorCode.USER_NOT_EXISTS, "User name does not exists")

        //2. check password matching
        if (password != user.password) throw ShopException(ErrorCode.WRONG_PASSWORD, "Incorrect password")

        //3. all correct. setup the session and return the user
        (env.getContext() as ShopSession).user = user
        return user
    }

    fun signin(username:String, password:String, env:DataFetchingEnvironment): User? {
        var user = app.userService.get(username)

        //1 check user name existence
        if (user!=null) throw ShopException(ErrorCode.USER_ALREADY_EXISTS, "User name already exists")

        //2. create new user and add to service
        user = User(username).setPassword(password)
        app.userService.updateOrInsert(user)

        //3. all correct. setup the session and return the user
        (env.getContext() as ShopSession).user = user
        return user
    }
    //endregion




    //region ORDER RELATED
    fun addToCart(productId:Long, times:Int, env:DataFetchingEnvironment): Order {
        val product = app.shop.product(productId)
        val order = (env.getContext() as ShopSession).order

        if (product==null) throw ShopException(ErrorCode.PRODUCT_NOT_FOUND)

        order.addProduct(product, times)
        return order
    }

    fun emptyCart(env:DataFetchingEnvironment): Order {
        val order = (env.getContext() as ShopSession).order
        order.empty()
        return order
    }

    fun removeFromCart(productId:Long, env:DataFetchingEnvironment): Order {
        val order = (env.getContext() as ShopSession).order
        order.removeProduct(productId)
        return order
    }

    fun createComment(productId:Long, text: String, env:DataFetchingEnvironment): ShopComment {
        val user = (env.getContext() as ShopSession).user
        if (user == null) throw ShopException(ErrorCode.UNAUTHORIZED)
        val product = app.shop.product(productId)

        if (product == null) throw ShopException(ErrorCode.PRODUCT_NOT_FOUND)

        //create the comment, and append it to the product
        val shopComment = app.shop.makeComment(text,user, product)
        return shopComment
    }
    //endregion
}