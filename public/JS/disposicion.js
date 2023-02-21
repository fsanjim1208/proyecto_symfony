// function Mesa(json) {
//     this.id = json.id;
//     this.x = json.x;
//     this.y = json.y;
//     this.ancho = json.ancho;
//     this.alto = json.alto;
// }

$(function(){

    var mesas=cogeMesas();
    var disposicionBase=[];
    var mesasBase=[];
    // pintaMesas(mesas);
    $.ajax( "http://localhost:8000/api/disposicion/0000-00-00",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
        async: false
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            disposicionBase.push(val);
        });
    })
    
    
    // console.log("EE")
    // console.log(mesasBase)
    // console.log("EE")
    // console.log(mesas)
    mesasBase=disposicionToMesa(disposicionBase)

    pintaMesas(mesasBase);
    pintaMesasAlmacen(mesas);



    var botonMesa=$("#creaMesa");
    var botonDisposicion=$("#GuardaDistribuicion");
    var fechaSeleccionda="";
    var formu=$("#checkbox");
    var base=$("#base");
    var personalizada=$("#personalizada");
    var fecha=$("#fecha");
    fecha.prop('disabled', true);
    var festivos=[];
    $.ajax( "http://localhost:8000/api/festivo",  
    {
        method:"GET",
        dataType:"json",
        crossDomain: true,
    }
    ).done(function(data){
        $.each( data, function( key, val ) {
            festivos.push(jsonToDate(val));
        });
        
    })

    function deshabilitaFechas(date) {
        var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
        return [festivos.indexOf(string) == -1];
    }
    var disposicionesArray=[];
    var mesasdia=[];
    // console.log(festivos);
    $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
    fecha.datepicker({
        dateFormat: "dd/mm/yy",
        minDate: "+ 1D", 
        maxDate: "+ 3M +1D",
        firstDay:1,
        beforeShowDay: deshabilitaFechas,
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        onSelect: function(text, obj){
            var dia= text.split("/")[0];
            var mes= text.split("/")[1];
            var anio= text.split("/")[2];
            var fechaDisposicion= dia+"-"+mes+"-"+anio;

            // console.log(disposicionesArray);
            $.ajax( "http://localhost:8000/api/disposicion/"+fechaDisposicion,  
            {
                method:"GET",
                dataType:"json",
                crossDomain: true,
                async: false
            }
            ).done(function(data){
                $.each( data, function( key, val ) {
                    disposicionesArray.push(val);
                });
            }).fail(function() {
                disposicionesArray=[];
            })

            mesasdia= disposicionToMesa(disposicionesArray);
            pintaMesas(mesasdia);
            pintaMesasAlmacen(mesas)
        }
    });
    var input="base";
    $("input[name=disposicion]").click(function () {    
        if($(this).val()=="Personalizada"){
            fecha.prop('disabled', false);
            if(mesasdia.length==0){
                pintaMesas(mesasBase);
                pintaMesasAlmacen(mesas);
                input="personalizada";
            }
            else{
                            
                pintaMesas(mesasdia);
                pintaMesasAlmacen(mesas);
                mesaSalaDraggable();
                input="personalizada";
            }
        }

        if($(this).val()=="Base"){
            fecha.prop('disabled', true);
            fecha.val("");
            pintaMesas(mesasBase);
            mesaSalaDraggable();
            pintaMesasAlmacen(mesas);
            input="base";
        }
    });

    botonDisposicion.click(function(){
        var mesas=$(".sala .mesa");
        var igual=false;
        var mesasGuardar=[];
        var dia= $("#fecha").val().split("/")[0];
        var mes= $("#fecha").val().split("/")[1];
        var anio= $("#fecha").val().split("/")[2];
        var fechaDisposicion= dia+"-"+mes+"-"+anio;


        if(input=="personalizada"){
                
            // console.log(mesas)
            for (let i = 0; i < mesas.length; i++) {
                
                console.log(mesas[i]+" mesa con indice "+i);
                for (let j = 0; j < mesasdia.length; j++) {
                    
                    if(mesas[i].id.split("_")[1]==mesasdia[j].id){
                        // console.log(mesas[i]+" mesa con indice "+i + "en if");
                        // console.log(mesasdia[j]+" mesa dia con indice " + j + "en if");
                        igual=true;

                        $.ajax( "http://localhost:8000/api/disposicion2/"+mesas[i].id.split("_")[1]+"/"+fechaDisposicion,  
                        {
                            method:"PUT",
                            dataType:"json",
                            crossDomain: true,
                            data: {
                                "X": parseInt(mesas[i].style.top),
                                "Y": parseInt(mesas[i].style.left),
                            },
                        })

                    }
                }
                if(!igual){
                        mesasGuardar.push(mesas[i])
                }
                igual=false;
                
            }
            // console.log(mesasGuardar)
            // console.log(mesasGuardar[0].id )
            // console.log(fechaDisposicion);
            // console.log(parseInt(mesas[0].style.top));
            // console.log(parseInt(mesas[0].style.left));


            for (let i = 0; i < mesasGuardar.length; i++) {
                $.ajax( "http://localhost:8000/api/disposicion",  
                {
                    method:"POST",
                    dataType:"json",
                    crossDomain: true,
                    data: {
                        "mesa": mesasGuardar[i].id, 
                        "fecha" : fechaDisposicion,
                        "X": parseInt(mesas[i].style.top),
                        "Y": parseInt(mesas[i].style.left),
                    },
                })
            }
        }
        else{
            for (let i = 0; i < mesas.length; i++) {
                console.log(mesas[i])
                    
                $.ajax( "http://localhost:8000/api/disposicion2/"+mesas[i].id.split("_")[1]+"/"+"0000-00-00",  
                {
                    method:"PUT",
                    dataType:"json",
                    crossDomain: true,
                    data: {
                        "X": parseInt(mesas[i].style.top),
                        "Y": parseInt(mesas[i].style.left),
                    },
                })
            }
        }





        // for (let i = 0; i < mesa.length; i++) {
        //     console.log(parseInt(mesa[i].style.top))
        //     $.ajax( "http://localhost:8000/api/disposicion",  
        //     {
        //         method:"POST",
        //         dataType:"json",
        //         crossDomain: true,
        //         data: {
        //             "fecha" : "00/00/0000", 
        //             "mesa" : mesa[i].id, 
        //             "X": parseInt(mesa[i].style.top),
        //             "Y": parseInt(mesa[i].style.left),
        //         },
        //     })
        // }
        // console.log(mesa)
    })
})
    // console.log(almacen);
    