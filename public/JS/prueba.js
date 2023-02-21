$(function(){
// selecciona los elementos que se van a utilizar
const drag = $('.drag');
const drop = $('.drop');

// hace arrastrable al elemento drag usando jQuery UI
drag.draggable({
  revert: 'invalid', // hace que el elemento vuelva a su posición original si se suelta fuera de drop
});

// hace que drop acepte elementos arrastrables usando jQuery UI
drop.droppable({
  accept: '.drag', // permite soltar solamente elementos con la clase drag
  drop: function(event, ui) { // función que se ejecuta al soltar el elemento
    // obtiene el elemento que se soltó y lo agrega a drop si no choca con otros elementos y se soltó dentro del contenedor
    const draggable = ui.draggable;
    const dropArea = $(this);
    const draggableOffset = draggable.offset();
    const dropAreaOffset = dropArea.offset();
    const draggableWidth = draggable.outerWidth();
    const dropAreaWidth = dropArea.outerWidth();
    const draggableHeight = draggable.outerHeight();
    const dropAreaHeight = dropArea.outerHeight();
    if (draggableOffset.top > dropAreaOffset.top && draggableOffset.left > dropAreaOffset.left &&
        draggableOffset.top + draggableHeight < dropAreaOffset.top + dropAreaHeight &&
        draggableOffset.left + draggableWidth < dropAreaOffset.left + dropAreaWidth &&
        !draggable.is(dropArea.find('*')) &&
        !draggable.is(dropArea)) {
      draggable.appendTo(dropArea);
    }
  },
});

})