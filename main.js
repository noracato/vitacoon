let minimalTime = 3000;
let circleGen;
let circleTimer = 1000;

$('.container').bind('mousedown touchstart', circlePop);
$('.container').bind('mouseup touchend', function(){
    clearInterval(circleGen);
    // something with 'keep going' before the thing is done...
});


function circlePop(e) {
    makeCircle(e.pageX, e.pageY)

    circleGen = setInterval(function() {makeCircle(e.pageX, e.pageY)}, circleTimer);
}

function makeCircle(x, y) {
    let circle = $('<div></div>');
    circle.addClass('circle');
    $('.container').append(circle);

    let size = parseInt(circle.css('height')) / 2;
    circle.css('top', y - size);
    circle.css('left', x - size);
}
