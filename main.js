let doneTime = 8000;
let doneTimer;
let done = false;

let circleGen;
let circleTimer = 1000;
let colorNumber = 0;
let colors = ['#634ea0', '#f9d49b', '#8a712f', '#e7c21f', '#76a56d', '#f89943', '#e42432',  ]

$('.scanner').bind('mousedown touchstart', circlePop);
$('.scanner').bind('mouseup touchend', function(){
    clearInterval(circleGen);
    clearTimeout(doneTimer);
    // something with 'keep going' before the thing is done...
});


function circlePop(e) {
    e.preventDefault();
    if (done) {
        return;
    }

    makeCircle(e.pageX, e.pageY)
    circleGen = setInterval(function() {makeCircle(e.pageX, e.pageY)}, circleTimer);
    doneTimer = setTimeout(function() {vitacoon(e.pageX, e.pageY)}, doneTime);
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

    return circle;
}

function vitacoon(x, y) {
    clearInterval(circleGen);
    $('.calculating').addClass('inactive');
    done = true;

    let resultNo = Math.floor(Math.random() * colors.length);

    colorNumber = resultNo;
    circle = makeCircle(x, y);
    circle.addClass('main-color');

    $('#' + resultNo).addClass('show');
    setTimeout(
        function() {
            $('#' + resultNo).addClass('active');
            $('.calculating').addClass('hide');
            $('.scanner').addClass('down');
        }, 2000
    );

    setTimeout(
        function() {
            $('body').css('background-color', colors[resultNo]);
            $('.circle').remove();
        }, 5000
    );
}
