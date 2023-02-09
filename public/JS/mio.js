$(function(){
    var almacen= $(".almacen");
    var sala= $(".sala");
    var mesas=[];
    //ajax para traer todas las mesas
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

        var mesaprueba=new Mesa({
            "id": 8,
            "x" : 280, 
            "y" : 115, 
            "ancho":100,
            "alto":200});

        //mesaprueba.solapa(mesas);

        $(".almacen").droppable({
            //cuando suelto algo sobre el almacen hago que sea hijo de el
            drop:function(ev,ui ){
                var mesa= ui.draggable;
                mesa.css({"top":0,"left":0})
                $(this).append(mesa)
            }
        });
        $(".sala").droppable({
            //cuando suelto algo sobre la sala hago que sea hijo de ella
            drop:function(ev,ui ){
                
                var mesa= ui.draggable;
                // console.log(mesa.attr);
                mesa.css({
                        //   "position":"absolute",
                          "top":ui.offset.top,
                          "left":ui.offset.left});
                $(this).append(mesa);
                
                //tambien actualizo sus coordenadas ya que al estar en la sala ya debe estar 
                //colocada con sus coordenadas
                // console.log("eo");
                //console.log(ui.draggable);
                //console.log(event.target)
                $.ajax( "http://localhost:8000/api/mesa/"+event.target.id.split("_")[1],  
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
   
            }
        })

        $(".almacen .mesa").draggable({
            start: function(ev, ui){
                //console.log(ui);
            },

            // drag: function(ev,ui){
            //     console.log(ui);
            //     if (ui.offset.left<400){
            //         debugger;
            //     }
            // },
        })

        $(".sala .mesa").draggable({
                // scroll: false,
                // containment: "#contenedor",
                // appendTo:"body",
                // helper:"clone",
                start: function(ev, ui){

                },
                
                stop: function(ev, ui){
                    // console.log(parseInt(this.style.top));
                    //console.log("eoo "+ui.helper.prevObject);
                    
                    var mesa = new Mesa({
                        "id": parseInt(this.id.split("_")[1]),
                        "x" : parseInt(this.style.top), 
                        "y" : parseInt(this.style.left), 
                        "ancho":parseInt(this.style.width),
                        "alto":parseInt(this.style.height)});
                        // console.log(mesa);
                    mesa.solapa();
                    console.log(mesa.solapa());
                    if (mesa.solapa()){

                    }
                    else{
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
                    }
                    
                },
            
        });

    })





















    // $(".mesa").draggable({
    //     revert: "invalid",
        
    // });
    // let topSala = $(".sala").position().top;
    // let leftSala= $(".sala").position().left;
    // let rightSala = $(".sala").position().left + $(".sala").width();
    // let bottomSala=$(".sala").position().top + $(".sala").height();

    // $(".almacen").droppable({});
    // $(".sala").droppable({
    //     accept: $("div[id^=mesa_]"),

    //     drop:function(ev,ui){
           
    //         let top=ui.draggable.position().top;
    //         let left=ui.draggable.position().left;
    //         let right= ui.draggable.position().left + ui.draggable.width(); 
    //         let bottom= ui.draggable.position().top + ui.draggable.height();
            
    //         if (top<topSala && left>leftSala && right<rightSala && bottom<bottomSala)
    //         {
    //             alert("eooo");
    //         }
    //         else{
    //             alert("ºizquierda sala: " + leftSala+" izquirda mesa: " +left);
    //             // alert("derecha sala: " +rightSala+" derecha mesa: " +right+" izquierda sala: " + leftSala+" izquirda mesa: " +left);
    //         }
    //         solapa(this,ui);
    //         // alert("el top es :" +top);
    //         // alert("el left es : " + left);
    //     },
    // });

    // function inSala(salaX, salaY, salawidth, salaheight){

    // }

    // function solapa(div,ui){
    //     let top=ui.draggable.position().top;
    //     let left=ui.draggable.position().left;
    //     let right= ui.draggable.position().left + ui.draggable.width(); 
    //     let bottom= ui.draggable.position().top + ui.draggable.height();
    //     var sala= $(".sala");
    //     console.log(sala);

    //     // alert(top+" left "+left+" bottom "+ bottom+" right "+right);
    //     // alert(ui.draggable.width());
    // }

})