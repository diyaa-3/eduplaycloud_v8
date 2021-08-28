$( document ).ready(function() {
$(window).scroll(function(){
    if ($(window).scrollTop() >= 20) {
        $('header').addClass('fixed-header');
    }
    else {
        $('header').removeClass('fixed-header');
    }
});
});
// Page Scroll
jQuery(document).ready(function ($) {
    $('a.p[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 32
                }, 1000);
                return false;
            }
        }
    });
});

/*profile-upload*/
$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload-nw").on('change', function(){
        readURL(this);
    });

    $(".profile-pic").on('click', function() {
        $(".file-upload-nw").click();
    });
    $(".change-pic").on('click', function() {
        $(".file-upload-nw").click();
    });

});
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}
$$('.pie').forEach(function(pie) {
    var p = parseFloat(pie.textContent);
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    var circle = document.createElementNS(NS, "circle");
    var title = document.createElementNS(NS, "title");
    circle.setAttribute("r", 16);
    circle.setAttribute("cx", 16);
    circle.setAttribute("cy", 16);
    circle.setAttribute("stroke-dasharray", p + " 100");
    svg.setAttribute("viewBox", "0 0 32 32");
    title.textContent = pie.textContent;
    pie.textContent = '';
    svg.appendChild(title);
    svg.appendChild(circle);
    pie.appendChild(svg);
});


/*langues*/

/*$("#lang_picker").change(function() {

    var lang = $(this).val();
    if(lang == 'ar'){
        $('head').append('<link rel="stylesheet" href="css/rtl.css" media="all" type="text/css">');
        $('html').attr('dir','rtl');
    } else {
        $('link[rel=stylesheet][href~="css/rtl.css"]').remove();
        $('html').attr('dir','');
    }
});*/


////select js////
$('.cstm-drpdwn').click(function () {
    $menu.toggle();
});
$('.open_filter').click(function (e) {
    $('.slct_drop_box').toggleClass('show-menu');
    e.stopPropagation();
});
$('body,html').click(function (e) {

    var menusect = $(".slct_drop_box");

    if (!menusect.is(e.target) && menusect.has(e.target).length === 0) {
        menusect.removeClass('show-menu');

    }
});

/////counter-js
Number.prototype.comma = function() {
    var parts = this.toString().split(".");
    console.log(parts);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

$('[data-counter]').each(function () {
    var num = $(this).data('counter');
    $(this).prop('Counter',num*0.8).animate({
        Counter: num
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            // $(this).text(Math.ceil(now).comma());
            $(this).text(Math.ceil(now).toLocaleString());
        }
    });
});
/*exersice-pnnel*/
$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});
/*upload_image*/
var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
};

var loadFile2 = function(event) {
    var output = document.getElementById('output2');
    output.src = URL.createObjectURL(event.target.files[0]);
};
$(document).ready(function() {

    $('.collaps_tp').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active-as');
    });

    $('.collaps_tp').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active-as');
    });

});
$('.close_bbt').on('click', function () {
    $('.overlay_body').addClass('dd-none');
});
$( '.dttmpckr' ).on( 'click', function () {
    $( '.picker-switch' ).on( 'click', function () {
        $(this).next().addClass('show');
        $(this).toggleClass('for_click');
        $(this).prev().toggleClass('in');
    });
});
$('#plugin_assets').modal('hide');
$('body').removeClass('modal-open');
$('.modal-backdrop').remove();