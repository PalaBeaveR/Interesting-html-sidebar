$(function() {
    var menu = $(".sidebar-menu");
    var mouseX;
    var mouseY;
    var maxWidth;
    var screenPress = false;
    var touchSesitivity;
    function lerp(elem, prop, start, end, amt, aftx) {
        $(elem).css(prop, (1 - amt) * start + amt * end + aftx);
    };

    $("html").on("mousemove touchmove", function(event) {
        if(event.touches){
            mouseX = event.touches[0].clientX || 0;
            mouseY = event.touches[0].clientY || 0;
            touchSesitivity = 150;
        } else {
            mouseX = event.clientX || 0;
            mouseY = event.clientY || 0;
            touchSesitivity = 25;
        }
        maxWidth = (window.innerWidth || screen.width) * (parseInt(menu.css("max-width"), 10) / 100);
    });

    var loop = setInterval(function() {
        if(menu.hasClass("move") && screenPress) {
            lerp(".move", "width", menu.width(), mouseX, .1, "px");
            if(mouseX > maxWidth) {
                lerp(".move", "border-top-right-radius", parseInt($(".move").css("border-top-right-radius"), 10), Math.round(mouseY / (window.innerHeight || screenHeight) * 100) + (maxWidth - mouseX) / 10, .1, "%");
                lerp(".move", "border-bottom-right-radius", parseInt($(".move").css("border-bottom-right-radius"), 10), 100 - Math.round(mouseY / (window.innerHeight || screenHeight) * 100) + (maxWidth - mouseX) / 10, .1, "%");
            } else {
                lerp(".move", "border-top-right-radius", parseInt($(".move").css("border-top-right-radius"), 10), Math.round(mouseY / (window.innerHeight || screenHeight) * 100), .1, "%");
                lerp(".move", "border-bottom-right-radius", parseInt($(".move").css("border-bottom-right-radius"), 10), 100 - Math.round(mouseY / (window.innerHeight || screenHeight) * 100), .1, "%");
            };
        } else {
            if(menu.width() < maxWidth / 3) {
                lerp(".sidebar-menu", "width", menu.width(), 0, .1, "px");
            } else if(menu.width() > maxWidth / 3) {
                lerp(".sidebar-menu", "width", menu.width(), maxWidth, .1, "px");
            };
            lerp(".sidebar-menu", "border-top-right-radius", parseInt(menu.css("border-top-right-radius")), 0, .1, "%");
            lerp(".sidebar-menu", "border-bottom-right-radius", parseInt(menu.css("border-bottom-right-radius")), 0, .1, "%");
        };
    }, 15);

    $("html").on("mousedown touchstart", function() {
        if(mouseX >= menu.width() - touchSesitivity && mouseX <= menu.width() + touchSesitivity && !menu.hasClass("move")) {
            menu.addClass("move");
            screenPress = true;
            return false;
        }
    });

    $("html").on("mouseup touchend", function() {
        if(menu.hasClass("move")) {
            menu.removeClass("move");
            screenPress = false;
            return false;
        };
    });
})