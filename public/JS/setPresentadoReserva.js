$(function(){
    var checkbox=$(".checkbox");

    checkbox.click(function(ev) {
        
        // if (checkbox.is(':checked')) {
        //     console.log("presentado")
        //     // $.ajax( "http://localhost:8000/api/reserva/"+this.id,  
        //     // {
        //     //     method:"PUT",
        //     //     dataType:"json",
        //     //     crossDomain: true,
        //     //     data: {
        //     //         "presentado" : true, 
        //     //     },
        //     // }).done(function (data) {
        //     //     console.log(data)
        //     // })
        // } else {
        //     console.log("no presentado")
        //     // $.ajax( "http://localhost:8000/api/reserva/"+this.id,  
        //     // {
        //     //     method:"PUT",
        //     //     dataType:"json",
        //     //     crossDomain: true,
        //     //     data: {
        //     //         "presentado" : false, 
        //     //     },
        //     // }).done(function (data) {
        //     //     console.log(data)
        //     // })
        // }

        if ( this.checked) {
            console.log("presentado")
            $.ajax( "http://localhost:8000/api/reserva/"+this.id,  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "presentado" : 1, 
                },
            })
        } else {
            console.log("No presentado")
            $.ajax( "http://localhost:8000/api/reserva/"+this.id,  
            {
                method:"PUT",
                dataType:"json",
                crossDomain: true,
                data: {
                    "presentado" : 0, 
                },
            })
        }
    })


})