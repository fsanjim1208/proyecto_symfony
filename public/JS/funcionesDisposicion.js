function pintaDisposicionBase(mesas){
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
    pintaMesasDraggables(mesasBase);
    pintaMesasAlmacenDraggables(mesas);
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

function pintaDisposicionBaseNoDraggable(mesas){
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