package eu.mojo.presentation2018.shop

class Order {
    //region FIELDS
    var id:Long = 0
    var value:Int = 0 //number of cent
    var entries:MutableList<ProductCartEntry> = mutableListOf()
    //endregion


    constructor() {}



    //region GETTERS
    fun entry(id:Long): ProductCartEntry? {
        return entries.find { e -> e.product.id == id }
    }
    //endregion




    //region MODIFIERS
    /**
     * creates a new cart entry, or adds to an existing one {@code times} times.
     * In the second scenarion, the resulting times after the operation will be the sum
     * of the times before, plus the times added.
     * */
    fun addProduct(product: Product, times: Int) {
        val entry = this.entry(product.id)

        if (entry==null) {
            if (times<=0) return
            entries.add(ProductCartEntry(product, times))
            value += (times * product.price)
        }
        else mergeEntry(entry, times)
    }

    fun mergeEntry(entry:ProductCartEntry, times:Int) {
        //avoid negative "times"
        if (times + entry.times <= 0) {
            value -= (entry.times * entry.product.price)
            entry.times = 0
        }
        else {
            entry.times += times
            value += (times * entry.product.price)
        }
    }

    fun removeProduct(id:Long) {
        val indexToRemove = entries.indexOfFirst{ e -> e.product.id == id }
        if (indexToRemove == -1) return

        //remove the entry and substract its value from the order
        var removedEntry = entries.removeAt(indexToRemove)
        value -= removedEntry.product.price * removedEntry.times
    }


    fun empty() {
        value = 0
        entries = mutableListOf()
    }
    //endregion
}