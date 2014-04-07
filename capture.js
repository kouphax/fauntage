var page = require('webpage').create();

page.open('index.html', function(){

    var bb = page.evaluate(function() { 
    	var icons = document.querySelectorAll('.fa');
    	var refs = {};

    	Array.prototype.forEach.call(icons, function(icon) {
    		var br = icon.getBoundingClientRect();
    		var name = icon.classList[1] + ".png"

    		refs[name] = br;
    	});

        return refs; 
    });

    for(var name in bb) if(bb.hasOwnProperty(name)) {
	    page.clipRect = {
	        top:    bb[name].top,
	        left:   bb[name].left,
	        width:  bb[name].width,
	        height: bb[name].height
	    };

	    console.log("Rendering " + name);
	    page.render('./images/' + name);    	
    };

    console.log("Done");

    phantom.exit();
});