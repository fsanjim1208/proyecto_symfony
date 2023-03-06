
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