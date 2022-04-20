

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "mikelazqueta/mikelazqueta/model/formatter"

], function(Controller, formatter){
   

        function onInit(){

        };
/*         crearIncidencia: function(){
            var tableIncidence = this.getView().byId("tableIncidence");
            var nuevaIncidencia = sap.ui.xmlfragment("mikelazqueta.mikelazqueta.fragment.NewIncidence", this)
            var incidenceModel = this.getView().getModel("incidenceModel");
            var data = incidenceModel.getData();
            var index = data.length
            data.push({index: index + 1});
            incidenceModel.refresh()
            nuevaIncidencia.bindElement("incidenceModel>/" + index)
            tableIncidence.addContent(nuevaIncidencia)
        
        } */

        function crearIncidencia(){
            var tableIncidence = this.getView().byId("tableIncidence");
            var newIncidence = sap.ui.xmlfragment("mikelazqueta.mikelazqueta.fragment.NewIncidence", this)
            var incidenceModel = this.getView().getModel("incidenceModel");
            var odata = incidenceModel.getData();
            var index = odata.length
            odata.push({ index : index + 1 });
            
            newIncidence.bindElement("incidenceModel>/" + index);
            tableIncidence.addContent(newIncidence)
           

        };

        function borrarIncidencia(ev){
            var tablaDeIncidencias = this.getView().byId('tableIncidence')
            var filaDeIncidencias = ev.getSource().getParent().getParent()
            var incidenceModel = this.getView().getModel("incidenceModel");
            var data = incidenceModel.getData()
            var contextObjeto = filaDeIncidencias.getBindingContext("incidenceModel")

            data.splice(data.index-1,1)
            for(var i in data){
                data[i].index = parseInt(i) + 1
            }
            incidenceModel.refresh()
            tablaDeIncidencias.removeContent(filaDeIncidencias)

            for(var j in tablaDeIncidencias.getContent()){
                tablaDeIncidencias.getContent()[j].bindElement("incidenceModel>/"+j)
            }

        };

        var EmployeeDetails = Controller.extend("mikelazqueta.mikelazqueta.controller.EmployeeDetails",{});
        EmployeeDetails.prototype.onInit = onInit
        EmployeeDetails.prototype.crearIncidencia = crearIncidencia
        EmployeeDetails.prototype.Formatter = formatter
        EmployeeDetails.prototype.borrarIncidencia = borrarIncidencia

        return EmployeeDetails
    });

