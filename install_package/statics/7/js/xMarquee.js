      function slide(id){
    	var timer;
    	var elem = document.getElementById(id);
    	var elem1 = elem.getElementsByTagName('ul')[0];
    	var elem2 = document.createElement('ul');
    	var div = elem.getElementsByTagName('div')[0];
    	this.Scroll = Scroll;
    	this.act = act;
    	function Scroll() {
    	    if (elem.scrollLeft >= elem1.offsetWidth) {
    	        elem.scrollLeft -= elem1.offsetWidth;
    	    }
    	    else {
    	        elem.scrollLeft += 1;
    	    }
    	}
    	function act() {
    	    div.appendChild(elem2);
    	    if (elem1.offsetWidth >= elem.offsetWidth) {
    	        elem2.innerHTML = elem1.innerHTML;
    	        timer = setInterval(this.Scroll, 20);
    	        elem.onmouseover = function () {
    	            clearInterval(timer);
    	        }
    	        elem.onmouseout = function () {
    	            timer = setInterval(Scroll, 20);
    	        }
    	    }
    	}
    }
    $(".itscroll").each(function () {
        var sli = new slide($(this).attr("id"));
        sli.act();
    });
