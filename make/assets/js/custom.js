/*
 *
 *		Omni v1.2 - omni.js
 *		Custom JavaScript and jQuery scripts for this theme	
 *
 */


	/*	==================================================
		# Check if website is viewed on a mobile & tablet
		================================================== */
		(function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|android|ipad|playbook|silk|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
		


jQuery(document).ready(function($) {
	
	
	/*	==================================================
		# One Page Navigation
		================================================== */
		$('#main-nav').onePageNav({
			currentClass: 'current-menu-item',
			scrollSpeed: 800,
			scrollOffset: 28,
			scrollThreshold: 0.5
		});
		
	
	/*	==================================================
		# Scroll To
		================================================== */
		$('.scroll-to').click(function(e){
			var href = $(this).attr('href');
			$.scrollTo( $(href), 800 );
			e.preventDefault();
		});
		
	
	/*	==================================================
		# Isotope Portfolio
		================================================== */
		$( '.portfolio' ).each(function(){
				
				var $this = $(this);
				var $container = $this.find( '.portfolio-items' );
				var $filter = $this.find( '.filter' )
				
				$container.imagesLoaded( function(){
					
					// Add Isotope plugin to portfolio-items
					$container.isotope({
						itemSelector: '.item',
						masonry: {
							columnWidth: $container.width() / 12
						}
					});
					
					// update columnWidth on window resize
					$(window).smartresize(function(){
						$container.isotope({
							masonry: { columnWidth: $container.width() / 12 }
						});
					});
					
					// Filter the portfolio items by data filter attribute
					$filter.on('click', 'a', function(e) {
						var selector = $(this).data( 'filter' );
						$container.isotope({
							filter: selector
						});
						$(this).closest( 'li' ).addClass( 'active' ).siblings( 'li' ).removeClass( 'active' );
						
						e.preventDefault();
					});
					
					// Add class 'active' to 'All'
					$filter.find( 'li' ).each(function() {
						var filterData = $(this).find( 'a' ).data( 'filter' );
						if ( filterData === '*' ) {
							$(this).addClass('active');
						}
					});
					
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
										slideshow: false,
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
					
				});
			
		});

		
	/*	==================================================
		# jQuery Plugins only for Desktop and Tablets
		================================================== */
		if ( $(window).width() > 1024 ) {
			if ( $.browser.mobile === false ) {
			
			
			/*	==================================================
				# Parallax
				================================================== */
				$( '.parallax.one' ).parallax("50%", 0.5, true);
				$( '.parallax.two' ).parallax("50%", 0.5, true);
				$( '.parallax.three' ).parallax("50%", 0.5, true);

				
			/*	==================================================
				# Pricing Animation - since v1.2
				================================================== */	
				var css = $("<link>");
				css.attr( { rel: 'stylesheet', type: 'text/css', href: 'assets/css/animate.css' } );
				$('head').append(css);
				
				$( '.price-package' ).hover( function() {
						$(this).removeClass( 'normalize' ).addClass( 'animated enlarge' );	
					}, function() {
						$(this).removeClass( 'enlarge' ).addClass( 'normalize' );
				});
				
			
		/*	==================================================
			# Since v1.2
			================================================== */	
			} else if ( $.browser.mobile === true ) {
				
			/*	==================================================
				# Parallax Fix for Tablet Landscape View
				================================================== */
				$( '.parallax' ).addClass( 'parallax-mobile' );
				
			}
		}
	
	
	/*	==================================================
		# jQuery Plugins only for Desktop
		================================================== */
		if ( $(window).width() > 979 ) {
			if ( $.browser.mobile === false ) {
			
			/*	==================================================
				# Hover Directions
				================================================== */
				$( '.services > .span6' ).each( function() {
					$(this).hoverdir({
						hoverDelay : 0
					});
				});
			
			}	
		}
	

	/*	==================================================
		# Home Element Fader
		================================================== */
		var elementFader = function() {
			$( '.element-fader' ).each( function() {
				
				var $container = $(this),
					elementLength = $(this).find( '.fade-element' ).length;
				
				// Function for each fade element
				$container.find( '.fade-element' ).delay(1400).each(function(index) {
					$(this).delay(3000 * index).fadeIn(1000, function() {
						
						// If fade element is not last element detach the element
						if ( index != elementLength - 1 ) {
							$(this).detach().appendTo($container).delay(800).fadeOut(800);
						}
						
					});
				});
				
			});
		};
		elementFader();
	
	
	/*	==================================================
		# HEADING REVOLUTION SLIDER: Add icons to arrows
		================================================== */
		$( '.fullwidthbanner' ).each(function(){
			$( '.tp-rightarrow.default' ).append('<i class="icon-right-open-mini"></i>');
			$( '.tp-leftarrow.default' ).append('<i class="icon-left-open-mini"></i>');
		});
		

	/*	==================================================
		# Skills Percentage Marker
		================================================== */	
		$( '.progress .bar' ).each(function() {
			var percentage = $(this).data( 'percentage' );
			$(this).append('<span class="percentage-marker">' + percentage + '&#37;</span>');
		});	
		
		
	/*	==================================================
		# Tooltip
		================================================== */
		$( 'body' ).tooltip({
			selector: "a[data-toggle=tooltip]"
		});
	
	
	/*	==================================================
		# Twitter Feed
		================================================== */
		$( '.tweet' ).each(function() {
			var username = $(this).data( 'twitter-username' );
			var count = $(this).data( 'count' );
			$(this).tweet({
				modpath: 'assets/php/twitter/',
				username: username,
				avatar_size: 0,
				count: count,
				template: '{text}{time}'
			});
		}); 
		
	
	/*	==================================================
		# HEADING VIDEO: Load FitVids
		================================================== */
		$( '.home-type .video-bg' ).fitVids();
		
		
	/*	==================================================
		# Load Dark Version (Nightvision)
		================================================== */
		$( '#nightvision' ).click(function(e) {
				
				var cssDark = $( '#css-dark' ).attr( 'href' );
			
				if ( cssDark == '' ) {
					$( '#css-dark' ).attr({href : "assets/css/dark-version.css"});
				} else if ( cssDark == 'assets/css/dark-version.css' ) {
					$( '#css-dark' ).attr({href : ""});
				}
				
				e.preventDefault();
		});
	

	/*	==================================================
		# Add Magnific Popup to Blog Posts - since v1.1
		================================================== */
		$( '.blog-post' ).each( function(e){
			$(this).find( '.item-link' ).magnificPopup({
					type: 'ajax',
					gallery: {
						enabled: true
					},
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
									slideshow: false,
									controlNav: false,
									useCSS: false
								});
							$('.item-media.video').fitVids();
						}
					}
				}
			});
		});
	
	
});


