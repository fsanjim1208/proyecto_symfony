$(function(){
    var boton= $(".eliminar");
    boton.click(function(ev) {
        const id=this.id;
        console.log(id)
        $.ajax( "http://localhost:8000/api/juego/"+id,  
        {
            method:"GET",
            dataType:"json",
            crossDomain: true,
        }
        ).done(function(data){
            console.log(data)
            var nombre=data.nombre;
            var img=data.imagen;
            console.log(data)
            var plantilla=`
                <div>
                    <h4>`+nombre+`</h4>
                    <img src="`+img+`" class="c-imagen c-imagen--juegos"></img>
                </div>`;

            jqPlantilla=$(plantilla);

            jqPlantilla.dialog({
                title: "¿Está seguro que desea eliminarlo?",
                height: 280,
                width: 400,
                modal: true,
                buttons: {
                    "Eliminar": function() {
                        alert("meter la api para eliminar");
                    },
                    Cancel: function() {
                    jqPlantilla.dialog( "close" );
                    },
                },
                close: function() {
                    jqPlantilla.dialog( "close" );
                },
            })

        });
    })
    // console.log(boton)
})