$(function(){   
    var festivos=[];
    var formu=$("#form_reserva")
    var tramo=$("#tramo");
    var jugadores=$("#jugadores");
    var juegos=$("#juegos");
    var inputMesa=$("#idMesa")
    var mesa = $(".mesa")
    var boton =$("#reserva")
    var errorHora=$("#errorHora");
    var errorFecha=$("#errorFecha");
    var errorJugadores=$("#errorJugadores");
    var errorJuego=$("#errorJuegos");
    var errorMesa=$("#errorMesa");

    inputMesa.prop('disabled', true)
    tramo.prop('disabled', true)
    jugadores.prop('disabled', true)
    juegos.prop('disabled', true)

    $.ajax( "http://localhost:8000/api/festivo",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            festivos.push(jsonToDate(val));
        });
        
    })

    function deshabilitaFechas(date) {
        var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
        return [festivos.indexOf(string) == -1];
    }

    // console.log(festivos);
    $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
    $("#desde").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: "+ 1D", 
        maxDate: "+ 3M +1D",
        firstDay:1,
        beforeShowDay: deshabilitaFechas,
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        onSelect: function(text, obj){
            tramo.prop('disabled', false)
            jugadores.prop('disabled', false)
        }
    });

    jugadores.change(function(ev){
        ev.preventDefault();
        juegos.empty();
        juegos.prop('disabled', false);
        $.ajax( "http://localhost:8000/api/juego",  
        {
            method:"GET",
            dataType:"json",
            crossDomain: true,
        }
        ).done(function(data){
            juegos.empty();
            $.each( data, function( key, val ) {
                console.log(juegos[0].length);
                if(val.jugadores_min<=jugadores.val() && val.jugadores_max>=jugadores.val()){
                    $("#sinjuegos"). css("display", "none");
                    juegos.append($("<option>", {
                        
                        value: val.nombre,
                        text: val.nombre
                    }));
                }
                if(juegos[0].length==0){
                    juegos.empty();
                    juegos.append($("<option id='sinjuegos'>", {
                        value: "Sin juegos",
                        text: "No hay juegos disponibles"
                    }));
                }      
            });
        })
    });
    
    mesa.click(function(){
        formu[0].idMesa.value=this.id;
        // this.style.backgroundColor = '#FF00FF';
    })
    
    
    // console.log(tramo);

    boton.click(function(ev){
        ev.preventDefault();
        var numError = [];
        if (formu[0].desde.value=="")
        {
            errorFecha.text("Debe seleccionar una fecha");
            numError.push(1);
        }
        else{
            errorFecha.text("");
        }
        if (formu[0].tramo.value=="Seleccione un tamo horario"){
            errorHora.text("Debe seleccionar un tramo horario");
            numError.push(2);
        }
        else{
            errorHora.text("");
        }

        if (formu[0].jugadores.value==""){
            errorJugadores.text("Debe introducir el numero de jugadores");
            numError.push(3);
        }
        else{
            errorJugadores.text("");
        }
        if ((formu[0].juegos.value=="Seleccione un juego") || (formu[0].juegos.value=="")){
            errorJuego.text("Debe seleccionar un juego");
            numError.push(4);
        }
        else{
            errorJuego.text("");
        }
        if (formu[0].idMesa.value==""){
            errorMesa.text("Clica sobre la mesa para seleccionarla");
            numError.push(5);
        }
        else{
            errorMesa.text("");
        }


        if(numError.length==0){

            var plantilla=`
                <div>
                    <h5>Dia: `+formu[0].desde.value+`</h5>
                    <h5>Hora: `+formu[0].tramo.value+`</h5>
                    <h5>para: `+formu[0].jugadores.value+` jugadores</h5>
                    <h5>juego: `+formu[0].juegos.value+`</h5>
                </div>`;

            jqPlantilla=$(plantilla);

            jqPlantilla.dialog({
                title: "¿Completar reserva?",
                height: 280,
                width: 400,
                modal: true,
                buttons: {
                    "Reservar mesa": function() {
                        $.ajax( "http://localhost:8000/api/reserva",  
                        {
                            method:"POST",
                            dataType:"json",
                            crossDomain: true,
                            data: {
                                "fecha" : formu[0].desde.value, 
                                "tramo" : formu[0].tramo.value, 
                                "juego": formu[0].juegos.value,
                                "jugadores": formu[0].jugadores.value,
                                "mesa": formu[0].idMesa.value,
                            },
                        })
                        jqPlantilla.dialog( "close" );
                    
                    },
                    Cancel: function() {
                    jqPlantilla.dialog( "close" );
                    },
                },
                close: function() {
                    jqPlantilla.dialog( "close" );
                },
            });
        }
        else{
            alert("no reservda")
        }





    })

function jsonToDate(json){
    var day="";
    var month="";
    if(json.day<10){
        day="0"+json.day;
    }
    else{
        day=json.day;
    }

    if(json.month<10){
        month="0"+json.month;
    }
    else{
        month=json.month;
    }
    return day+"/"+month+"/"+json.year;
}
    









})