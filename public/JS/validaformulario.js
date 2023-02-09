function validar (form){
    //Si el formulario pasado no es null validamos
    if (form!=null){
        //al boton del formulario le añado un controlador de 
        //evento al hacer click
        console.log(form.altura);
        // form.submit.addEventListener("click", function(ev){
            const numError = [];
            errorEmail=document.getElementById("errorEmail");
            //si el email no es validio
            if(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(form.Email.value)==true){
                errorEmail.style.color="white";
                errorEmail.innerHTML="";
                form.Email.style.border="1px solid green";
                
                
            }else{
                form.Email.style.border="1px solid red";
                
                //console.log(errorEmail);
                errorEmail.innerHTML="Formato email erroneo";
                errorEmail.className="titulo";
                errorEmail.style.color="red";
                numError.push(1);
            }
            //si el campo del nombre no es valido
            if(form.Nombre.value === null || form.Nombre.value==="" || form.Nombre.length<2){
                form.Nombre.style.border="1px solid red";
                numError.push(2);

                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }else{
                
                form.Nombre.style.border="1px solid green";
            }
            //si el campo del apellido1 no es valido
            if(form.Apellido1.value === null || form.Apellido1.value==="" || form.Apellido1.length<2){
                form.Apellido1.style.border="1px solid red";
                numError.push(3);

                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }else{
                form.Apellido1.style.border="1px solid green";
            }
            //si el campo del apellido2 no es valido
            if(form.Apellido2.value === null || form.Apellido2.value==="" || form.Apellido2.length<2){
                form.Apellido2.style.border="1px solid red";
                numError.push(4);

                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }else{
                form.Apellido2.style.border="1px solid green";
            }
            //si el campo del identificador no es valido
            if(form.Identificador.value === null || form.Identificador.value==="" || form.Identificador.length<2){
                form.Identificador.style.border="1px solid red";
                numError.push(5);
                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }else{
                form.Identificador.style.border="1px solid green";
            }
            //si el campo de la contraseña no es valido
            if(form.Contraseña.value === null || form.Contraseña.value==="" || form.Contraseña.length<2){
                form.Contraseña.style.border="1px solid red";
                numError.push(6);
                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }else{
                form.Contraseña.style.border="1px solid green";
            }
            //si las coordenadas no son validas
            if(isValidCoordinates(form.GPSX.value,form.GPSY.value)){
                form.GPSX.style.border="1px solid green";
                form.GPSY.style.border="1px solid green";
                errorgps.style.color="white";
                errorgps.innerHTML="Formato coordenadas erroneo";
            }else{
                errorgps=document.getElementById("errorgps");
                //console.log(errorEmail);
                errorgps.innerHTML="Formato coordenadas erroneo";
                errorgps.className="titulo";
                errorgps.style.color="red";
                form.GPSX.style.border="1px solid red";
                form.GPSY.style.border="1px solid red";
                numError.push(7);
                errorEmail=document.getElementById("errorcampos");
                //console.log(errorEmail);
                errorcampos.innerHTML="Campos vacios";
                errorcampos.className="titulo";
                errorcampos.style.color="red";
            }

            //si el campo del numero de errores es mayor que 0 es porque hay algun error
            //por lo cual hacemos un preventDefault para que no se envie el formulario
            if(numError.length>0){
                ev.preventDefault();
            }
        // });
    }
}

function isValidCoordinates(x,y) {
    
    if (/^\d*\.?\d*$/.test(x) && /^\d*\.?\d*$/.test(y)) {
        return false;
    }
    if (x==="" || y===""){
        return false;
    }
    return (x>-90 && x<90 && y>-180 && y<180);
}