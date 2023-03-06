$(function(){
    
    var formu=$("#formu");
    var errorNombre=$("#ErrorNombre");
    var errorApellido1=$("#ErrorApellido1");
    var errorApellido2=$("#ErrorApellido2");
    var errorTelegram=$("#ErrorTelegram");
    formu[0]._email.disabled = true;
   
    var guardar=$("#Guardar") 
    console.log(guardar)
    guardar.click(function(ev){
        var numError = [];
        if (formu[0].nombre.value=="" || formu[0].nombre.value.length<3)
        {
            errorNombre.text("Debe seleccionar introducir un nombre válido");
            numError.push(1);
        }
        else{
            errorNombre.text("");
        }
        if (formu[0].apellido1.value==""){
            errorApellido1.text("Debe introducir el primer apellido");
            errorApellido1.removeClass("mb-4");
            numError.push(2);
        }
        else{
            errorApellido1.text("");
            errorApellido1.addClass("mb-4");
        }

        if (formu[0].apellido2.value==""){
            errorApellido2.text("Debe introducir el segundo apellido");
            errorApellido2.removeClass("mb-4");
            numError.push(3);
        }
        else{
            errorApellido2.text("");
            errorApellido2.addClass("mb-4");
        }
        if (isNaN(formu[0].telegram.value ) || formu[0].telegram.value==""){
            errorTelegram.text("Debe Introducir un numero de telegram válido");

            numError.push(4);
        }
        else{
            errorTelegram.text("");
        }
        
        if(numError.length==0){
            $.ajax( "http://localhost:8000/api/user/"+formu[0]._email.value,  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "nombre" : formu[0].nombre.value, 
                    "apellido1" : formu[0].apellido1.value, 
                    "apellido2": formu[0].apellido2.value,
                    "telegram": formu[0].telegram.value,
                    
                },
            })
        }
        else{
            ev.preventDefault();
        }
    })
})