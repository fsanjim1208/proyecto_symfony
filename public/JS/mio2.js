$(function(){
    pintaMesas();

    // //MESA DRAGABLE
    $(".mesa").draggable({
        start: function(ev, ui){
            $(this).attr("data-x",ui.offset.left);
            $(this).attr("data-y",ui.offset.top);
        },
        revert: true,
        helper:'clone',
        revertDuration: 0,
    });

    $(".sala").droppable({
        accept: ".mesa",
        drop: function( event, ui ) {
            var mesa= ui.draggable;
            mesa.css({"top":ui.offset.top+'px',"left":ui.offset.left+'px'});
            $(this).append(mesa);
            $.ajax( "http://localhost:8000/api/mesa/"+mesa[0].id.split("_")[1],  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "x" : ui.offset.top, 
                    "y" : ui.offset.left, 
                    "ancho":mesa[0].offsetWidth,
                    "alto":mesa[0].offsetHeight
                },
            })
        }
    });

    $(".almacen").droppable({
        accept: ".mesa",
        drop: function( event, ui ) {
            var mesa= ui.draggable;
            mesa.css({"top":0,"left":0})
            $(this).append(mesa)
            $.ajax( "http://localhost:8000/api/mesa/"+mesa[0].id.split("_")[1],  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "x" : 0, 
                    "y" : 0, 
                    "ancho":mesa[0].offsetWidth,
                    "alto":mesa[0].offsetHeight
                },
            })
        }
    });



})
