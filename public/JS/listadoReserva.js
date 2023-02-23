$(function(){   
    reservas=cogeReservasUsuario();
    console.log(reservas)
    tabla=$('#verReservas');

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
            
        ]
    
    });


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
    $.ajax("http://localhost:8000/api/reserva2",
        {
            method: "GET",
            dataType: "json",
            crossDomain: true,
            async: false,

        }).done(function (data) {

            $.each(data, function (key, val) {
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