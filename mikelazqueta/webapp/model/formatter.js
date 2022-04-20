sap.ui.define([

], function () {
    function dateFormateo(date) {
        if (date) {
            var currentDate = new Date()
            var dateformat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: 'yyyy/MM/dd' })
            var dateNowFormat = new Date(dateformat.format(currentDate))

            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle()

            var timeDay = 24 * 60 * 60 * 1000

            switch (true) {
                case date.getTime() === dateNowFormat.getTime():
                    return oResourceBundle.getText("Today")
                case date.getTime() === dateNowFormat.getTime() - timeDay:
                    return oResourceBundle.getText("Yesterday")
                case date.getTime() === dateNowFormat.getTime() + timeDay:
                    return oResourceBundle.getText("Tomorrow")

                    default:
                        return ''
            }
        }

    }

    return {
        dateFormateo: dateFormateo
    }


});