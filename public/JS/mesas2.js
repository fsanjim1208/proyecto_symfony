
function Mesa(json) {
    this.id = json.id;
    this.x = json.x;
    this.y = json.y;
    this.ancho = json.ancho;
    this.alto = json.alto;
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


function pintaMesas() {
    var almacen = $(".almacen");
    var sala = $(".sala");
    var arrayMesas = cogeMesas();
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


