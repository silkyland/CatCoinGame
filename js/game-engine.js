var bonus_score = 50;
var height = $('.bg-warning').height();
var width = $('.bg-warning').width();
var starting = 0;
$('.coin').hide();
$('.coin-bonus').hide();
$('#heart-random').hide();
$('.ghost').hide();

startGame = function () {
    $('#buttonStartGame').hide();
    $('#share-btn').hide();
    starting = 1;
    moveCoin(1200);
}

resetGame = function () {
    $('#buttonStartGame').show().html('Play Again ?');
    $('#share-btn').show();
    $('.coin').hide();
    $('.coin-bonus').hide();
    $('#heart-random').hide();
    $('.ghost').hide();
    $('#heart').append('<li><i class="fa fa-heart live"></i></li>');
    $('#heart').append('<li><i class="fa fa-heart live"></i></li>');
    $('#heart').append('<li><i class="fa fa-heart live"></i></li>');
}

moveCoin = function (waitTime) {
    setTimeout(function () {
        if (starting != 0) {
            if ($('#score').html() > 100) {
                $('.ghost').show().css({
                    'top': function () {
                        return rand(1, (height - 26)) + 'px';
                    },
                    'left': function () {
                        return rand(1, (width - 26)) + 'px';
                    }
                });
            } else {
                $('.ghost').hide();
            }
            if (rand(1, 10000) > 4500 && rand(1, 1000) > 900) {
                $('.coin-bonus').show().css({
                    'top': function () {
                        return rand(1, (height - 26)) + 'px';
                    },
                    'left': function () {
                        return rand(1, (width - 26)) + 'px';
                    }
                });
            }
            if (rand(1, 100) > 90) {
                $('#heart-random').show().css({
                    'top': function () {
                        return rand(1, (height - 26)) + 'px';
                    },
                    'left': function () {
                        return rand(1, (width - 26)) + 'px';
                    }
                });
                setTimeout(function () {
                    $('#heart-random').fadeOut(200);
                }, 1500);
            }
            $('.coin').show().css({
                'top': function () {
                    return rand(1, (height - 26)) + 'px';
                },
                'left': function () {
                    return rand(1, (width - 26)) + 'px';
                }
            });
            moveCoin(waitTime);
        } else {
            waitTime = 999999;
        }
    }, waitTime);
}

rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

addScore = function (cost) {
    score = $('#score').html();
    score = (parseInt(score) + cost);
    $('#score').html(score);
    $('.animation-score').append('<span class="ee animated jello"> +' + cost + '</span>');
    $('.coin').hide();
}
addHeart = function (cost) {
    $('#heart-random').hide();
    $('#heart').append('<li><i class="fa fa-heart live"></i></li>');
}
animateOut = function () {
    setTimeout(function () {
        $('span.animated.jello:first').addClass('zoomOutUp').fadeOut();
        animateOut();
    }, 500);
    setTimeout(function () {
        $('span.animated.jello:first').remove();
    }, 2500);
}
animateOut();
$('#coin-bonus').click(function () {
    if ($('.coin-bonus').width() > 26) {
        $('.coin-bonus').css('width', function () {
            coinImgWidth = $('.coin-bonus').width();
            addScore(bonus_score);
            bonus_score = parseInt(bonus_score / 2);
            return (coinImgWidth - 20) + 'px';
        });
    } else {
        $('.coin-bonus').css('width', 26);
        addScore(2);
        setTimeout(function () {
            $('#coin-bonus').fadeOut(500);
        }, 1000);
    }
});

$('.danger-zone').click(function () {
    if (starting != 0) {
        $('.live:first').remove();
        if ($('.live').length < 1) {
            if ($('#score').html() > $('#height-score').html()) {
                $('#height-score').html($('#score').html())
            }
            sweetAlert("Game Over", "Your score is " + $('#score').html(), "error");
            $('meta[property="og:title"]').attr('content', 'I got ' + $('#score').html() + 'point in Cat Coin Game, Wanna challenge me?')
            $('#share-btn').show();
            starting = 0;
            moveCoin(90000);
            $('#score').html('0');
            resetGame();
        }
    }
});

countdown = function () {

}


