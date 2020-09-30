$(document).ready(function(){

	var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {
        $('.test-date').prop('type', 'date');
        $('.btn-top').addClass('btn-xs').removeClass('btn-sm');
    }
	
    $('.fde').hide();
	$('.filter').hide();
	$('#btn-add-filter').click(function(){
		$('.filter').show();
		$('#btn-add-filter').hide();
	});
    
	
	var url = window.location;
    var element = $('ul.sidebar-nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }

      function setHeight() {
        var windowHeight = $(window).innerHeight();
        $('.main').css('min-height', windowHeight);
    };
    setHeight();
    
    $(window).on('resize', function() {
        setHeight();
    });

	$(".fullscreen-toggle").on("click", function() {
        document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
    })


 $('.select-tabs').on('change', function () {
    $(':selected', this).tab('show');
     $($.fn.dataTable.tables(true)).DataTable()
     .columns.adjust()
     .responsive.recalc();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
  $($.fn.dataTable.tables(true)).DataTable()
     .columns.adjust()
     .responsive.recalc();
});    


$('#sidebar-nav').metisMenu();
 $('[data-toggle="tooltip"]').tooltip();
$('#sidebar-nav li ul').parent().addClass('parent-menu');

  $('#sidebar-nav > li').hover(function(){
      $(this).addClass('nav-hover');
   }, function(){
      $(this).removeClass('nav-hover');
   })

// SIDEBAR TOGGLE
    $('.sidebar-switch').on('click', function () {
        if (parseInt($(window).width()) < 1170.99) {
            $('.content-wrapper').removeClass('sidebar-toggle');
            $('.content-wrapper').toggleClass('sidebar-toggle-sm');
        }
        else if (parseInt($(window).width()) > 1170.99) {
            $('.content-wrapper').toggleClass('sidebar-toggle');
        }
    });
    
    $(window).on('resize', function() {
        if ($(window).width() > 1170.99) {
            $('.content-wrapper').removeClass('sidebar-toggle-sm');
        }
        else if ($(window).width() < 1170.99) {
            $('.content-wrapper').removeClass('sidebar-toggle');
        }
    });



    $('.sidebar-container') .css({'height': (($(window).height()))+'px'});
    $(window).on('resize', function(){
        $('.sidebar-container') .css({'height': (($(window).height()))+'px'});
    });


    // SIDEBAR SCROLLPANE
    $('.sidebar-scrollpane').each(function() {
        $(this).jScrollPane({
            autoReinitialise: true
        })
        
        .on('mousewheel',function(e){
            e.preventDefault();
        });
        
        var api = $(this).data('jsp');
        var throttleTimeout;
        $(window).on('resize',function() {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(function(){
                    api.reinitialise();
                    throttleTimeout = null;
                },
                50
                );
            }
        });
    });

    $('.menu-alias').click(function(){
        console.log('tess');
        localStorage.setItem('menu_alias_am', $(this).attr('menu_alias'));
    })

}); //END
