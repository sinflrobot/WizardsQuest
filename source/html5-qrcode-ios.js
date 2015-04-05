APP.QRIOS=(function( $ ){

  $.fn.html5_qrcode_ios = function(qrcodeSuccess, qrcodeError, videoError) {
  	'use strict';
    
    	var captureTag = '<input type="file" id="capture-qr" accept="image/*">' 
    	var canvasTag = '<canvas id="qr-canvas" style="display:none;">' 
    
    	this.append(captureTag);
    	this.append(canvasTag);
             
    	var size_set = false,
      	 qr        = document.querySelector('#capture-qr'),
      	 canvas       = document.querySelector('#qr-canvas'),
      	 width = 200,
      	 height = 200,
      	 scan_timeout = 2000,
      	 localMediaStream = null;

     	qrcode.callback = qrcodeSuccess;
    	
	qr.onchange = function (event) {
           	 // Get a reference to the taken picture or chosen file
            	var files = event.target.files,
                 file,qrsource;

            	if (files && files.length > 0) {
                	file = files[0];
                	try {
                    		// Get window.URL object
                    		var URL = window.URL || window.webkitURL;

                    		// Create ObjectURL
                    		var imgURL = URL.createObjectURL(file);

                    		// Set img src to ObjectURL
                    		qrsource = imgURL;

                    		// Revoke ObjectURL
                    		URL.revokeObjectURL(imgURL);
               		} catch (e) {
                    		try {
                        		// Fallback if createObjectURL is not supported
                        		var fileReader = new FileReader();
                        		fileReader.onload = function (event) {
                          		qrsource = event.target.result;
                        		};
                        		fileReader.readAsDataURL(file);
                    		} catch (e) {
                        		var error = document.querySelector("#error");
                        		if (error) {
                            			error.innerHTML = "Neither createObjectURL or FileReader are supported";
                       			}
                    		}
                	}
			try {
			  	if (!size_set) {  
			    		height = qr.Height / (qr.Width/width);
			    		qr.setAttribute('width', width);
			    		qr.setAttribute('height', height);
			    		canvas.setAttribute('width', qr.Width);
			    		canvas.setAttribute('height',qr.Height);
			    		size_set=true;
			  	}
				var drawing = new Image();
				drawing.src = qr.value;
				drawing.onload = function() {
   				canvas.getContext('2d').drawImage(qr.value, 0, 0, width, height);};
			} catch (e) {
			  	// Fix FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=879717
			  	if (e.name == "NS_ERROR_NOT_AVAILABLE") {
			    	
			  	} else {
			   		throw e;
			  	}
			}

			try {
			  	qrcode.decode();
			} catch(e) {
			  	qrcodeError(e);
			}
	   	}
        };
    
  }; // end of html5_qrcode
})( jQuery );
