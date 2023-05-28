let doneTime = 8000;
let doneTimer;

let circleGen;
let circleTimer = 1000;
let colorNumber = 0;
let colors = ['#634ea0', '#f9d49b', '#8a712f', '#e7c21f', '#f89943',   '#e42432',  ]

$('.container').bind('mousedown touchstart', circlePop);
$('.container').bind('mouseup touchend', function(){
    clearInterval(circleGen);
    clearTimeout(doneTimer);
    // something with 'keep going' before the thing is done...
});


function circlePop(e) {
    e.preventDefault();

    makeCircle(e.pageX, e.pageY)
    circleGen = setInterval(function() {makeCircle(e.pageX, e.pageY)}, circleTimer);
    doneTimer = setTimeout(vitacoon, doneTime);
}

function makeCircle(x, y) {
    let circle = $('<div></div>');
    circle.addClass('circle');
    circle.css('background-color', colors[colorNumber])
    $('.container').append(circle);

    let size = parseInt(circle.css('height')) / 2;
    circle.css('top', y - size);
    circle.css('left', x - size);

    if (colorNumber == colors.length) {
        colorNumber  = 0;
    } else {
        colorNumber += 1;
    }
}

function vitacoon() {
    clearInterval(circleGen);
    console.log('done');
}
