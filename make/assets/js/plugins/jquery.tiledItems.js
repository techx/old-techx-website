/*
Plugin: jQuery Tiled Items
Version 1.0
Author: Max Bos
Twitter: @grafixes
Author URL: http://www.grafixes.com
Author URL: http://www.themeshifters.com

Copyright 2013 Grafixes

*/

(function( $ ){
	
	var $window = $(window);
	var windowHeight = $window.height();
	
	$window.resize(function () {
		windowHeight = $window.height();
	});	

	$.fn.tiledItems = function(options) {
		
		var defaults = {
			rows : 3
		}
		
		var settings = $.extend({}, defaults, options);
		
		var $this = $(this),
			$container = $(this).find('.tiled-items'),
			$itemsContainer = $container.find('.items-container'),
			$item = $container.find('.item'),
			itemLength = $item.length;
		
		function update(){
			
			var containerHeight = windowHeight - $('#top').innerHeight() - $('#main-nav').innerHeight(),
				itemSize = containerHeight / settings.rows,
				itemsContainerWidth = (Math.round(itemLength / settings.rows) * itemSize);
			
			if (itemsContainerWidth < $container.width()) {
				itemsContainerWidth = $container.width()
			}
			
			$this.css({
				'height': containerHeight
			});
			
			$container.css({
				'height': containerHeight
			});
			
			$itemsContainer.css({
				'width': itemsContainerWidth,
				'height': containerHeight
			});
			
			$itemsContainer.find('.item').css({
				'width': itemSize,
				'height': itemSize
			});
			
			
			function on_click() {
				var currentWidth = $window.width() - parseInt($itemsContainer.css('margin-left'));
				var getDifference = itemsContainerWidth - currentWidth;
				
				return getDifference;
			}
			
			
				// Navigation
				$container.find('.direction-nav').on('click', 'a', function(e){
					var marginNumber = Math.ceil(3 * itemSize);
					function getMargin(type) {
						
						
						if (type === 'left') {
							if ( on_click() < marginNumber ) {
								marginNumber = Math.round(on_click());
							} else if ( on_click() === 0 ) {
								marginNumber = 0;
							}
						} else if (type === 'right') {
							if ( parseInt($itemsContainer.css('margin-left')) >= 0 ) {
								marginNumber = 0;
							} else if ( -parseInt($itemsContainer.css('margin-left')) < marginNumber ) {
								marginNumber = -parseInt($itemsContainer.css('margin-left'))
							}
						}
						return marginNumber;
					}
					
					if ( $(this).hasClass( 'next' ) ) {
						$itemsContainer.stop().animate({
							'margin-left': '-=' + getMargin('left')
						}, 500);
					} else if ( $(this).hasClass('prev') ) {
						$itemsContainer.stop().animate({
							'margin-left': '+=' + getMargin('right')
						}, 500);
					}
					
					$window.resize(function(){
						$itemsContainer.stop().animate({
							'margin-left': '0'
						}, 500);
					});
					
					e.preventDefault();
					
				});
		}
		
		$window.resize(update);
		update();
		
					// Add Magnific Popup Images Gallery
					$container.find( '.item-zoom' ).magnificPopup({
						type: 'image',
						gallery: {
							enabled: true
						}
					});
					
					// Add Magnific Popup for the Item Details
					$container.find( '.item-link' ).magnificPopup({
						type: 'ajax',
						ajax: {
							settings: {
								cache: false
							}
						}, 
						alignTop: true,
						overflowY: 'scroll',
						removalDelay: 300,
						mainClass: 'mfp-zoom-in',
						callbacks: {
							updateStatus: function(data) {
								if(data.status === 'ready') {
									$('.item-media.flexslider').flexslider({
										animation: "fade",
										slideshow: true,
										controlNav: false,
										useCSS: false
									});
									$('.item-media.video').fitVids();
								}
							}
						}
					});
					
					// Add Direction Aware Hover
					$container.find( '.item' ).each( function() {
						$(this).hoverdir({
							hoverDelay : 0
						});
					});
		
	};
})(jQuery);