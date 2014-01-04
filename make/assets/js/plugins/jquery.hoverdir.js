(function( $, undefined ) {
		
	/*
	 * HoverDir object.
	 */
	$.HoverDir 				= function( options, element ) {
	
		this.$el	= $( element );
		
		this._init( options );
		
	};
	
	$.HoverDir.defaults 	= {
		hoverDelay	: 0,
		reverse		: false
	};
	
	$.HoverDir.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.HoverDir.defaults, options );
			
			// load the events
			this._loadEvents();
			
		},
		_loadEvents			: function() {
			
			var _self = this;
			
			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
				
				var $el			= $(this),
					evType		= event.type,
					$hoverElem	= $el.find( '.back' ),
					direction	= _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					cssPos    =   _self._getPosition( direction, $el );
				
				
				if( evType === 'mouseenter' ) {
					 console.log(cssPos)
					$hoverElem.css( { "left" : cssPos.from, "top" : cssPos.to } );
					
					clearTimeout( _self.tmhover );
					
					_self.tmhover	= setTimeout( function() {
						
						$hoverElem.show( 0, function() {
							$(this).stop().animate( { "top" : 0, "left" : 0 } , 300 );
						} );
						
					
					}, _self.options.hoverDelay );
					
				}
				else {
				
					$hoverElem.stop().animate( { "left" : cssPos.from, "top" : cssPos.to }, 300, function(){
                                            $hoverElem.hide();
                                        } );
					
					clearTimeout( _self.tmhover );
					
				}
					
			} );
			
		},
		_getDir				: function( $el, coordinates ) {
			
				/** the width and height of the current div **/
			var w = $el.width(),
				h = $el.height(),

				/** calculate the x and y to get an angle to the center of the div from that x and y. **/
				/** gets the x value relative to the center of the DIV and "normalize" it **/
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
			
				/** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
				/** first calculate the angle of the point, 
				add 180 deg to get rid of the negative values
				divide by 90 to get the quadrant
				add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
			
			return direction;
			
		},
		_getPosition			: function( direction, $el ) {
			
			var fromLeft, fromTop;
			
			switch( direction ) {
				case 0:
					// from top
					if ( !this.options.reverse ) { fromLeft = 0, fromTop = - $el.height() }
                                        else {  fromLeft = 0, fromTop = - $el.height()  }
					
					break;
				case 1:
					// from right
					if ( !this.options.reverse ) { fromLeft = $el.width()  , fromTop = 0}
                                        else {  fromLeft = - $el.width() , fromTop = 0 }
					break;
				case 2:
					// from bottom
					if ( !this.options.reverse ) { fromLeft = 0 , fromTop = $el.height() }
                                        else {  fromLeft = 0, fromTop = - $el.height()  }
					break;
				case 3:
					// from left
					if ( !this.options.reverse ) {fromLeft = -$el.width()  , fromTop = 0}
                                        else {  fromLeft =  $el.width(), fromTop = 0 }
					break;
			};
			
			return { from : fromLeft, to: fromTop };
					
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.hoverdir			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				
				if ( !instance ) {
					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for hoverdir instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				if ( !instance ) {
					$.data( this, 'hoverdir', new $.HoverDir( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );