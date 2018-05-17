package eu.mojo.presentation2018.error

enum class ErrorCode {
    UNKNOWN(0),
    USER_ALREADY_EXISTS(1),
    USER_NOT_EXISTS(2),
    WRONG_PASSWORD(3),
    PRODUCT_NOT_FOUND(4),
    UNAUTHORIZED(5);

    private val value:Int
    constructor(i:Int) {
        this.value = i
    }

    fun getValue():Int = value
}