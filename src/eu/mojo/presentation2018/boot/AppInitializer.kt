package eu.mojo.presentation2018.boot

import com.google.gson.JsonObject
import com.google.gson.JsonParser
import eu.mojo.presentation2018.shop.Product
import eu.mojo.presentation2018.shop.ShopCategory
import eu.mojo.presentation2018.user.User
import java.nio.charset.Charset
import java.nio.file.Files
import java.nio.file.Path




//region LANGUAGE DATA SETUP
/**
 * adsone json file contents to a Json object.
 * The appended key  will be the file name without the extention .json
 * The appended value will be the file contents (must represent a json object)
 * */
private fun addLobObject(jsonFile:Path, target:JsonObject) {
    val fileName = jsonFile.fileName.toString().toLowerCase()
    if (!fileName.endsWith(".json")) return

    //remove the extention .json, and we get the language code
    val langCode = fileName.substring(0..fileName.length-6)

    //get the contents
    val jsonString = String ( Files.readAllBytes(jsonFile), Charset.forName("UTF-8") )

    //append the newly Read json string into target object
    target.add(langCode, JsonParser().parse(jsonString).asJsonObject)
}


/**
 * reads all lob data for all languages, and create one json object out of them.
 * The structure of this object will be:
 * <LANGUAGE_CODE>  :  <FILE_CONTENTS>
 * */
private fun getLobData(base: Path): JsonObject {
    val ret = JsonObject()
    Files.walk(base).use{
        stream ->  stream.forEach{ jsonFile -> addLobObject(jsonFile, ret)}
    }

    return ret
}


/** adds all language data to a product, and returns the product for easier chaining. */
private fun setupProductLangData(prod: Product, lob:JsonObject, key:String):Product {
    lob.entrySet().forEach{ (k,v) ->
        val objectData = v.asJsonObject.getAsJsonObject("products").get(key).asJsonObject
        prod.setLanguageData(k, objectData.get("name").asString, objectData.get("desc").asString)
    }
    return prod
}

/** adds all language data to a category, and returns the category for easier chaining. */
private fun setupCategoryLangData(category: ShopCategory, lob:JsonObject, key:String):ShopCategory {
    lob.entrySet().forEach{ (k,v) -> category.setName(k, v.asJsonObject.getAsJsonObject("categories").get(key).asString) }
    return category
}
//endregion




fun initApp(app:App) {
    //1. create a root user
    val rootUser = User("root")
            .setPassword("root")

    rootUser.isRoot = true
    app.userService.updateOrInsert(rootUser)

    val lob = getLobData(app.resources.resolve("lob"))

    //2. create product categories
    val foodCat = ShopCategory()
    val gamesCat =  ShopCategory()
    val accessoriesCat = ShopCategory()
    val vehiclesCat = ShopCategory()

    app.shop.addCategory( setupCategoryLangData(foodCat, lob, "food") )
    app.shop.addCategory( setupCategoryLangData(gamesCat, lob, "games") )
    app.shop.addCategory( setupCategoryLangData(accessoriesCat, lob, "accessories") )
    app.shop.addCategory( setupCategoryLangData(vehiclesCat, lob, "vehicles") )


    //create products
    app.shop.addProduct( setupProductLangData(Product(350, foodCat), lob, "cheeseMoon") )
    app.shop.addProduct( setupProductLangData(Product(900, foodCat), lob, "teleportChokolate") )
    app.shop.addProduct( setupProductLangData(Product(700, foodCat), lob, "lasagne") )
    app.shop.addProduct( setupProductLangData(Product(1000, gamesCat), lob, "strategema") )
    app.shop.addProduct( setupProductLangData(Product(999, gamesCat), lob, "dunshire") )
    app.shop.addProduct( setupProductLangData(Product(1500, gamesCat), lob, "3dChess") )
    app.shop.addProduct( setupProductLangData(Product(7000, vehiclesCat), lob, "tardis") )
    app.shop.addProduct( setupProductLangData(Product(5000, vehiclesCat), lob, "deLorean") )
    app.shop.addProduct( setupProductLangData(Product(9999, vehiclesCat), lob, "voyager") )
    app.shop.addProduct( setupProductLangData(Product(5500, accessoriesCat), lob, "invisibleClock") )
    app.shop.addProduct( setupProductLangData(Product(0, accessoriesCat), lob, "ring") )
    app.shop.addProduct( setupProductLangData(Product(800, accessoriesCat), lob, "linusBlanket") )
}