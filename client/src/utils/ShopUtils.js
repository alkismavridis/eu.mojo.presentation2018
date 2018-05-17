export default class ShopUtils {
    static addToOrder(order, entry) {
        const idToSearch = entry.product.id;
        const alreadyExisting = order.entries.find(e => e.product.id === idToSearch);

        if (alreadyExisting==null) order.entries.push(entry);
        else alreadyExisting.times = entry.times;
    }


    static removeFromOrder(order, productId) {
        const targetIndex = order.entries.findIndex(e => e.product.id === productId);
        if (targetIndex === -1) return;
        order.entries.splice(targetIndex, 1);
    }
};