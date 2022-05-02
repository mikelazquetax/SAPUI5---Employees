

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "mikelazqueta/mikelazqueta/model/formatter"

], function(Controller, formatter){
   

        function onInit(){
            this._bus = sap.ui.getCore().getEventBus()
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


            var contextObject = ev.getSource().getBindingContext("incidenceModel").getObject()
            this._bus.publish("incidence", "borrarIncidencia", {
                IncidenceId: contextObject.IncidenceId,
                SapId: contextObject.SapId,
                EmployeeId : contextObject.EmployeeId
            })

        };

        function onSaveIncidence(evento){
            var filaDeIncidencias = evento.getSource().getParent().getParent();
            var incidenceRow = filaDeIncidencias.getBindingContext("incidenceModel");
            var temp = incidenceRow.sPath.replace('/', '')
            this._bus.publish("incidence", "onSaveIncidence",{ incidenceRow : incidenceRow.sPath.replace('/', '') })
        };

        function updateIncidenceCreationDate(evento){
            var context = evento.getSource().getBindingContext("incidenceModel")
            var contextObjeto = context.getObject() //objeto que contiene la incidencia que se actualiza
            contextObjeto.CreationDateX = true
        };

        function updateIncidenceReason(evento){
            var context = evento.getSource().getBindingContext("incidenceModel")
            var contextObjeto = context.getObject() //objeto que contiene la incidencia que se actualiza
            contextObjeto.ReasonX = true
        };

        function updateIncidenceType(evento){
            var context = evento.getSource().getBindingContext("incidenceModel")
            var contextObjeto = context.getObject() //objeto que contiene la incidencia que se actualiza
            contextObjeto.TypeX = true
        }

        var EmployeeDetails = Controller.extend("mikelazqueta.mikelazqueta.controller.EmployeeDetails",{});
        EmployeeDetails.prototype.onInit = onInit
        EmployeeDetails.prototype.crearIncidencia = crearIncidencia
        EmployeeDetails.prototype.Formatter = formatter
        EmployeeDetails.prototype.borrarIncidencia = borrarIncidencia
        EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence
        EmployeeDetails.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate
        EmployeeDetails.prototype.updateIncidenceReason = updateIncidenceReason
        EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType
        return EmployeeDetails
    });

