package eu.mojo.presentation2018.shop

import eu.mojo.presentation2018.user.User
import java.time.Instant

class ShopComment {
    //region FIELDS
    val text: String
    val author: User
    val date: Instant
    var id: Long = 0
    //endregion



    constructor(text: String, author: User) {
        this.text = text
        this.author = author
        this.date = Instant.now()
    }
}