/*	==================================================
	# Carousels (one function) - Since v1.2
	================================================== */
	if ( $( '#testimonials-carousel' ).length > 0 || $( '#team-carousel' ).length > 0 || $( '#clients-carousel' ).length > 0 )
	{
		// store the slider in a local variable
		var $window = $(window),
			flexslider_testimonials,
			flexslider_team,
			flexslider_clients;
		
		// tiny helper function to add breakpoints
		function getGridSize() {
			return	((window.innerWidth || document.documentElement.clientWidth) < 480) ? 1 :
					((window.innerWidth || document.documentElement.clientWidth) > 479 && (window.innerWidth || document.documentElement.clientWidth) < 768) ? 2 :
					((window.innerWidth || document.documentElement.clientWidth) > 767 && (window.innerWidth || document.documentElement.clientWidth) < 980) ? 4 : 4;
			}
		
		// tiny helper function to add breakpoints
		function getGridSizeSecond() {
			return	((window.innerWidth || document.documentElement.clientWidth) < 480) ? 1 :
					((window.innerWidth || document.documentElement.clientWidth) > 479 && (window.innerWidth || document.documentElement.clientWidth) < 768) ? 1 :
					((window.innerWidth || document.documentElement.clientWidth) > 767 && (window.innerWidth || document.documentElement.clientWidth) < 980) ? 3 : 3;
			}
		
		/*$(function() {
			SyntaxHighlighter.all();
		});*/
		
		$window.load(function()
		{
			$( '#testimonials-carousel' ).flexslider({
				animation: "slide",
				slideshow: false,
				itemWidth: 230,
				itemMargin: 10,
				useCSS: false,
				minItems: getGridSize(), // use function to pull in initial value
				maxItems: getGridSize(), // use function to pull in initial value
				start: function(slider){
					flexslider_testimonials = slider;
				}
			});

			$( '#team-carousel' ).flexslider({
				animation: "slide",
				slideshow: false,
				itemWidth: 230,
				itemMargin: 10,
				useCSS: false,
				minItems: getGridSize(), // use function to pull in initial value
				maxItems: getGridSize(), // use function to pull in initial value
				start: function(slider){
					flexslider_team = slider;
				}
			});

			$( '#clients-carousel' ).flexslider({
				animation: "slide",
				slideshow: false,
				controlNav: false,
				itemWidth: 230,
				itemMargin: 45,
				useCSS: false,
				minItems: getGridSizeSecond(), // use function to pull in initial value
				maxItems: getGridSizeSecond(), // use function to pull in initial value
				start: function(slider){
					flexslider_clients = slider;
				}
			});
		});
		
		// check grid size on resize event
		$window.resize(function()
		{
			var gridSize = getGridSize();
			
			if(flexslider_testimonials)
			{
				flexslider_testimonials.vars.minItems = gridSize;
				flexslider_testimonials.vars.maxItems = gridSize;
			}

			if(flexslider_team)
			{
				flexslider_team.vars.minItems = gridSize;
				flexslider_team.vars.maxItems = gridSize;
			}

			if(flexslider_clients)
			{
				gridSize = getGridSizeSecond();

				flexslider_clients.vars.minItems = gridSize;
				flexslider_clients.vars.maxItems = gridSize;
			}
		});
	}


