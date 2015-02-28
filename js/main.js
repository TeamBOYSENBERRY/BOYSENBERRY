
/*   Loading the book   */

jQuery(function($) {

    function menuToggle()
    {
        var windowWidth = $(window).width();

        if(windowWidth > 767 ){
            $('#book').turn({
                height: 800,
                display:'double',
                acceleration: true,
                elevation:50,
                gradients: true,
                autoCenter: true
            });
        }else{
            $('#book').turn({
                height: 800,
                display:'single',
                acceleration: true,
                elevation:50,
                gradients: true,
                autoCenter: true
            });
        }
    }

    menuToggle();
});
