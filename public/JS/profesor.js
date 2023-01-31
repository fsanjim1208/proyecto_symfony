$(function(){
    var almacen= $(".almacen");
    $.ajax( "http://localhost:8000/api/mesa",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }
    ).done(function(data){
        console.log(data);
        var mesas=[];
        $.each( data, function( key, val ) {
            if (val.y===0 && val.x===0) {
                almacen= $(".almacen");
                console.log(almacen);
                var mesa=$("<div>");
                mesa.attr("id","mesa_"+val.id);
                mesa.attr("class","mesa");
                almacen.append(mesa);
            }


            var mesaOrigen = new Mesa(val);
            mesas.push(mesaOrigen);
        })
        console.log(mesas)
    })

    $(".mesa").draggable({
        start: function(ev, ui){
            //console.log(this);
            //console.log($(this).height());
            var sala= $(".sala");
            var difX=sala.offset().left;
            var difY=sala.offset().top;
            $(this).attr("data-y",ui.offset.top);
            $(this).attr("data-x",ui.offset.left);

            var mesaOrigen = new Mesa(ui.offset.left-difX, ui.offset.top-difY, $(this).width(), $(this).height());
            console.log(mesaOrigen);
        }, 
        revert:true,
        helper: "clone", 
        revertDuration:0,
    });
    $(".almacen").droppable({
        drop:function(ev,ui ){
            var mesa= ui.draggable;
            mesa.attr("style","");
            $(this).append(mesa)
        }
    });
    $(".sala").droppable({
        drop:function(ev, ui){
            var difX=$(this).offset().left;
            console.log(difX);
            var difY=$(this).offset().top;
            console.log(difY);
            var mesa = ui.draggable;

            var nuevoTop= (parseInt(ui.offset.top))-difY;
            var nuevoLeft= (parseInt(ui.offset.left))-difX;
            var anchuraNueva= parseInt(mesa.width());
            var alturaNueva= parseInt(mesa.height());
            var mesaDestino=new Mesa(nuevoLeft, nuevoTop, anchuraNueva, alturaNueva);     


            console.log(mesaDestino);      
            var pos1=[nuevoLeft, nuevoLeft+anchuraNueva,nuevoTop, nuevoTop+alturaNueva];

            var mesaDentro= $(".sala .mesa").eq(0);
            //console.log(mesaDentro);
            if (mesaDentro.length>0){
                var posX = parseInt(mesaDentro.offset().left);
                var posY = parseInt(mesaDentro.offset().top);
                var anchura = parseInt(mesaDentro.width());
                var altura = parseInt(mesaDentro.height());

                var pos2=[posX, posX + anchura , posY , posY + altura];
                //console.log(pos2);
                    if (((pos1[0]>pos2[0] && pos1[0]<pos2[1]) ||
                        (pos1[1]>pos2[0] && pos1[1]<pos2[1]) ||
                        (pos1[0]<=pos2[0] && pos1[1]>=pos2[1])) && 
                        ((pos1[2]>pos2[2] && pos1[2]<pos2[3]) ||
                        (pos1[3]>pos2[2] && pos1[3]<pos2[3]) ||
                        (pos1[2]<=pos2[2] && pos1[3]>=pos2[3])))
                    {
                        console.log("choque");
                    }
                    else{
                        $(this).append(mesa);
                        mesa.css({position:"absolute",top:nuevoTop+"px",left:nuevoLeft+"px"});
                    }
            }
            else{
                $(this).append(mesa);
                mesa.css({position:"absolute",top:nuevoTop+"px",left:nuevoLeft+"px"});
            }
           
        }
    });

    $(".sala").droppable({});
})