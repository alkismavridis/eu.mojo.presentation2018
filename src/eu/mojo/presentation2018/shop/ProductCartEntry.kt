package eu.mojo.presentation2018.shop

class ProductCartEntry {
    var times:Int
    var product:Product

    constructor(product: Product, times:Int) {
        this.product = product
        this.times = times
    }
}
