$(document).ready(function(){
$('.responsive').slick({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false
        }
    },  {
        breakpoint: 580,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
$('.responsive2').slick({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
$('.responsive3').slick({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});

// Instance the tour
    var tour = new Tour({
        steps: [
            {
                element: "#first-element",
                title: "Manage Classes",
                placement: "top",
                content: "<img src='assets/images/logo-signup.png' width='60' height='60' align='left'/> Here you can manage the classes you've created"
            },
            {
                element: "#second-element",
                title: "Manage Exercises",
                placement: "top",
                content: "<img src='assets/images/logo-signup.png' width='60' height='60' align='left'/> Here you can manage your exercise sets"
            },
            {
                element: "#third-element",
                title: "Explore Disciplines",
                placement: "top",
                content: "<img src='assets/images/logo-signup.png' width='60' height='60' align='left'/> Here you can explore disciplines"
            },
            {
                element: "#fourth-element",
                title: "Pending Tasks",
                placement: "top",
                content: "<img src='assets/images/logo-signup.png' width='60' height='60' align='left'/> Here you can have quick access to your pending tasks"
            }
        ],
        backdrop:true,
        duration:500000,
    });

// Initialize the tour
    tour.init();

// Start the tour
    tour.start();

    $("#start-tour").click(function() {
        //alert('hello');
        tour.restart(true);
    });
});