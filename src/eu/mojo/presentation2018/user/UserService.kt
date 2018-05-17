package eu.mojo.presentation2018.user

import eu.mojo.presentation2018.boot.App

class UserService {
    //region FIELDS
    var app: App
    var users = mutableMapOf<Long, User>()
    private var nextID: Long = 0
    //endregion




    //region LIFE CYCLE
    constructor(app:App) {
        this.app = app
    }
    //endregion




    //region ENTITY GENERATION
    private fun generateID():Long {
        return ++nextID
    }
    //endregion




    //region READ
    fun get(id:Long):User? {
        return users.get(id)
    }

    fun get(login:String):User? {
        return users.filter{(id,u) -> u.userName.equals(login, true)}.values.firstOrNull()
    }

    fun getAll():List<User> {
        return ArrayList(users.values)
    }
    //endregion




    //region UPDATES AND INSERTS
    fun updateOrInsert(user:User) {
        if (user.id == 0L) {
            user.id = generateID()
            users.put(user.id, user)
        }
        else {
            users.put(user.id, user)
        }
    }
    //endregion
}