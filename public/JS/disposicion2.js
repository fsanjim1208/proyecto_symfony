$(function(){
    var spinner=$("#spinner");
    var mesas=cogeMesas();
    var festivos=cogeFestivos();
    var disposiciones= cogeDisposiciones();
    var botonDisposicion=$("#GuardaDistribuicion");
    var fecha=$("#fecha");
    var input= "base";
    fecha.prop('disabled', true);

    configureLoadingScreen(spinner);
    
    pintaDisposicionBase(mesas);

    function deshabilitaFechas(date) {
        var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
        return [festivos.indexOf(string) == -1];
    }
    
    var mesasdia=[];
    // console.log(festivos);
    $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
    fecha.datepicker({
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
            for (let i = 0; i < disposiciones.length; i++) {
                if(disposiciones[i].fecha == fechaDisposicion){
                    disposicionesDia.push(disposiciones[i]);
                }
            }
            if(disposicionesDia.length>0){
                mesasdia = disposicionToMesa(disposicionesDia);
                pintaMesasDraggables(mesasdia);
                pintaMesasAlmacenDraggables(mesas, mesasdia);
            }
            else{
                pintaDisposicionBase(mesas);
            }
        }
    });

    $("input[name=disposicion]").click(function () {    
        if($(this).val()=="Personalizada"){
            fecha.prop('disabled', false);
            input="personalizada";
        }

        if($(this).val()=="Base"){
            fecha.prop('disabled', true);
            fecha.val("");
            pintaDisposicionBase(mesas);
            // pintaMesasAlmacenDraggables(mesas);
            input="base";
        }
    });


    botonDisposicion.click(function(){
        var mesasSala=$(".sala .mesa")
        console.log(mesasSala)
        if(input=="base"){
            console.log("3ee")
            for (let i = 0; i < mesasSala.length; i++) {
                console.log(mesasSala[i]);
                
                $.ajax("http://localhost:8000/api/disposicion2/"+mesasSala[i].id.split("_")[1]+"/00-00-0000",
                {
                    method: "PUT",
                    dataType: "json",
                    crossDomain: true,
                    data: {
                        "X": parseInt(mesasSala[i].style.top),
                        "Y": parseInt(mesasSala[i].style.left),
                    },
                }).done(function (data) {
                    console.log(data)
                    if(data=="No hay disposiciones"){
                        
                        console.log(mesasSala[i])
                        $.ajax("http://localhost:8000/api/disposicion",
                        {
                            method: "POST",
                            dataType: "json",
                            crossDomain: true,
                            data: {
                                "mesa": mesasSala[i].id, 
                                "fecha" : "00-00-0000",
                                "X": parseInt(mesasSala[i].style.top),
                                "Y": parseInt(mesasSala[i].style.left),
                            },
                        })
                    }
                });
            }
            var disposicionBase=cogeDisposicionBase();
            var esta=0;
            $.each(disposicionBase, function(index, disposicion) {
                esta=0;
                $.each(mesasSala, function(index, mesaSala) {
                    if (disposicion.idMesa==mesaSala.id.split("_")[1]) {
                        return false; // termina el ciclo
                    }
                    else{
                        esta=esta+1
                    }
                });
                
                if (esta==mesasSala.length){
                    $.ajax("http://localhost:8000/api/disposicion/"+disposicion.id,
                    {
                        method: "DELETE",
                        dataType: "json",
                        crossDomain: true,
                    })
                }
            });
        }
        else if(input=="personalizada"){
        var errorFecha=$(".errorFecha")[0];
            if (fecha[0].value==""){
                errorFecha.innerHTML="Introduce una fecha valida";
            }
            else{
                errorFecha.innerHTML="";
                for (let i = 0; i < mesasSala.length; i++) {
                    // console.log(mesasSala[i]);
                    var dia= fecha[0].value.split("/")[0];
                    var mes= fecha[0].value.split("/")[1];
                    var anio= fecha[0].value.split("/")[2];
                    var fechaDisposicion= dia+"-"+mes+"-"+anio;
                    $.ajax("http://localhost:8000/api/disposicion2/"+mesasSala[i].id.split("_")[1]+"/"+fechaDisposicion,
                    {
                        method: "PUT",
                        dataType: "json",
                        crossDomain: true,
                        data: {
                            "X": parseInt(mesasSala[i].style.top),
                            "Y": parseInt(mesasSala[i].style.left),
                        },
            
                    }).done(function (data) {
                        if(data=="No hay disposiciones"){
                            console.log(mesasSala[i])
                            $.ajax("http://localhost:8000/api/disposicion",
                            {
                                method: "POST",
                                dataType: "json",
                                crossDomain: true,
                                data: {
                                    "mesa": mesasSala[i].id, 
                                    "fecha" : fechaDisposicion,
                                    "X": parseInt(mesasSala[i].style.top),
                                    "Y": parseInt(mesasSala[i].style.left),
                                },
                            })
                        }
                    });
                }
                var disposicionDia=cogeDisposicion(fechaDisposicion);
                var esta=0;
                $.each(disposicionDia, function(index, disposicion) {
                    esta=0;
                    $.each(mesasSala, function(index, mesaSala) {
                        if (disposicion.idMesa==mesaSala.id.split("_")[1]) {
                            return false; // termina el ciclo
                        }
                        else{
                            esta=esta+1
                        }
                    });
                    if (esta==mesasSala.length){
                        $.ajax("http://localhost:8000/api/disposicion/"+disposicion.id,
                        {
                            method: "DELETE",
                            dataType: "json",
                            crossDomain: true,
                        })
                    }
                });
            }
        }
    })
})

//todas las funciones necesarias para la disposicion
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


function cogeFestivos(){
    festivos=[];
    $.ajax( "http://localhost:8000/api/festivo",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            festivos.push(jsonToDate(val));
        });
        
    })
    return festivos;
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

function cogeDisposiciones() {
    var disposicion=[];
    $.ajax( "http://localhost:8000/api/disposicion",  
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

function configureLoadingScreen(screen) {
    $(document).ajaxStart(function() {
        screen.removeClass("d-none");
        
    });
      
    $(document).ajaxStop(function() {
        screen.addClass("d-none");
    });
}