// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

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

    $('#in-1').hide();
    $('#in-1').html('Analysing');
    $('#in-0').show();
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
    analyzing()

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

function analyzing() {
    $('#in-0').hide();
    $('#in-1').show();

    $('#in-1').html(function(_, currentcontent){
        return currentcontent + '.';
    })
}

function vitacoon(x, y) {
    clearInterval(circleGen);
    $('.calculating').addClass('inactive');

    done = true;

    let resultNo = Math.floor(Math.random() * colors.length);
    // let resultNo = 0;

    colorNumber = resultNo;
    circle = makeCircle(x, y);
    circle.addClass('main-color');

    $('.scanner').addClass('down');
    $('.communication').addClass('done');
    $('.title').addClass('dissappear');
    $('#' + resultNo).addClass('show');
    setTimeout(
        function() {
            $('#' + resultNo).addClass('active');
        }, 2000
    );
    setTimeout(
        function() {
            $('.calculating').addClass('hide');
        }, 500
    );

    setTimeout(
        function() {
            $('body').css('background-color', colors[resultNo]);
            $('.circle').remove();
        }, 5000
    );
}
