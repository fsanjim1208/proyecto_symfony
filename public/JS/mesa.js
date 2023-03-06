//para crear el objeto mesa
function Mesa(json) {
    this.id= json.id;
    this.x = json.x;
    this.y = json.y;
    this.ancho = json.ancho;
    this.alto = json.alto;
}




    //metodo para comprobar si una mesa choca con otra
    Mesa.prototype.solapa= function(mesaChoca){
        //mesa es la mesa aque esta arrastrando
        var mesa= this;
        // var mesasArray= cogeMesas();

        //propiedades de la mesa que novemos
        let MMTop= mesa.x;
        let MMBotton=mesa.x + mesa.alto;      
        let MMLeft= mesa.y;
        let MMRight= mesa.y + mesa.ancho;
        
        //propiedades de la mesa que comparamos
        let MCTop= parseInt(mesaChoca.offsetTop);
        let MCBotton= MCTop + mesaChoca.offsetHeight;      
        let MCLeft= parseInt(mesaChoca.offsetLeft);
        let MCRight= MCLeft + mesaChoca.offsetWidth;
            // console.log(mesa.id != mesasArray[i].id);
    
        if (mesa.id != mesaChoca.id && MCTop>0 && MCLeft>0){
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
                return true;
            }
            else{
                return false;
            }
        }
    }
    

