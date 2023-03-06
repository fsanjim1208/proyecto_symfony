$(function(){
    var festivos=cogeFestivos();
    var reservas=cogeReservas();
    var mesas= cogeMesas();
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
    inputMesa.prop('disabled', true);
    inputMesa[0].style.backgroundColor="e9ecef";
    tramo.prop('disabled', true);
    tramo[0].style.backgroundColor="e9ecef";
    jugadores.prop('disabled', true);
    jugadores[0].style.backgroundColor="e9ecef";
    juegos.prop('disabled', true);
    juegos[0].style.backgroundColor="e9ecef";


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
            var dia= text.split("/")[0];
            var mes= text.split("/")[1];
            var anio= text.split("/")[2];
            var fechaDisposicion= dia+"-"+mes+"-"+anio;
            disposicionesDia=[];
            var disposicion= cogeDisposicion(fechaDisposicion);
            if(disposicion.length>0){
                for (let i = 0; i < disposicion.length; i++) {
                    disposicionesDia.push(disposicion[i]);
                }
            }
            
            if(disposicionesDia.length>0){
                mesasdia = disposicionToMesa(disposicionesDia);
                pintaMesas(mesasdia);
            }
            else{
                pintaDisposicionBaseNoDraggable(mesas);
            }

            tramo.prop('disabled', false)
            tramo[0].style.backgroundColor="white";
            
            tramo.change(function(ev){
                var mesas= $(".sala .mesa");
                var inicio=this.value.split(" ")[0];

                var tramo=cogeTramoBYInicio(inicio);

                $.each(mesas, function(index, mesaSala) {
                    mesaSala.style.opacity = "1";
                    mesaSala.innerHTML = "";
                    mesaSala.style.pointerEvents = "auto";
                })
                // ev.preventDefault();
                $.each(reservas, function(index, reserva) {

                    $.each(mesas, function(index, mesaSala) {
                        
                        if ((reserva.idMesa==mesaSala.id.split("_")[1]) && (reserva.idTramo==tramo[0])) {
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

                mesas.click(function(){
                    inputMesa[0].value=this.id;
                })
                
            })

            jugadores.change(function(ev){
                ev.preventDefault();
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
            var dia= text.split("/")[0];
            var mes= text.split("/")[1];
            var anio= text.split("/")[2];

        
        }
    });


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
function cogeMesas() {
    var mesasArray = [];
    $.ajax("http://localhost:8000/api/mesa",
        {
            method: "GET",
            dataType: "json",
            crossDomain: true,
            async: false,

        }).done(function (data) {

            $.each(data, function (key, val) {
                var mesaOrigen = new Mesa(val);
                mesasArray.push(mesaOrigen);

            })

        });
    return mesasArray;
}

function cogeFestivos(){
    var festivos=[];
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
        
    });
    return festivos
}
function cogeJuegos(){
    var juegos=[];
    $.ajax( "http://localhost:8000/api/juego",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            juegos.push(val);
        });
        
    });
    return juegos
}

function cogeReservas() {
    var reservas=[];
    $.ajax( "http://localhost:8000/api/reserva",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            reservas.push(val);
        });
    });
    return reservas;
}

function cogeTramoBYInicio(inicio) {
    var tramo=[];
    $.ajax( "http://localhost:8000/api/tramo/"+inicio,  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            tramo.push(val);
        });
    });
    return tramo;
}

function cogeDisposicionBase(){
    var disposicionBase=[];
    $.ajax( "http://localhost:8000/api/disposicion/00-00-0000",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            disposicionBase.push(val);
        });
    })
    return disposicionBase;
}

function cogeDisposicion(fecha){
    var disposicion=[];
    $.ajax( "http://localhost:8000/api/disposicion/"+fecha,  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            disposicion.push(val);
        });
    })
    return disposicion;
}

