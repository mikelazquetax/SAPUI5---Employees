sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function(Controller){
    return Controller.extend("mikelazqueta.mikelazqueta.controller.Main",{

        onInit: function(){
            let oView = this.getView()

            let oJSONModelEmpl = new sap.ui.model.json.JSONModel()
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModelEmpl, "jsonEmployees")

            let oJSONModelCountries = new sap.ui.model.json.JSONModel()
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJSONModelCountries, "jsonCountries")

            let oJSONModelVisibilidad = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visiblePais: true,
                visibleCiudad: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            })
            oView.setModel(oJSONModelVisibilidad, "jsonVisibilidad")

        }


    });

})