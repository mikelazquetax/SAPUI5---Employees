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
                let oJSONModel = new sap.ui.model.json.JSONModel()
                let oView = this.getView()
                let i18nBundle = oView.getModel("i18n").getResourceBundle()

             /*    let oJSON = {
                    employeeId: "12345",
                    countryKey: "PT",
                    listCountry: [
                        {
                            key: "US",
                            text: i18nBundle.getText("countryUS")
                        },
                        {
                            key: "UK",
                            text: i18nBundle.getText("countryUK")
                        },
                        {
                            key: "ES",
                            text: i18nBundle.getText("countryES")
                        },
                        {
                            key: "PT",
                            text: i18nBundle.getText("countryPT")
                        }
                    ]
                }; */
               /*  oJSONModel.setData(oJSON) */
               oJSONModel.loadData("./localService/mockdata/Employees.json", false);

                oJSONModel.attachRequestCompleted(function(oEventModel){
                    console.log(JSON.stringify(oJSONModel.getData()))
                })

                oView.setModel(oJSONModel)
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
                var allData = this.getView().getModel().getData() /* Obtenemos datos del modelo */
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
                var modeloAct = this.getView().getModel()
                modeloAct.setProperty("/EmployeeID","")
                modeloAct.setProperty("/CountryKey","")
            },
            mostrarCP: function(e){
                var allData = this.getView().getModel().getData()
                var itemPressed = e.getSource() /* Obtenemos el item que se ha pulsado */
                var contextPressed = itemPressed.getBindingContext();
                var objetoContext = contextPressed.getObject()

                MessageToast.show(`Codigo Postal: ${objetoContext.PostalCode}`)

            }
        });
    });
