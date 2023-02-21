$(function(){
    console.log("ww");

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
            
        }
    });

    $(".almacen").droppable({
        accept: ".mesa",
        drop: function( event, ui ) {
            var mesa= ui.draggable;
            mesa.css({"top":0,"left":0})
            $(this).append(mesa)
            
        }
    });



})
