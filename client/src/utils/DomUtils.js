export default class DomUtils {

    /**
     * Return true if par contains child, or if child is itself par.
     * False otherwise.
     * */
    static contains(par, child) {
        if (par==null || child==null) return false;

        while (true) {
            //console.log(child);
            if (child===par) return true;
            else if (child==null) return false;
            child = child.parentElement;
        }
    }
}