function pintaDisposicionBase(mesas){
    var disposicionBase=cogeDisposicionBase();
    var mesasBase=[];
    mesasBase=disposicionToMesa(disposicionBase)
    pintaMesasDraggables(mesasBase);
    pintaMesasAlmacenDraggables(mesas, mesasBase);
}

function pintaMesasDraggables(mesas) {
    var almacen = $(".almacen");
    var sala = $(".sala");
    var arrayMesas = mesas;

    var mesasAlmacen=$(".almacen .mesa")
    mesasAlmacen.remove();
    var mesasSala=$(".sala .mesa")
    mesasSala.remove();


    $.each(arrayMesas, function (key, val) {
        if (val.y === 0 && val.x === 0) {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            almacen.append(mesa);
        }
        //si las coordenadas son distintas de 0 las meto dentro de la sala
        else {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            mesa.css('top', val.x);
            mesa.css('left', val.y);
            sala.append(mesa);
        }

        $(".sala .mesa").draggable({  
            // revert: true,
            // accept: ".sala, .almacen",
            // helper: "clone",              
            revert: true,
            helper: 'clone',
            revertDuration: 0,
            start: function(ev,ui){
                ui.helper.attr("id",ui.helper.prevObject.attr("id").split("_")[1]);
            }
        });
    })
}


function pintaDisposicionBaseNoDraggable(){
    var disposicionBase=[];
    var mesasBase=[];
    $.ajax( "http://localhost:8000/api/disposicion/00-00-0000",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            disposicionBase.push(val);
        });
    })
    console.log(disposicionBase)
    mesasBase=disposicionToMesa(disposicionBase)
    pintaMesas(mesasBase);
}

function pintaMesas(mesas) {
    var almacen = $(".almacen");
    var sala = $(".sala");
    var arrayMesas = mesas;

    var mesasAlmacen=$(".almacen .mesa")
    mesasAlmacen.remove();
    var mesasSala=$(".sala .mesa")
    mesasSala.remove();


    $.each(arrayMesas, function (key, val) {
        if (val.y === 0 && val.x === 0) {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            almacen.append(mesa);
        }
        //si las coordenadas son distintas de 0 las meto dentro de la sala
        else {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            mesa.css('top', val.x);
            mesa.css('left', val.y);
            sala.append(mesa);
        }
    })
}

function pintaMesasAlmacenDraggables(mesas, mesasPintadas) {
    var almacen = $(".almacen");
    var mesasAlmacen=$(".almacen .mesa")
    mesasAlmacen.remove();
    var mesasPintar=[];


    var Noesta=0;
    $.each(mesas, function(index, mesa) {
        Noesta=0;
        $.each(mesasPintadas, function(index, mesaPintada) {
            if (mesa.id==mesaPintada.id) {
                return false; // termina el ciclo
            }
            else{
                Noesta=Noesta+1
            }
        });
        if (Noesta==mesasPintadas.length){
           mesasPintar.push(mesa) 
        }
        
    });
    
    
    $.each(mesasPintar, function (key, val) {
        
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            almacen.append(mesa);
        
    });

    $(".almacen .mesa").draggable({
        revert: true,
        helper: 'clone',
        revertDuration: 0,
        start: function(ev,ui){
            ui.helper.attr("id",ui.helper.prevObject.attr("id").split("_")[1]);
        }
    })
}

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

function disposicionToMesa(disposicionBase){
    var mesas=[];
    for (let i = 0; i < disposicionBase.length; i++) {
        
        $.ajax( "http://localhost:8000/api/mesa/"+disposicionBase[i].idMesa,  
        {
            method:"GET",
            dataType:"json",
            crossDomain: true,
            async: false
        }
        ).done(function(data){
            $.each( data, function( key, val ) {
                val.x=disposicionBase[i].X;
                val.y=disposicionBase[i].Y
                var mesa=new Mesa(val)
                mesas.push(mesa);
            });
        })
    }
    return mesas;
}