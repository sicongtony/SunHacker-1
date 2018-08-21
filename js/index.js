(function($){
	// "use strict";

	var navbarCollapse = function(){
		var nav = $("#mainNav");
		if(nav.length){
			if(nav.offset().top > 100){
				nav.addClass("navbar-shrink");
			}else{
				nav.removeClass("navbar-shrink");
			}
		}else{
			alert("not exist")
		}
		
	}

	navbarCollapse();
	$(window).scroll(navbarCollapse);
})(jQuery);