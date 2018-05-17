export default class FormattingUtils {
    static toPriceLabel(cents, currency) {
        return (cents / 100).toFixed(2) + currency;
    }


    static digit2(num) {
        return ("0"+num).slice(-2);
    }

    static toYYYYMMDD_HHMM(date) {
        return (
            date.getFullYear()+"-"+
            FormattingUtils.digit2(date.getMonth())+"-"+
            FormattingUtils.digit2(date.getDate())+" "+
            FormattingUtils.digit2(date.getHours())+":"+
            FormattingUtils.digit2(date.getMinutes())
        );
    }
}