/**
tooltip鎻愮ず
*/
$(function() {  
    $('.widge_tags li a').tooltip({  
      container: 'body'
    })
	$('.w-readers').tooltip({  
    selector: "[data-toggle=tooltip]",  
    container: "body"
    })
    $('.favorite').tooltip()
	$('.social_a a').tooltip({  
    container: "body"
    }) 	
	$('.author i').tooltip({  
    container: "body"
    })
	$('.weibo a').tooltip({  
    container: "body"
    })
	$('.mail a').tooltip({  
    container: "body"
    }) 	
	$('.postauthor-right .name').tooltip({  
    container: "body"
    }) 	
})
/**
 * 鍒嗕韩鎸夐挳
 */
$(function(){

    bodyh = $(window).height();
    bodyw = $(window).width();
    $(".share-item").css({
         "top":bodyh/3 +"px",
        "left":bodyw/2-140+"px",
    });
    
    
    $("a.share-btn").click(function(){
    
            $( ".share-box" ).fadeToggle();
    
    });
    $(".mask").click(function(){
    
            $( ".share-box" ).fadeToggle();
    
    });

});
/**
 * 鍏虫敞鎴戜滑
 */
$(function(){
	$('.mfp-follow-link').click(function(){
		$('.reveal-modal').fadeToggle();
	});
	$(".leftsocialmask").click(function(){
		$( ".reveal-modal" ).fadeToggle();
	});
});


/**
 * Handles toggling the main navigation menu for small screens.
 */
jQuery( document ).ready( function( $ ) {
	var $sitetopbar = $( '#sitetopbar' ),
	    timeout = false;

	$.fn.smallMenu = function() {
		$sitetopbar.find( '.site-nav' ).removeClass( 'left-menu' ).addClass( 'main-small-navigation' );
		$sitetopbar.find( '.site-nav h1' ).removeClass( 'minimenu-text' ).addClass( 'menu-toggle' );

		$( '.menu-toggle' ).unbind( 'click' ).click( function() {
			$sitetopbar.find( '.menu' ).toggle();
			$( this ).toggleClass( 'toggled-on' );
		} );
	};

	// Check viewport width on first load.
	if ( $( window ).width() < 600 )
		$.fn.smallMenu();

	// Check viewport width when user resizes the browser window.
	$( window ).resize( function() {
		var browserWidth = $( window ).width();

		if ( false !== timeout )
			clearTimeout( timeout );

		timeout = setTimeout( function() {
			if ( browserWidth < 600 ) {
				$.fn.smallMenu();
			} else {
				$sitetopbar.find( '.site-nav' ).removeClass( 'main-small-navigation' ).addClass( 'left-menu' );
				$sitetopbar.find( '.site-nav h1' ).removeClass( 'menu-toggle' ).addClass( 'minimenu-text' );
				$sitetopbar.find( '.menu' ).removeAttr( 'style' );
			}
		}, 200 );
	} );
} );
