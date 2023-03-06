$(function(){
    //cojo todos los festivos
    var festivos=cogeFestivos();
    //cojo todas las reservas
    var reservas=cogeReservas();
    //cojo todas las mesas
    var mesas= cogeMesas();
    //cojo todos los juegos
    var allJuegos= cogeJuegos();
    // var disposiciones= cogeDisposiciones();
    var formu=$("#form_reserva")
    var tramo=$("#tramo");
    var jugadores=$("#jugadores");
    var juegos=$("#juegos");
    var inputMesa=$("#idMesa");
    var mesa = $(".mesa");
    var boton =$("#reserva")
    var errorHora=$("#errorHora");
    var errorFecha=$("#errorFecha");
    var errorJugadores=$("#errorJugadores");
    var errorJuego=$("#errorJuegos");
    var errorMesa=$("#errorMesa");
    var mesasdia=[];

    //desabilito todos los input menos el de la fecha
    inputMesa.prop('disabled', true);
    inputMesa[0].style.backgroundColor="e9ecef";
    tramo.prop('disabled', true);
    tramo[0].style.backgroundColor="e9ecef";
    jugadores.prop('disabled', true);
    jugadores[0].style.backgroundColor="e9ecef";
    juegos.prop('disabled', true);
    juegos[0].style.backgroundColor="e9ecef";

    //funcion que desabilita los dias festivos en el calendario
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
        //cuando selecciono la fecha
        onSelect: function(text, obj){

            var dia= text.split("/")[0];
            var mes= text.split("/")[1];
            var anio= text.split("/")[2];
            var fechaDisposicion= dia+"-"+mes+"-"+anio;
            disposicionesDia=[];
            //cogemos la disposicion de esa fecha selecionada
            var disposicion= cogeDisposicion(fechaDisposicion);
            
            if(disposicion.length>0){
                for (let i = 0; i < disposicion.length; i++) {
                    disposicionesDia.push(disposicion[i]);
                }
            }
            
            //si hay disposicion pintamos la mesa y si no pintamos la disposicion base
            if(disposicionesDia.length>0){
                mesasdia = disposicionToMesa(disposicionesDia);
                pintaMesas(mesasdia);
            }
            else{
                pintaDisposicionBaseNoDraggable(mesas);
            }
            //habilitamos el tramo
            tramo.prop('disabled', false)
            tramo[0].style.backgroundColor="white";

            //cuando el tramo cambia cogemos las reservas
            //y las mesas para comparar y modificar las que estan reservadas
            tramo.change(function(ev){
                var mesas= $(".sala .mesa");
                var inicio=this.value.split(" ")[0];
                //cogenmos el tramo para obtener el id de ese tramo
                var tramo=cogeTramoBYInicio(inicio);

                //pintamos todas las mesas como estaban de inicio,por
                //si alguna estaba reservada y hemos cambiado el tramo y
                //ahora no lo esta
                $.each(mesas, function(index, mesaSala) {
                    mesaSala.style.opacity = "1";
                    mesaSala.innerHTML = "";
                    mesaSala.style.pointerEvents = "auto";
                })
                // ev.preventDefault();
                //hacemos un bucle para comprobar si para ese horario y esas mesas hay alguna reserva,
                //si lo hay modificamos la mesa que esta reservada
                $.each(reservas, function(index, reserva) {
                    console.log(reserva)
                    $.each(mesas, function(index, mesaSala) {
                        
                        if ((reserva.idMesa==mesaSala.id.split("_")[1]) && (reserva.idTramo==tramo[0]) && (reserva.fecha_anulacion=="") && (reserva.fecha==fechaDisposicion )) {
                            mesaSala.style.opacity = "0.7";
                            mesaSala.style.textAlign = "center";
                            mesaSala.style.color = "black";
                            mesaSala.style.fontSize = "1.5m";
                            mesaSala.style.verticalAlign = "middle";
                            mesaSala.innerHTML = "RESERVADA";
                            mesaSala.style.pointerEvents = "none";
                        }
                    });

                });
                //clicamos sobre la mesa para seleccionarla
                mesas.click(function(){
                    inputMesa[0].value=this.id;
                })
                
            })

            //si el numero de los jugadores cambia, modificamos los juegos
            jugadores.change(function(ev){
                ev.preventDefault();
                //borramos todos los juegos menos el primero
                $("#juegos option:not(:first)").remove();
                juegos.prop('disabled', false);
                juegos[0].style.backgroundColor="white";
  
                $.each( allJuegos, function( key, juego ) 
                {
                    if((juego.jugadores_min<=jugadores.val()) && (juego.jugadores_max>=jugadores.val()))
                    {

                        juegos.append($("<option>", {
                            value: juego.nombre,
                            text: juego.nombre
                        }));
                    }
                });
            });
            jugadores.prop('disabled', false)

        
        }
    });


    boton.click(function(ev){
        
        ev.preventDefault();
        console.log(reservas);
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

        for (let i = 0; i < reservas.length; i++) {
            if(reservas[i].idMesa==formu[0].idMesa.value && reservas[i].fecha==formu[0].desde.value){
                numError.push(6);
            }
        }

        console.log(numError)
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
                        window.location.href = "http://localhost:8000/verReservas";
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

    })


})