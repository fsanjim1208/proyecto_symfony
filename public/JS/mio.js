$(function(){
    var almacen= $(".almacen");
    var sala= $(".sala");
    var mesas=$(".mesa");
    //ajax para traer todas las mesas
    pintaMesas();

    almacen.droppable({
        //cuando suelto algo sobre el almacen hago que sea hijo de el
        drop:function(ev,ui ){
            var mesa= ui.draggable;
            mesa.css({"top":0,"left":0})
            $(this).append(mesa)
        }
    });

    sala.droppable({
        //cuando suelto algo sobre la sala hago que sea hijo de ella
        drop:function(ev,ui ){
            
            var mesa= ui.draggable;
            // console.log(mesa.attr);
            mesa.css({
                    "top":ui.offset.top,
                    "left":ui.offset.left});
            $(this).append(mesa);
            
            // console.log(ui.draggable[0].id)
            //tambien actualizo sus coordenadas ya que al estar en la sala ya debe estar 
            //colocada con sus coordenadas
            // console.log("eo");
            //console.log(ui.draggable);
            //console.log(event.target)
            $.ajax( "http://localhost:8000/api/mesa/"+mesa[0].id.split("_")[1],  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "x" : parseInt(ui.offset.top), 
                    "y" : parseInt(ui.offset.left), 
                    "ancho":parseInt(event.target.style.width.split("p")[0]),
                    "alto":parseInt(event.target.style.height.split("p")[0])},
            })

        },
    });

    
})