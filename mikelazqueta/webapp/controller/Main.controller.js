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

            let oJSONLayouts = new sap.ui.model.json.JSONModel()
            oJSONLayouts.loadData("./localService/mockdata/Layout.json", false);
            oView.setModel(oJSONLayouts, "jsonLayouts")

            let oJSONModelVisibilidad = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visiblePais: true,
                visibleCiudad: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            })
            oView.setModel(oJSONModelVisibilidad, "jsonVisibilidad")

            this._bus = sap.ui.getCore().getEventBus()
            this._bus.subscribe("flexible", "mostrarEmpleado", this.mostrarDetalleEmpl, this)
        },
        mostrarDetalleEmpl: function(category, nameEvent, path){
            var detailView = this.getView().byId("detailEmployeeView")
            detailView.bindElement("jsonEmployees>" + path)
            this.getView().getModel("jsonLayouts").setProperty("/ActiveKey", "TwoColumnsMidExpanded")

            var incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel,"incidenceModel");
            detailView.byId("tableIncidence").removeAllContent()
        }

    });

})