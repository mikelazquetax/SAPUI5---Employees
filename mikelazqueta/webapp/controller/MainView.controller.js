sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator, MessageToast) {
        "use strict";

        /*       function validacionInput() { ZONA PRIVADA Y MODULARIZACION
                  let vista = this.getView()
                  var input = this.byId("inputEmployees") 
                  var inputValue = input.getValue()
                  var selInput = this.byId("slCountry")
      
                  if (inputValue.length == 6) {
                      input.setDescription("OK")
                      selInput.setVisible(true)
                     this.byId("labelCountry").setVisible(true)
                  }
      
                  else {
                      input.setDescription("NOT OK")
                      selInput.setVisible(false)
                      this.byId("labelCountry").setVisible(false)
                  }
      
              }  */

        return Controller.extend("mikelazqueta.mikelazqueta.controller.MainView", {
            onInit: function () {
               
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

            },
            /*          validacion: validacionInput /* Invocamos funcion privada */
            validacion: function validacionInput() {
                let vista = this.getView()
                var input = this.byId("inputEmployees")
                var inputValue = input.getValue()
                var selInput = this.byId("slCountry")

                if (inputValue.length == 6) {
                    input.setDescription("OK")
                    selInput.setVisible(true)
                    this.byId("labelCountry").setVisible(true)
                }

                else {
                    input.setDescription("NOT OK")
                    selInput.setVisible(false)
                    this.byId("labelCountry").setVisible(false)
                }

            },

            filtrar: function (){
                var allData = this.getView().getModel("jsonCountries").getData() /* Obtenemos datos del modelo */
                var buscado = this.byId("inputEmployees").getValue() /* Obtener valor del input */


                var arrFiltro = []

                if(allData.EmployeeID !== ""){
                    arrFiltro.push(new Filter("EmployeeID", FilterOperator.EQ, allData.EmployeeID))
                }

                if(allData.CountryKey !== ""){
                    arrFiltro.push(new Filter("Country", FilterOperator.EQ, allData.CountryKey))
                }

                let listado = this.getView().byId("tableEmployee")
                let binding = listado.getBinding("items")
                binding.filter(arrFiltro)
            },

            clearfiltrar: function(){
                var modeloAct = this.getView().getModel("jsonCountries")
                modeloAct.setProperty("/EmployeeID","")
                modeloAct.setProperty("/CountryKey","")
            },
            mostrarCP: function(e){
                var allData = this.getView().getModel().getData()
                var itemPressed = e.getSource() /* Obtenemos el item que se ha pulsado */
                var contextPressed = itemPressed.getBindingContext("jsonEmployees");
                var objetoContext = contextPressed.getObject()

                MessageToast.show(`Codigo Postal: ${objetoContext.PostalCode}`)

            },
            onShowCity: function(){
                var oJSONModeloVisibilidad = this.getView().getModel("jsonVisibilidad")
                oJSONModeloVisibilidad.setProperty("/visibleCiudad", true)
                oJSONModeloVisibilidad.setProperty("/visibleBtnShowCity", false)
                oJSONModeloVisibilidad.setProperty("/visibleBtnHideCity", true)
            },
            onHideCity: function(){
                var oJSONModeloVisibilidad = this.getView().getModel("jsonVisibilidad")
                oJSONModeloVisibilidad.setProperty("/visibleCiudad", false)
                oJSONModeloVisibilidad.setProperty("/visibleBtnShowCity", true)
                oJSONModeloVisibilidad.setProperty("/visibleBtnHideCity", false)
            }
        });
    });
