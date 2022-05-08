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

        

        return Controller.extend("mikelazqueta.mikelazqueta.controller.MasterEmployee", {
            onInit: function () {
               this._bus = sap.ui.getCore().getEventBus()

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

            mostrarOrden: function (evento){
           /*      var ordersTable = this.getView().byId("ordersTable")
                ordersTable.destroyItems()
                var itemPressed = evento.getSource()
                var oContext = itemPressed.getBindingContext("odataNorthwind")

                var objetoContext = oContext.getObject()
                var orders = objetoContext.Orders
                var orderItems = []

                for (var i in orders){
                    orderItems.push(new sap.m.ColumnListItem({
                        cells : [
                            new sap.m.Label({text: orders[i].OrderID}),
                            new sap.m.Label({text: orders[i].Freight}),
                            new sap.m.Label({text: orders[i].ShipAddress}),
                        ]
                    }))
                }
                var newTable = new sap.m.Table({
                    width: "auto",
                    columns: [
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>OrderID}"})}),
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>Freight}"})}),
                        new sap.m.Column({header: new sap.m.Label({text: "{i18n>ShipAddress}"})})
                    ],
                    items: orderItems
                }).addStyleClass("sapUiSmallMargin")

                ordersTable.addItem(newTable) */
                /* Otra forma de hacer lo de arriba. 2º Table */
/* 
                var newTableV2 = new sap.m.Table()
                newTableV2.setWidth("auto");
                newTableV2.addStyleClass("sapUiSmallMargin")

                var columnOrderID = new sap.m.Column();
                var labelOrderID = new sap.m.Label();
                labelOrderID.bindProperty("text", "i18n>orderID")
                columnOrderID.setHeader(labelOrderID);
                newTableV2.addColumn(columnOrderID)

                var columnFreight = new sap.m.Column();
                var labelFreight = new sap.m.Label();
                labelFreight.bindProperty("text", "i18n>Freight")
                columnFreight.setHeader(labelFreight);
                newTableV2.addColumn(columnFreight)

                var columnShipAddress = new sap.m.Column();
                var labelShipAddress = new sap.m.Label();
                labelShipAddress.bindProperty("text", "i18n>ShipAddress")
                columnShipAddress.setHeader(labelShipAddress);
                newTableV2.addColumn(columnShipAddress)

                var columnListItem = new sap.m.ColumnListItem()

                var cellOrderID = new sap.m.Label()
                cellOrderID.bindProperty("text", "odataNorthwind>OrderID")
                columnListItem.addCell(cellOrderID)

                var cellFreight = new sap.m.Label()
                cellFreight.bindProperty("text", "odataNorthwind>Freight")
                columnListItem.addCell(cellFreight)

                var cellShip = new sap.m.Label()
                cellShip.bindProperty("text", "odataNorthwind>ShipAddress")
                columnListItem.addCell(cellShip)

                var oBindingInfo = {
                    model: 'odataNorthwind',
                    path: 'Orders',
                    template: columnListItem
                }

               
                newTableV2.bindAggregation("items", oBindingInfo)
                newTableV2.bindElement("odataNorthwind>" + oContext.getPath())
                ordersTable.addItem(newTableV2) */

                /* DIALOGO A PARTIR DE AQUI*/

                var iconPressed = evento.getSource();

                /* cogemos el modelo del objeto pulsado */

                var oEvento = iconPressed.getBindingContext("odataNorthwind");

                if (!this._oDialogOrders){
                this._oDialogOrders = sap.ui.xmlfragment("mikelazqueta.mikelazqueta.fragment.DialogOrders", this)
                this.getView().addDependent(this._oDialogOrders)
                }

                this._oDialogOrders.bindElement("odataNorthwind>" + oEvento.getPath());
                this._oDialogOrders.open()
 
              },

              cerrarModal: function(){
                  this._oDialogOrders.close()
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
/*             mostrarCP: function(e){
                var allData = this.getView().getModel().getData()
                var itemPressed = e.getSource() /* Obtenemos el item que se ha pulsado 
                var contextPressed = itemPressed.getBindingContext("odataNorthwind");
                var objetoContext = contextPressed.getObject()

                MessageToast.show(`Codigo Postal: ${objetoContext.PostalCode}`)
                mostrarOrden()
            }, */ 
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
            },

            mostrarEmpleado: function(evento){
                var path = evento.getSource().getBindingContext("odataNorthwind").getPath()
                this._bus.publish("flexible", "mostrarEmpleado", path)
            },

            toOrderDetails: function(evento){
                var orderID = evento.getSource().getBindingContext("odataNorthwind").getObject().OrderID
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
                oRouter.navTo("RouteOrderDetails", {
                    OrderID: orderID
                })
            }
        });
    });
