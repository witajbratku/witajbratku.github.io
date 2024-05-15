var width = $(window).width();
window.onscroll = function () {
    if ((width >= 1000)) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $("#header").css("background", "#fff");
            $("#header").css("color", "#000");
            $("#header").css("box-shadow", "0px 0px 20px rgba(0,0,0,0.09)");
            $("#header").css("padding", "4vh 4vw");
            $("#navigation a").hover(function () {
                $(this).css("border-bottom", "2px solid rgb(255, 44, 90)");
            }, function () {
                $(this).css("border-bottom", "2px solid transparent");
            });
        } else {
            $("#header").css("background", "transparent");
            $("#header").css("color", "#fff");
            $("#header").css("box-shadow", "0px 0px 0px rgba(0,0,0,0)");
            $("#header").css("padding", "6vh 4vw");
            $("#navigation a").hover(function () {
                $(this).css("border-bottom", "2px solid #fff");
            }, function () {
                $(this).css("border-bottom", "2px solid transparent");
            });
        }
    }
}





var images = []; // Array to store image URLs
var currentIndex = 0; // Current index of the displayed image
var activeCarousel = null; // Variable to store the ID of the active carousel
var lastCarouselID = 0;

function magnify(imglink, photoContainerId) {
    images = []; // Clear previous images
    var carouselId = photoContainerId.replace('photos', 'carousel'); // Extract carousel ID from photo container ID
    lastCarouselID = carouselId;
    activeCarousel = carouselId; // Set the active carousel
    // Extract image URLs from the specified carousel
    $('#' + photoContainerId + ' img').each(function() {
        images.push($(this).attr('src'));
    });
    // Find the index of the clicked image
    currentIndex = images.indexOf(imglink);
    // Display the clicked image
    displayImage(currentIndex, carouselId);
    // Show the magnify view
    $("#magnify").css("display", "flex");
    $("#magnify").addClass("animated fadeIn");
    $("#navigation-bar").css("position", "absolute");
    setTimeout(function () {
        $("#magnify").removeClass("animated fadeIn");
    }, 800);
}


function closemagnify() {
    $("#magnify").addClass("animated fadeOut");
    $("#navigation-bar").css("position", "fixed");
    setTimeout(function () {
        $("#magnify").css("display", "none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background", `url('') center center`);
    }, 800);
}

setTimeout(function () {
    $("#loading").addClass("animated fadeOut");
    setTimeout(function () {
        $("#loading").removeClass("animated fadeOut");
        $("#loading").css("display", "none");
    }, 800);
}, 1650);

function prevImage() {
    if (currentIndex > 0) {
        $("#image_number").remove(); // Remove the current image number
        currentIndex--;
        displayImage(currentIndex, lastCarouselID);
    }
    toggleArrows();
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        $("#image_number").remove(); // Remove the current image number
        currentIndex++;
        displayImage(currentIndex, lastCarouselID);
    }
    toggleArrows();
}


function toggleArrows() {
    // Toggle visibility of previous arrow
    if (currentIndex === 0) {
        $("#prev_button").css("display", "none");
    } else {
        $("#prev_button").css("display", "block");
    }

    // Toggle visibility of next arrow
    if (currentIndex === images.length - 1) {
        $("#next_button").css("display", "none");
    } else {
        $("#next_button").css("display", "block");
    }
}


function displayImage(index, carouselId) {
    $("#img_here").css("background", `url('${images[index]}') center center`);
    // Calculate the current image number
    var currentImageNumber = index + 1;
    // Get the gallery name from the corresponding carousel's h5 text
    var galleryName = $("#" + carouselId + " h5").text().trim();
    // Remove previous image number if exists
    $("#image_number").remove();
    // Display the current image number, gallery name, and total number of images below the image
    $("#img_here").append(`<div id="image_number">${galleryName} ${currentImageNumber}/${images.length}</div>`);
}




// Add event listener for keyboard arrow navigation and closing the magnify view
document.addEventListener('keydown', function(event) {
    if ($("#magnify").css("display") === "flex") { // Check if magnify view is open
        switch(event.keyCode) {
            case 37: // Left arrow key
                prevImage();
                break;
            case 39: // Right arrow key
                nextImage();
                break;
            case 27: // Escape key
                closemagnify();
                break;
        }
    }
});
