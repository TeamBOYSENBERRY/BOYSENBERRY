
/*   Loading the book   */

jQuery(function($) {

    $book = this;
    this.$elem = document.getElementsByClassName('sj-book');

    $(window).on('resize', function() {
        $windowWidth = $(window).width();

        if ($windowWidth < 768) {
            $display = 'single';
            //$('.own-size').css("width", 300);
            $($book.$elem).turn('display', $display);
            $($book.$elem).turn('size', $windowWidth, 800);
            //$('.own-size').css("width", windowWidth/2);
            //$('.own-size').css("height", 582);

            $('.hard').css("width", $windowWidth);

        } else {
            $display = 'double';
            $windowWidth *= 0.9;
            $($book.$elem).turn('display', $display);
            $($book.$elem).turn('size', $windowWidth*0.9, 800);
            //$('.own-size').css("width", windowWidth*0.9/2*0.977);
            //$('.own-size').css("height", 582);
            $('.hard').css("width",$windowWidth*0.9/2);
        }

    });

    function loadPage(page) {

        $.ajax({url: 'pages/page' + page + '.html'}).
            done(function(pageHtml) {
                $('.sj-book .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
            });

    }

    Hash.on('^page\/([0-9]*)$', {
        yep: function(path, parts) {

            var page = parts[1];

            if (page!==undefined) {
                if ($('.sj-book').turn('is'))
                    $('.sj-book').turn('page', page);
            }

        },
        nop: function(path) {

            if ($('.sj-book').turn('is'))
                $('.sj-book').turn('page', 1);
        }
    });

    $('.paper').each(function(index) {
        $(this).append("<div style='position: absolute; bottom: 0;width: 10%;margin: auto;padding-top: 10px;border-top: 1px solid grey'><p style='margin-top: 0'>"+(index+2)+"</p></div>")
    });

    $(window).keydown(function(e) {
        if (e.keyCode==37)
            $('.sj-book').turn('previous');
        else if (e.keyCode==39)
            $('.sj-book').turn('next');
    });

    function menuToggle()
    {
        $windowWidth = $(window).width();
        if ($windowWidth < 768) {
            $display = 'single';
            //$('.own-size').css("width", 300);

        } else {
            $display = 'double';
            //$('.own-size').css("width", $windowWidth/2*0.977);
        }


        $('.sj-book').turn({
            width: $windowWidth*0.9,
            height: 800,
            display:$display,
            acceleration: true,
            elevation:50,
            gradients: true,
            autoCenter: true,
            duration: 1000,
            when: {
                turning: function(e, page, view) {
                    Hash.go('page/'+page).update();
                }
            }
        });
    }

    menuToggle();
});
