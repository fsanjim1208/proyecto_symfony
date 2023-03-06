$(function(){   
    var reservas=cogeReservasUsuario();
    var tabla=$('#verReservas');
   
    tabla.DataTable({
        language: {
            "decimal": "",
            "emptyTable": "Todavia no has realizado ninguna reserva",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        data : (reservas),
        columns: [
            { data: 'fecha' },
            { data: 'idTramo' },
            { data: 'idJuego' },
            { data: 'idMesa' },
            { data: 'presentado' },
            { data: 'cancelar' },
        ]
    
    });     
    HTMLTableRowElement.prototype.eliminar=function(){
        this.parentElement.removeChild(this);
    }
    var cancelar=$('.cancelar');
    cancelar.click(function(ev){
        var id=this.id;
        var pulsado=this;
        var plantilla=`
                <div>
                    <p>¿Está seguro que desea cancelar su reserva?</p>
                </div>`;

            jqPlantilla=$(plantilla);

            jqPlantilla.dialog({
                title: "Cancelar reserva",
                height: 200,
                width: 300,
                modal: true,
                buttons: {
                    "Cancelar": function() {
                        var hoy= new Date();
                        $.ajax( "http://localhost:8000/api/cancelarReserva/"+id,  
                        {
                            method:"PUT",
                            dataType:"json",
                            crossDomain: true,
                            data:{
                                "fecha" : hoy, 
                            },
                        })
                        pulsado.parentElement.innerHTML='<label class="text-danger">Ya está cancelada</label>';
                        jqPlantilla.dialog( "close" );
                        
                    },
                    "Salir": function() {
                    jqPlantilla.dialog( "close" );
                    },
                },
                close: function() {
                    jqPlantilla.dialog( "close" );
                },
            });
        
    })



})



function cogeReservas() {
    var reservas = [];
    $.ajax("http://localhost:8000/api/reserva",
        {
            method: "GET",
            dataType: "json",
            crossDomain: true,
            async: false,

        }).done(function (data) {

            $.each(data, function (key, val) {
                console.log(val)
                if(val.presentado){
                    // val.validado='<img src="img/true.png" class="icono" data-valido="true" id="mensaje_"'+val.id+'>'
                    val.presentado='<label class="text-success">Si</label>';
                }else{
                    // val.validado='<img src="img/false.png" class="icono" data-valido="false" id="mensaje_"'+val.id+'>'
                    val.presentado='<label class="text-danger">No</label>';
                }
                
                reservas.push(val);
            })

        });
    return reservas;
}

function cogeReservasUsuario() {
    var reservas = [];
    var hoy = new Date(); 
    var diaReserva="";
    var mesReserva="";
    var añoReserva="";

    $.ajax("http://localhost:8000/api/reserva2",
        {
            method: "GET",
            dataType: "json",
            crossDomain: true,
            async: false,

        }).done(function (data) {
            console.log(data)
            $.each(data, function (key, val) {

                diaReserva=val.fecha.split("-")[0];
                mesReserva=val.fecha.split("-")[1];
                añoReserva=val.fecha.split("-")[2];
               
                var fecha= new Date(mesReserva+"/"+diaReserva+"/"+añoReserva)
       
                if(hoy>fecha){
                    val.cancelar='<label class="text-danger">No se puede cancelar</label>';
                }
                else{
                    val.cancelar='<button class="btn btn-danger cancelar" id="'+val.id+'">Cancelar</button>';
                }

                if( val.fecha_anulacion!=""){
                    val.cancelar='<label class="text-danger">Ya está cancelada</label>';
                }
                


                // val.cancelar='<button class="btn btn-danger" id="cancelar">Cancelar</button>';
                if(val.presentado){
                    // val.validado='<img src="img/true.png" class="icono" data-valido="true" id="mensaje_"'+val.id+'>'
                    val.presentado='<label class="text-success">Si</label>';
                }else{
                    // val.validado='<img src="img/false.png" class="icono" data-valido="false" id="mensaje_"'+val.id+'>'
                    val.presentado='<label class="text-danger">No</label>';
                }
                
                reservas.push(val);
            })

        });
    return reservas;
}