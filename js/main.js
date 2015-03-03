
/*   Loading the book   */

jQuery(function($) {

    $book = this;
    this.$elem = document.getElementsByClassName('sj-book');
    var display;

    $(window).on('resize', function() {
        var windowWidth = $(window).width();


        if (windowWidth < 768) {
            display = 'single';
            //$('.own-size').css("width", 300);
            $($book.$elem).turn('display', display);
            $($book.$elem).turn('size', windowWidth, 800);
            $('.own-size').css("width", windowWidth/2);
            $('.own-size').css("height", 582);

            $('.hard').css("width", windowWidth);

        } else {
            display = 'double';
            windowWidth *= 0.9;
            $($book.$elem).turn('display', display);
            $($book.$elem).turn('size', windowWidth*0.9, 800);
            $('.own-size').css("width", windowWidth*0.9/2*0.977);
            $('.own-size').css("height", 582);
            $('.hard').css("width", windowWidth*0.9/2);
        }

    });

    $('.paper').each(function(index) {
        $(this).append("<div style='width: 10%;margin: auto;border-top: 1px solid grey'><p style='margin-top: 0'>"+(index+2)+"</p></div>")
    });

    function menuToggle()
    {
        var windowWidth = $(window).width();


        if (windowWidth < 768) {
            display = 'single';
            //$('.own-size').css("width", 300);

        } else {
            display = 'double';
            windowWidth *= 0.9;
            $('.own-size').css("width", windowWidth/2*0.977);
        }


        $('.sj-book').turn({
            width: windowWidth,
            height: 800,
            display:display,
            acceleration: true,
            elevation:50,
            gradients: true,
            autoCenter: true,
            duration: 1000,
            when: {
                turning: function(e, page, view) {

                    var book = $(this),
                        currentPage = book.turn('page'),
                        pages = book.turn('pages');

                    if (currentPage>3 && currentPage<pages-3) {

                        if (page==1) {
                            book.turn('page', 2).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        } else if (page==pages) {
                            book.turn('page', pages-1).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        }
                    } else if (page>3 && page<pages-3) {
                        if (currentPage==1) {
                            book.turn('page', 2).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        } else if (currentPage==pages) {
                            book.turn('page', pages-1).turn('stop').turn('page', page);
                            e.preventDefault();
                            return;
                        }
                    }

                    updateDepth(book, page);

                    if (page>=2)
                        $('.sj-book .p2').addClass('fixed');
                    else
                        $('.sj-book .p2').removeClass('fixed');

                    if (page<book.turn('pages'))
                        $('.sj-book .p9').addClass('fixed');
                    else
                        $('.sj-book .p9').removeClass('fixed');

                    Hash.go('page/'+page).update();

                },

                first: function(event) {
                    console.log($(this).turn('page'));
                    if (display == 'single') {

                        if ($(this).turn('page') == 2) {
                            $(this).turn('page', 3);
                        }
                    }
                },

                turned: function(e, page, view) {

                    var book = $(this);

                    if (page==2 || page==3) {
                        book.turn('peel', 'br');
                    }

                    updateDepth(book);

                    $('#slider').slider('value', getViewNumber(book, page));

                    book.turn('center');
                    $('.sj-book').turn('resize');
                },

                start: function(e, pageObj) {



                },

                end: function(e, pageObj) {

                    var book = $(this);

                    updateDepth(book);

                    setTimeout(function() {

                        $('#slider').slider('value', getViewNumber(book));

                    }, 1);



                },

                missing: function (e, pages) {

                    for (var i = 0; i < pages.length; i++) {
                        addPage(pages[i], $(this));
                    }

                }
            }
        });

    }

    menuToggle();
});
