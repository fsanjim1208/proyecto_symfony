
function Mesa(json) {
    this.id= json.id;
    this.x = json.x;
    this.y = json.y;
    this.ancho = json.ancho;
    this.alto = json.alto;
}


Mesa.prototype.solapa= function(){
      
    // console.log("x "+this.x +" y "+this.y+" ancho " + this.ancho+ "  alto "+this.alto);
    // console.log("x "+mesasArray[1].x +" y "+mesasArray[1].y+" ancho " + mesasArray[1].ancho+ "  alto "+mesasArray[1].alto);
    var mesa= this;
    var mesasArray=[];
    var solapado= false;
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
                //debugger;
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
                   
                    solapado= true;
                    break;
                }
                else{
                    solapado= false;
                }
            }
        }
    });  
    return solapado;
}
