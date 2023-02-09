$(function(){

    var boton= $("#creaMesa");
    boton.click(function(ev) {
        // ev.preventDefault();
        // var modal=  $("<div>");
        // var formulario = $("<form>");

        // var inputX = $("<input>");
        // console.log(inputX.get(0).type);
        // inputX.get(0).name = 'X';
        // inputX.get(0).value = 'coordenadas X';
        
        // var inputY = $("<input>");
        // // inputY.get(0).type = 'number';
        // inputY.get(0).name = 'Y';
        // inputY.get(0).value = 'coordenadas Y';
        
        // inputX.appendTo(formulario);
        // inputY.appendTo(formulario);
        // formulario.appendTo(modal);
        // modal.dialog({
        //     height: 200,
        //     width: 500,
        //     title:"EE",
        // }).appendTo($("#contenedor"));



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
                        <br>
                        <button class="btn btn-primary w-100 py-3" type="submit" id="crear" name="submit">Crear Mesa</button>
                    </div>
                </div>
            </form>
        </div>`

        jqPlantilla=$(plantilla);

        jqPlantilla.dialog({
            title: "Crear una mesa nueva",
            height: 400,
            width: 600,
            modal: false,
            buttons: {
                
                Cancel: function() {
                jqPlantilla.dialog( "close" );
                }
            },
            close: function() {
                jqPlantilla.dialog( "close" );
            },
        })

        // var boton2=$("#crear");
        // console.log(boton2);
        // boton2.click(function(ev){
        //     ev.preventDefault();
        //     var formu = $("form");
        //     var alto=formu[0].altura.value;
        //     var ancho=formu[0].anchura.value

            
        // })
        var formu = $("form");
        validar(formu[0]);
    });


    function validar(form, ev){
        form.submit.addEventListener("click", function(ev){
            const numError = [];
                    
            //si el campo del nombre no es valido
            if(form.altura.value === null || form.altura.value==="" || form.altura.length<2){
                form.altura.style.border="1px solid red";
                numError.push(2);
            }else{
                        
                form.altura.style.border="1px solid green";
            }
                    //si el campo del apellido1 no es valido
            if(form.anchura.value === null || form.anchura.value==="" || form.anchura.length<2){
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
            }
        })
    }


})