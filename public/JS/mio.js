$(function(){
    $(".mesa").draggable({
        revert: "invalid",
        
    });
    let topSala = $(".sala").position().top;
    let leftSala= $(".sala").position().left;
    let rightSala = $(".sala").position().left + $(".sala").width();
    let bottomSala=$(".sala").position().top + $(".sala").height();

    $(".almacen").droppable({});
    $(".sala").droppable({
        accept: $("div[id^=mesa_]"),

        drop:function(ev,ui){
           
            let top=ui.draggable.position().top;
            let left=ui.draggable.position().left;
            let right= ui.draggable.position().left + ui.draggable.width(); 
            let bottom= ui.draggable.position().top + ui.draggable.height();
            
            if (top<topSala && left>leftSala && right<rightSala && bottom<bottomSala)
            {
                alert("eooo");
            }
            else{
                alert("ºizquierda sala: " + leftSala+" izquirda mesa: " +left);
                // alert("derecha sala: " +rightSala+" derecha mesa: " +right+" izquierda sala: " + leftSala+" izquirda mesa: " +left);
            }
            solapa(this,ui);
            // alert("el top es :" +top);
            // alert("el left es : " + left);
        },
    });

    function inSala(salaX, salaY, salawidth, salaheight){

    }

    function solapa(div,ui){
        let top=ui.draggable.position().top;
        let left=ui.draggable.position().left;
        let right= ui.draggable.position().left + ui.draggable.width(); 
        let bottom= ui.draggable.position().top + ui.draggable.height();
        var sala= $(".sala");
        console.log(sala);

        // alert(top+" left "+left+" bottom "+ bottom+" right "+right);
        // alert(ui.draggable.width());
    }
})