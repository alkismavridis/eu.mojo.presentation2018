package eu.mojo.presentation2018.user

import eu.mojo.presentation2018.shop.Order

class User {
    var id:Long = 0
    var userName:String
    lateinit var password:String
    var isRoot:Boolean


    constructor(userName:String) {
        this.isRoot = false
        this.userName = userName
    }


    //region SETTERS
    fun setId(id:Long): User {
        this.id = id
        return this
    }

    fun setPassword(password:String): User {
        this.password = password
        return this
    }

    fun maskAsRoot(isVendor:Boolean): User {
        this.isRoot = isVendor
        return this
    }
    //endregion
}