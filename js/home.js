$(document).load().scrollTop(0);

$(function() {
    $('.nav ul a').bind('click',function(e){
        e.preventDefault();
         var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-60
        }, 500,'swing');
       
    });
});

$(function() {
    $(".staff-pic").hover(function(){
      $(this).find(".overlay").fadeIn('fast');
    },
    function(){
        $(this).find(".overlay").fadeOut('fast');
    });
});

$(function(){
    $('.tile').bind('click', function(event){
        var e = $(this);

        if(e.data('flip')){
            e.revertFlip();
            e.data("flip", false);
        }
        else{
            e.flip({
                direction:'lr',
                color:'#1e1e1e',
                speed:250,
                onBefore: function(){
                    e.html(e.siblings().html());
                    console.log(e.siblings().html());
                }
            });

            e.data("flip", true);
        }
    });
});