function disposicionToMesa(disposicionBase){
    var mesasBase=[];
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
                var mesaa=new Mesa(val)
                mesasBase.push(mesaa);
            });
        })
    }
    return mesasBase;
}

function jsonToDate(json){
    var day="";
    var month="";
    if(json.day<10){
        day="0"+json.day;
    }
    else{
        day=json.day;
    }

    if(json.month<10){
        month="0"+json.month;
    }
    else{
        month=json.month;
    }
    return day+"/"+month+"/"+json.year;
}
    

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


function pintaMesasAlmacen(mesas) {
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
    })
}

function MesasAlmacenDraggable(){
    $(".almacen .mesa").draggable({
        revert: true,
        helper: "clone", 
        revertDuration:0,
    })
}
function pintaMesas(mesas) {
    var almacen = $(".almacen");
    var sala = $(".sala");
    var arrayMesas = mesas;

    var mesasAlmacen=$(".almacen .mesa")
    mesasAlmacen.remove();
    var mesasSala=$(".sala .mesa")
    mesasSala.remove();


    $.each(arrayMesas, function (key, val) {
        if (val.y === 0 && val.x === 0) {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            almacen.append(mesa);
        }
        //si las coordenadas son distintas de 0 las meto dentro de la sala
        else {
            var mesa = $("<div>");
            mesa.attr("id", "mesa_" + val.id);
            mesa.attr("class", "mesa");
            mesa.css('width', val.ancho);
            mesa.css('height', val.alto);
            mesa.css('top', val.x);
            mesa.css('left', val.y);
            sala.append(mesa);
        }
    })
}

function mesaSalaDraggable(){
    $(".sala .mesa").draggable({  
        // revert: true,
        // accept: ".sala, .almacen",
        // helper: "clone",              
        stop: function(ev, ui){
            // console.log(parseInt(this.style.top));
            //console.log("eoo "+ui.helper.prevObject);
            var mesa = new Mesa({
                "id": this.id.split("_")[1],
                "x" : parseInt(this.style.top), 
                "y" : parseInt(this.style.left), 
                "ancho":parseInt(this.style.width),
                "alto":parseInt(this.style.height)
            });
            // console.log(mesa);
            
            //mesa.solapa();
            $(this).append(mesa);
            console.log(mesa)
            $.ajax( "http://localhost:8000/api/mesa/"+this.id.split("_")[1],  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "x" : parseInt(this.style.top), 
                    "y" : parseInt(this.style.left), 
                    "ancho":parseInt(this.style.width),
                    "alto":parseInt(this.style.height)
                },
            })

            // if(mesa.solapa()){
                
            // }
            // else{

            //     // console.log(mesa);
            //     // console.log(this)
            //     // mesa.css({
            //     //     "top":ui.offset.top,
            //     //     "left":ui.offset.left});
                
            //     $(this).append(mesa);
            //     $.ajax( "http://localhost:8000/api/mesa/"+this.id.split("_")[1],  
            //     {
            //         method:"PUT",
            //         dataType:"json",
            //         crossDomain: true,
            //         data: {
            //             "x" : parseInt(this.style.top), 
            //             "y" : parseInt(this.style.left), 
            //             "ancho":parseInt(this.style.width),
            //             "alto":parseInt(this.style.height)
            //         },
            //     })
            // s}
        },
    });
}