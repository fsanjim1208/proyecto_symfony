
function Mesa(json) {
    this.id= json.id;
    this.x = json.x;
    this.y = json.y;
    this.ancho = json.ancho;
    this.alto = json.alto;
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
            start: function(ev, ui){
                //console.log(ui);
            },
        })
    
        $(".sala .mesa").draggable({
            start: function(ev, ui){},
                
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
                console.log(mesa);
                
                mesa.solapa();
                // console.log(mesa.solapa());
    
                $.ajax( "http://localhost:8000/api/mesa/"+this.id.split("_")[1],  
                {
                    method:"PUT",
                    dataType:"json",
                    crossDomain: true,
                    data: {
                        "x" : parseInt(this.style.top), 
                        "y" : parseInt(this.style.left), 
                        "ancho":parseInt(this.style.width),
                        "alto":parseInt(this.style.height)},
                })
            },
        });
    })
}

Mesa.prototype.solapa= function(){
      
    // console.log("x "+this.x +" y "+this.y+" ancho " + this.ancho+ "  alto "+this.alto);
    // console.log("x "+mesasArray[1].x +" y "+mesasArray[1].y+" ancho " + mesasArray[1].ancho+ "  alto "+mesasArray[1].alto);
    var mesa= this;
    // console.log(this)
    var mesasArray=[];
    $.ajax( "http://localhost:8000/api/mesa",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }).done(function(data)
    {
        $.each( data, function( key, val ) {
            var mesaOrigen = new Mesa(val);
            mesasArray.push(mesaOrigen);
        })
       
        // console.log(mesasArray);
        for (let i = 0; i < mesasArray.length; i++) {

            
            let MMTop= mesa.x;
            let MMBotton=mesa.x + mesa.alto;      
            let MMLeft= mesa.y;
            let MMRight= mesa.y + mesa.ancho;
            let MCTop= mesasArray[i].x;
            let MCBotton= mesasArray[i].x + mesasArray[i].alto;      
            let MCLeft= mesasArray[i].y;
            let MCRight= mesasArray[i].y + mesasArray[i].ancho;
            

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
                   ((MMTop < MCTop && MMBotton > MCBotton) && (MMLeft < MCLeft && MMRight > MCRight)))
                {
                    console.log("se choca");
                }
                else{

                }
            }
        }
    });  
}
