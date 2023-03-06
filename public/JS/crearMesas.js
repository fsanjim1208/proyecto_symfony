$(function(){

    var boton= $("#creaMesa");
    boton.click(function(ev) {



        //creamos la plantilla donde aparece el formulario
        var plantilla=`
        <div class="c-contentForm">
            <form class="c-form c-form--mesas">
                <div class="row g-3">
                    <div class="col-md-10">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="altura" name="altura" placeholder="Alto">
                            <label for="altura">altura</label>
                        </div>
                        <br>
                        <div class="form-floating">
                            <input type="number" class="form-control" id="anchura" name="anchura" placeholder="Ancho">
                            <label for="anchura">Ancho</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>`

        jqPlantilla=$(plantilla);
        //creamos el modal del formulario
        jqPlantilla.dialog({
            title: "Crear una mesa nueva",
            height: 300,
            width: 400,
            modal: true,
            buttons: {
                "Crear": function() {
                    var formu = $(".c-form--mesas");
                    const numError = [];
                    console.log(formu[0].altura)
                    if(formu[0].altura.value === null || formu[0].altura.value==="" || formu[0].altura.value<15){
                        formu[0].altura.style.border="1px solid red";
                        numError.push(2);
                    }else{         
                        formu[0].altura.style.border="1px solid green";
                    }
                    //si el campo anchura no es valido
                    if(formu[0].anchura.value === null || formu[0].anchura.value==="" || formu[0].anchura.value<15){
                        formu[0].anchura.style.border="1px solid red";
                        numError.push(3);
        
                    }else{
                        formu[0].anchura.style.border="1px solid green";
                    }
                            
                    //si el campo del numero de errores es mayor que 0 es porque hay algun error
                    //por lo cual hacemos un preventDefault para que no se envie el formulario
                    if(numError.length>0){
                        ev.preventDefault();
                    }
                    else{
                        ev.preventDefault();
                        $.ajax( "http://localhost:8000/api/mesa",  
                        {
                            method:"POST",
                            dataType:"json",
                            crossDomain: true,
                            data: {
                                "x" : 0, 
                                "y" : 0, 
                                "ancho": formu[0].anchura.value,
                                "alto": formu[0].altura.value
                            },
                        }).done(function(data){
                            var id=data[0].split(" ")[6]
                            var almacen=$(".almacen")
                            almacen.append("<div id='mesa_"+id+"' class='mesa ui-draggable ui-draggable-handle' style='width: "+data[2][0].alto+"px; height: "+data[2][0].ancho+"px;'></div>")
                        })


                        // var disposicion=cogeDisposiciones()
                        // pintaMesasAlmacenDraggables(mesas)
                        // pintaMesas();
                        jqPlantilla.dialog( "close" );
                    }
                },
                Cancel: function() {
                    jqPlantilla.dialog( "close" );
                }
            },
            close: function() {
                jqPlantilla.dialog( "close" );
            },
        })


    });

    function cogeMesas() {
        var mesasArray = [];
        $.ajax("http://localhost:8000/api/mesa",
            {
                method: "GET",
                dataType: "json",
                crossDomain: true,
                async: false,
    
            }).done(function (data) {
    
                $.each(data, function (key, val) {
                    var mesaOrigen = new Mesa(val);
                    mesasArray.push(mesaOrigen);
    
                })
    
            });
        return mesasArray;
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

        
    function disposicionToMesa(disposicionBase){
        var mesas=[];
        for (let i = 0; i < disposicionBase.length; i++) {
            
            $.ajax( "http://localhost:8000/api/mesa/"+disposicionBase[i].idMesa,  
            {
                method:"GET",
                dataType:"json",
                crossDomain: true,
                async: false
            }
            ).done(function(data){
                $.each( data, function( key, val ) {
                    val.x=disposicionBase[i].X;
                    val.y=disposicionBase[i].Y
                    var mesa=new Mesa(val)
                    mesas.push(mesa);
                });
            })
        }
        return mesas;
    }


    function pintaMesasAlmacenDraggables(mesas) {
        var almacen = $(".almacen");
        var mesasAlmacen=$(".almacen .mesa")
        mesasAlmacen.remove();
        var arrayMesas = mesas;
        $.each(arrayMesas, function (key, val) {
            if (val.y === 0 && val.x === 0) {
                var mesa = $("<div>");
                mesa.attr("id", "mesa_" + val.id);
                mesa.attr("class", "mesa");
                mesa.css('width', val.ancho);
                mesa.css('height', val.alto);
                almacen.append(mesa);
            }
        });
        $(".almacen .mesa").draggable({
            revert: true,
            helper: 'clone',
            revertDuration: 0,
            start: function(ev,ui){
                ui.helper.attr("id",ui.helper.prevObject.attr("id").split("_")[1]);
            }
        })
    }
    function validar(formu, ev){

        // form.click(function(ev){
        //     ev.preventDefault();
        //     alert("ee")
        // });

        formu.click(function(ev){
            const numError = [];
            var form= formu[0];        
            //si el campo altura no es valido
            if(form.altura.value === null || form.altura.value==="" || form.altura.value<15){
                form.altura.style.border="1px solid red";
                numError.push(2);
            }else{         
                form.altura.style.border="1px solid green";
            }
            //si el campo anchura no es valido
            if(form.anchura.value === null || form.anchura.value==="" || form.anchura.value<15){
                form.anchura.style.border="1px solid red";
                numError.push(3);

            }else{
                form.anchura.style.border="1px solid green";
            }
                    
            //si el campo del numero de errores es mayor que 0 es porque hay algun error
            //por lo cual hacemos un preventDefault para que no se envie el formulario
            if(numError.length>0){
                ev.preventDefault();
            }
            else{
                ev.preventDefault();
                console.log(jqPlantilla)
                $.ajax( "http://localhost:8000/api/mesa",  
                {
                    method:"POST",
                    dataType:"json",
                    crossDomain: true,
                    data: {
                        "x" : 0, 
                        "y" : 0, 
                        "ancho": form.anchura.value,
                        "alto": form.altura.value
                    },
                })
                
                // pintaMesas();
                jqPlantilla.dialog( "close" );
            }
        })
    }


})