/*	==================================================
	# Mobile Navigation
	================================================== */
	function scrollTo(target){
		$.scrollTo( $(target), 800 );
	}


$(window).load(function() {
	
	
	/*	==================================================
		# Portfolio Slider
		================================================== */
		$( '.portfolio-slider' ).flexslider({
			animation: "fade",
			slideshow: false,
			controlNav: false,
			useCSS: false
		});

	
	/*	==================================================
		# Google Maps
		================================================== */
		(function() {
				var gm = document.createElement('script');
				gm.src = 'http://maps.google.com/maps/api/js?v=3&sensor=false&language=en&callback=gmaps_loaded';
				gm.type = 'text/javascript';
				gm.async = 'true';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gm, s);
				
					window.gmaps_loaded = function() {
						$( '.google-maps' ).each(function() {
							var options = {
								map: {
									address: $(this).data( 'map-address' ),
									options: {
										zoom: $(this).data( 'zoom' ),
										styles: [ {
												stylers: [
													{ hue: '#00bba6' },
													{ saturation: -30 }
												]
										} ],
										scrollwheel: false,
										mapTypeControl: false,
										streetViewControl: false,
									}
								},
								marker: {
									values:[
										{address: $(this).data( 'marker-address' ), options:{icon: "assets/img/marker-dark.png"}}
									],
								}
							};
							$(this).gmap3(options);
						});
					}
		})();
		
	/*	==================================================
		# HEADING TILED ITEMS: Tiled Portfolio
		================================================== */
		
		if ( $(window).width() > 1024 ) {
			if ( $.browser.mobile === false ) {
				
				var $tiledContainer = $( '.tiled-container' );
				
				/* Add tiledItems plugin for tiledContainer
				   The amount of rows can be easily changed */
				$tiledContainer.tiledItems({
					rows: 3
				});
				
				$tiledContainer.find( '.item img' ).addClass( 'grayscale' );
				
				// On #hide-overlay click do this
				$tiledContainer.on('click', '#hide-overlay', function(e){
					$tiledContainer.find( '.overlay' ).fadeOut();
					$tiledContainer.find( '.item img' ).removeClass( 'grayscale' );
					$( '#top' ).find( '.adds' ).append( '<li><a id="show-overlay" class="icon-arrows-ccw" href="#" data-placement="bottom" data-toggle="tooltip" title="Show Overlay"></a></li>' );
					e.preventDefault();
				});
				
				// On #show-overlay click do this
				$( '#top' ).find( '.adds' ).on('click', '#show-overlay', function(e){
					$tiledContainer.find( '.overlay' ).fadeIn();
					$tiledContainer.find( '.item img' ).addClass( 'grayscale' );
					$(this).closest( 'li' ).remove();
					
					e.preventDefault();
				});
			}
		} else if ( $(window).width() < 1024 || $.browser.mobile === true ) {
			
			var $tiledContainer = $( '.tiled-container' );
			
			// On #hide-overlay click do this
			$tiledContainer.on('click', '#hide-overlay', function(e){
				
				var href = $(this).attr('href');
				$.scrollTo( $(href), 800 );
				e.preventDefault();
			});
		
		}
	
	/*	==============================================================
		# HEADING TILED ITEMS: Load the homepage - since v1.1
		============================================================== */
		if ( $(window).width() > 1024 ) {
			if ( $.browser.mobile === false ) {
				$( '.tiled-items' ).fadeIn();
			} else if ( $.browser.mobile === true ) {
				$( '.tiled-items' ).css({
					'display': 'block',
					'height': '550px',
					'background-image': 'url(demo/home/paquidermus-baja.jpg)',
					'background-size': 'cover'
				});
				$( '.tiled-items .overlay' ).css({
					'height': '550px',
					'padding': '60px 0px',
					'position': 'relative',
				});
				$( '.items-container, .tiled-items .direction-nav' ).css('display', 'none');
				$( '.tiled-items .overlay .slogan' ).css('padding', '0px');
			}
		}
	
	/*	==================================================
		# Add affix to One Page Main Navigation
		================================================== */
		var offsetTopNav = $( '.main-nav' ).offset().top;
		$( '.main-nav' ).affix({
			offset: {
					top: function() {
					return offsetTopNav;
				}
			}
		});
		
		$(window).scroll(function(){
			if ( $(document).scrollTop() >= offsetTopNav ) {
				$( '.nav-container' ).css('z-index', 'inherit');
			} else if ( $(document).scrollTop() <= offsetTopNav ) {
				$( '.nav-container' ).css('z-index', 200);
			}
		});
		
	/*	==================================================
		# HEADING TILED ITEMS: Add affix to Home Overlay 
		================================================== */
		if ( $(window).width() > 1024 ) {
			if ( $.browser.mobile === false ) {
				var offsetTopOverlay = $( '#home.tiled-container' ).offset().top;
				$( '#home.tiled-container .overlay, #home.tiled-container .items-container' ).affix({
					offset: {
							top: function() {
							return offsetTopOverlay;
						}
					}
				});
				
				$(window).scroll(function(){
					if ( $(document).scrollTop() >= (offsetTopOverlay +  $( '#home.tiled-container' ).outerHeight()) || $(document).scrollTop() <= offsetTopOverlay )  {
						$( '#home.tiled-container .items-container' ).css('position', 'relative');
						$( '#home.tiled-container .overlay' ).css('position', 'absolute');
					} else if ( $(document).scrollTop() <= (offsetTopOverlay +  $( '#home.tiled-container' ).outerHeight()) ) {
						$( '#home.tiled-container .items-container' ).css('position', 'fixed');
						$( '#home.tiled-container .overlay' ).css('position', 'fixed');
					}
				});
				
			}
		}
		
	
});