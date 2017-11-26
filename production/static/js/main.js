function toggleNav(bot, nav) {
    $(nav).toggle();
    var atributo = $(nav).attr("style");
    if("display: none;".indexOf(atributo)>=0) {
        $(bot).attr("style", "background:none;");
        $("header .container button span").css("background-color", "#FFF");
        $("header .container button span:first-child").css({"background-color": "#FFF", "position": "relative", "top": "none", "transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)", "-o-transform": "rotate(0deg)"});
        $("header .container button span:last-child").css({"background-color": "#FFF", "position": "relative", "top": "none", "transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)", "-o-transform": "rotate(0deg)"});
    } else  {
        $(bot).attr("style", "background:#FFF;");
        $("header .container button span").css("background-color", "#FFF");
        $("header .container button span:first-child").css({"background-color": "#920106", "position": "absolute", "top": "43%", "transform": "rotate(45deg)", "-moz-transform": "rotate(45deg)", "-webkit-transform": "rotate(45deg)", "-ms-transform": "rotate(45deg)", "-o-transform": "rotate(45deg)"});
        $("header .container button span:last-child").css({"background-color": "#920106", "position": "absolute", "top": "43%", "transform": "rotate(-45deg)", "-moz-transform": "rotate(-45deg)", "-webkit-transform": "rotate(-45deg)", "-ms-transform": "rotate(-45deg)", "-o-transform": "rotate(-45deg)"});
    }
}

var slideshowSpeed = 8000;
var photos = [
    {
        "title" : "",
        "image" : "1.jpg",
        "url" : "",
        "firstline" : "",
        "secondline" : ""
    },

    {
        "title" : "",
        "image" : "2.jpg",
        "url" : "",
        "firstline" : "",
        "secondline" : ""
    },

    {
        "title" : "",
        "image" : "3.jpg",
        "url" : "",
        "firstline" : "",
        "secondline" : ""
    },

    {
        "title" : "",
        "image" : "4.jpg",
        "url" : "",
        "firstline" : "",
        "secondline" : ""
    },

    {
        "title" : "",
        "image" : "5.jpg",
        "url" : "",
        "firstline" : "",
        "secondline" : ""
    },
];



$(document).ready(function() {

    // Backwards navigation
    $("#back").click(function() {
        stopAnimation();
        navigate("back");
    });

    // Forward navigation
    $("#next").click(function() {
        stopAnimation();
        navigate("next");
    });

    var interval;
    $("#control").toggle(function(){
        stopAnimation();
    }, function() {
        // Change the background image to "pause"
        $(this).css({ "background-image" : "url(images/btn_pause.png)" });

        // Show the next image
        navigate("next");

        // Start playing the animation
        interval = setInterval(function() {
            navigate("next");
        }, slideshowSpeed);
    });


    var activeContainer = 1;
    var currentImg = 0;
    var animating = false;
    var navigate = function(direction) {
        // Check if no animation is running. If it is, prevent the action
        if(animating) {
            return;
        }

        // Check which current image we need to show
        if(direction == "next") {
            currentImg++;
            if(currentImg == photos.length + 1) {
                currentImg = 1;
            }
        } else {
            currentImg--;
            if(currentImg == 0) {
                currentImg = photos.length;
            }
        }

        // Check which container we need to use
        var currentContainer = activeContainer;
        if(activeContainer == 1) {
            activeContainer = 2;
        } else {
            activeContainer = 1;
        }

        showImage(photos[currentImg - 1], currentContainer, activeContainer);

    };

    var currentZindex = -1;
    var showImage = function(photoObject, currentContainer, activeContainer) {
        animating = true;

        // Make sure the new container is always on the background
        currentZindex--;

        // Set the background image of the new active container
        $("#headerimg" + activeContainer).css({
            "background-image" : "url(http://www.bcn.cl/static/img/" + photoObject.image + ")",
            "display" : "block",
            "z-index" : currentZindex
        });

        // Hide the header text
        $("#headertxt").css({"display" : "none"});

        // Set the new header text
        $("#firstline").html(photoObject.firstline);
        $("#secondline")
            .attr("href", photoObject.url)
            .html(photoObject.secondline);
        $("#pictureduri")
            .attr("href", photoObject.url)
            .html(photoObject.title);


        // Fade out the current container
        // and display the header text when animation is complete
        $("#headerimg" + currentContainer).fadeOut(function() {
            setTimeout(function() {
                $("#headertxt").css({"display" : "block"});
                animating = false;
            }, 800);
        });
    };

    var stopAnimation = function() {
        // Change the background image to "play"
        $("#control").css({ "background-image" : "url(images/btn_play.png)" });

        // Clear the interval
        clearInterval(interval);
    };

    // We should statically set the first image
    navigate("next");

    // Start playing the animation
    interval = setInterval(function() {
        navigate("next");
    }, slideshowSpeed);

});
