
function Mesa(json) {
    this.id= json.id;
    this.x = json.x;
    this.y = json.y;
    this.ancho = json.ancho;
    this.alto = json.alto;
}

function cogeMesas(){
    var mesasArray=[];
    $.ajax( "http://localhost:8000/api/mesa",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async:false,
    }).done(function(data)
    {

        $.each( data, function( key, val ) {
            var mesaOrigen = new Mesa(val);
            mesasArray.push(mesaOrigen);
        })
        
    });
    return mesasArray;
}


function pintaMesas(){
    var almacen= $(".almacen");
    var sala= $(".sala");
    var mesas=[];
    $.ajax( "http://localhost:8000/api/mesa",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }
    ).done(function(data){
        //console.log(data);
        // almacen.empty();
        // sala.empty();
        $.each( data, function( key, val ) {
            //si las coordenadas son x=0 e y=0 las meto dentro del almacen
            if (val.y===0 && val.x===0) {
            
                var mesa=$("<div>");
                mesa.attr("id","mesa_"+val.id);
                mesa.attr("class","mesa");
                mesa.css('width', val.ancho);
                mesa.css('height', val.alto);
                almacen.append(mesa);
            }
            //si las coordenadas son distintas de 0 las meto dentro de la sala
            else{
                var mesa=$("<div>");
                mesa.attr("id","mesa_"+val.id);
                mesa.attr("class","mesa");
                mesa.css('width', val.ancho);
                mesa.css('height', val.alto);
                mesa.css('top', val.x);
                mesa.css('left', val.y);
                sala.append(mesa);
            }
            var mesaOrigen = new Mesa(val);
            mesas.push(mesaOrigen);
        })
        $(".almacen .mesa").draggable({
            revert: true,
            helper: "clone", 
            revertDuration:0,
        })
    
        $(".sala .mesa").draggable({  
            // revert: true,
            // accept: ".sala, .almacen",
            // helper: "clone",              
            stop: function(ev, ui){
                // console.log(parseInt(this.style.top));
                //console.log("eoo "+ui.helper.prevObject);
                var mesa = new Mesa({
                    "id": this.id.split("_")[1],
                    "x" : parseInt(this.style.top), 
                    "y" : parseInt(this.style.left), 
                    "ancho":parseInt(this.style.width),
                    "alto":parseInt(this.style.height)
                });
                // console.log(mesa);
                
                //mesa.solapa();
                $(this).append(mesa);
                    $.ajax( "http://localhost:8000/api/mesa/"+this.id.split("_")[1],  
                    {
                        method:"PUT",
                        dataType:"json",
                        crossDomain: true,
                        data: {
                            "x" : parseInt(this.style.top), 
                            "y" : parseInt(this.style.left), 
                            "ancho":parseInt(this.style.width),
                            "alto":parseInt(this.style.height)
                        },
                    })
                    
                if(mesa.solapa()){
                    
                }
                else{

                    // console.log(mesa);
                    // console.log(this)
                    // mesa.css({
                    //     "top":ui.offset.top,
                    //     "left":ui.offset.left});
                    
                    $(this).append(mesa);
                    $.ajax( "http://localhost:8000/api/mesa/"+this.id.split("_")[1],  
                    {
                        method:"PUT",
                        dataType:"json",
                        crossDomain: true,
                        data: {
                            "x" : parseInt(this.style.top), 
                            "y" : parseInt(this.style.left), 
                            "ancho":parseInt(this.style.width),
                            "alto":parseInt(this.style.height)
                        },
                    })
                }
            },
        });
    })
}


Mesa.prototype.solapa= function(){
    
//    debugger
    var mesa= this;
    var mesasArray= cogeMesas();
    var solapado=false;
 
    for (let i = 0; i < mesasArray.length; i++) {

        let MMTop= mesa.x;
        let MMBotton=mesa.x + mesa.alto;      
        let MMLeft= mesa.y;
        let MMRight= mesa.y + mesa.ancho;
        let MCTop= mesasArray[i].x;
        let MCBotton= mesasArray[i].x + mesasArray[i].alto;      
        let MCLeft= mesasArray[i].y;
        let MCRight= mesasArray[i].y + mesasArray[i].ancho;
        
        // console.log(mesa.id != mesasArray[i].id);

        if (mesa.id != mesasArray[i].id && MCTop>0 && MCLeft>0){
                //que el top y el left este dentro de la caja
            if(((MMTop> MCTop && MMTop < MCBotton) && (MMLeft > MCLeft && MMLeft < MCRight)) ||
                //que el top y el right esté dentro de la caja
                ((MMTop> MCTop && MMTop < MCBotton) && (MMRight > MCLeft && MMRight< MCRight)) ||
                //que el botton y el left esté dentro de la caja
                ((MMBotton > MCTop && MMBotton < MCBotton) && (MMLeft > MCLeft && MMLeft < MCRight))||
                //que el botton y el right esté dentro de la caja
                ((MMBotton > MCTop && MMBotton < MCBotton) && (MMRight > MCLeft && MMRight< MCRight)) ||
                //que la caja que muevo sea mas grande por todos los lados
                ((MMTop < MCTop && MMBotton > MCBotton) && (MMLeft < MCLeft && MMRight > MCRight)) ||
                //que solo el lado izquierdo este dentro de la caja
                ((MMTop < MCTop && MMBotton > MCBotton) && (MMLeft > MCLeft && MMLeft < MCRight)) ||
                //que solo el lado derecho este dentro de la caja
                ((MMTop < MCTop && MMBotton > MCBotton) && (MMRight > MCLeft && MMRight < MCRight)) ||
                //que solo el top este dentro de la caja
                ((MMTop > MCTop && MMTop < MCBotton) && (MMLeft < MCLeft && MMRight > MCRight)) ||
                //que solo el bottom este dentro de la caja
                ((MMBotton > MCTop && MMBotton < MCBotton) && (MMLeft < MCLeft && MMRight > MCRight)))
            {
                console.log("se choca");
                
                solapado= true;
                break;
            }
            else{
                solapado=false;
            }
        }
    }
    return solapado
    
    
}
