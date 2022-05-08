sap.ui.define([
    "sap/ui/core/mvc/Controller" ,
    "sap/ui/core/routing/History"
], function(Controller, History) {
    
    return  Controller.extend("mikelazqueta.mikelazqueta.controller.OrderDetails", {

        onInit: function(){

        },

        onBack: function(evento){
            var oHistory = History.getInstance()
            var sPreviousHash = oHistory.getPreviousHash()

            if(sPreviousHash !== undefined){
                window.history.go(-1) //Viajamos a la vista anterior
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                oRouter.navTo("RouteMain", true) //Si el usuario llega directamente a la vista de los detalles sin pasar por la vista principal y luego quiere ir a dicha vista
            }

        }


    })
    
});