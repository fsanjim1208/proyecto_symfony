$(function(){   
    var festivos=[];
    var tramo=$("#tramo");
    var jugadores=$("#jugadores");
    var juegos=$("#juegos");
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
    
    
    tramo.prop('disabled', true)
    jugadores.prop('disabled', true)
    juegos.prop('disabled', true)
    // console.log(tramo);


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