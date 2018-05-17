package eu.mojo.presentation2018.boot

import eu.mojo.presentation2018.shop.Order
import eu.mojo.presentation2018.user.User


/**
 * ShopSession represents a session for this App.
 * An order object is always present.
 * The user object may be null
 * */
class ShopSession {
    var order = Order()
    var user: User? = null
    var requestCount: Int = 0
}