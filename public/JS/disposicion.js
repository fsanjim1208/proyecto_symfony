$(function(){

    var mesas=cogeMesas();
    var disposiciones= cogeDisposiciones();
    var disposicionesDia=[];
    var mesasDia=[];
    pintaDisposicionBase(mesas);


    var botonDisposicion=$("#GuardaDistribuicion");
    var fecha=$("#fecha");
    fecha.prop('disabled', true);
    
    var festivos=cogeFestivos();

    function deshabilitaFechas(date) {
        var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
        return [festivos.indexOf(string) == -1];
    }

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
            disposicionesDia=[];
            for (let i = 0; i < disposiciones.length; i++) {
                if(disposiciones[i].fecha == fechaDisposicion){
                    disposicionesDia.push(disposiciones[i]);
                }
                
            }
            if(disposicionesDia.length>0){
                mesasdia = disposicionToMesa(disposicionesDia);
                pintaMesasDraggables(mesasdia);
                pintaMesasAlmacenDraggables(mesas);
            }
            else{
                pintaDisposicionBase(mesas);
                pintaMesasAlmacenDraggables(mesas);
            }
        }
    });

    var input="base";
    $("input[name=disposicion]").click(function () {    
        if($(this).val()=="Personalizada"){
            fecha.prop('disabled', false);
            if(mesasdia.length==0){
                input="personalizada";
            }
            else{
                input="personalizada";
            }
        }

        if($(this).val()=="Base"){
            fecha.prop('disabled', true);
            fecha.val("");
            pintaDisposicionBase(mesas);
            pintaMesasAlmacenDraggables(mesas);
            input="base";
        }
    });

    botonDisposicion.click(function(){
        var mesas=$(".sala .mesa");
        var igual=false;
        var esta=false;
        var mesasGuardar=[];
        var mesasEliminar=[];
        var dia= $("#fecha").val().split("/")[0];
        var mes= $("#fecha").val().split("/")[1];
        var anio= $("#fecha").val().split("/")[2];
        var fechaDisposicion= dia+"-"+mes+"-"+anio;


        if(input=="personalizada"){
            // console.log(mesas)
            for (let i = 0; i < mesas.length; i++) {
                for (let j = 0; j < mesasdia.length; j++) {
                    if(mesas[i].id.split("_")[1]==mesasdia[j].id){
                        // console.log(mesas[i]+" mesa con indice "+i + "en if");
                        // console.log(mesasdia[j]+" mesa dia con indice " + j + "en if");
                        igual=true;
                        console.log(mesas[i].id+"  top "+mesas[i].style.top)
                        $.ajax( "http://localhost:8000/api/disposicion2/"+mesasdia[j].id+"/"+fechaDisposicion,  
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
            var completo=0;
            $.each(mesasdia, function(index, mesasdia) {
                completo=0;
                $.each(mesas, function(index, mesas) {
                    if (mesas.id.split("_")[1]==mesasdia.id) {

                        return false; // termina el ciclo
                    }
                    else{
                        completo=completo+1
                        console.log(completo)
                    }
                });
                if (completo==mesas.length){
                   mesasEliminar.push(mesasdia) 
                }
                
            });
            
            if (mesasEliminar.length>0) {
                for (let i = 0; i < mesasEliminar.length; i++) {
                    
                }
            } 
  
            
            
            

            for (let i = 0; i < mesasGuardar.length; i++) {
                console.log(mesasGuardar[i])
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
    //     else{
    //         for (let i = 0; i < mesas.length; i++) {
    //             console.log(mesas[i])
                    
    //             $.ajax( "http://localhost:8000/api/disposicion2/"+mesas[i].id.split("_")[1]+"/"+"00-00-0000",  
    //             {
    //                 method:"PUT",
    //                 dataType:"json",
    //                 crossDomain: true,
    //                 data: {
    //                     "X": parseInt(mesas[i].style.top),
    //                     "Y": parseInt(mesas[i].style.left),
    //                 },
    //             })
    //         }
    //     }





    //     // for (let i = 0; i < mesa.length; i++) {
    //     //     console.log(parseInt(mesa[i].style.top))
    //     //     $.ajax( "http://localhost:8000/api/disposicion",  
    //     //     {
    //     //         method:"POST",
    //     //         dataType:"json",
    //     //         crossDomain: true,
    //     //         data: {
    //     //             "fecha" : "00/00/0000", 
    //     //             "mesa" : mesa[i].id, 
    //     //             "X": parseInt(mesa[i].style.top),
    //     //             "Y": parseInt(mesa[i].style.left),
    //     //         },
    //     //     })
    //     // }
    //     // console.log(mesa)
    })
})
    // console.log(almacen);
    