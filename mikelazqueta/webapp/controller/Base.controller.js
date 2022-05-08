sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function (Controller) {

    return Controller.extend("mikelazqueta.mikelazqueta.controller.Base", {

        onInit: function () {

        },

        toOrderDetails: function (evento) {
            var orderID = evento.getSource().getBindingContext("odataNorthwind").getObject().OrderID
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            oRouter.navTo("RouteOrderDetails", {
                OrderID: orderID
            })

        }




    })

})