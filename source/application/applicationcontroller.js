APP.applicationController = (function () {
    'use strict';
	var cameraId;
    function offlineWarning() {
        alert("This feature is only available online.");
    }

    function pageNotFound() {
        alert("That page you were looking for cannot be found.");
    }
	function showCameraSelect() {
		$("#body").html(APP.templates.selectCamera());
		APP.CameraSelect.run();
		$('#cameraButton').click(function () {
			var cameraId = document.querySelector("#videoSource").value;
			var data = ["cameraId",cameraId];
			APP.database.runQuery("INSERT INTO tbl_setup (id, value) VALUES (?, ?);", data, false);
		$("#body").html(cameraId);
        });
	}
    function showTranslateArtifact() {
        $("#body").html(APP.templates.translateArtifactView());

		 $('#reader').html5_qrcode(function(data){
			$('#translation').html(data);
			},
			function(error){
				//show read errors 
			}, function(videoError){
				//the video stream could be opened
			}
		);
    }



    function route() {
        var page = window.location.hash;
        if (page) {
            page = page.substring(1);
            if (parseInt(page, 10) > 0) {
                //showArticle(page);
            } else {
                pageNotFound();
            }
        } else {
            //showHome();
        }
    }
	function setCameraId(value) {
		if (value.length ==0 ) 
		{
			cameraId  = value[0];
			showTranslateArtifact();
		} else {
			showTranslateArtifact();
		}
        route();
	}

    // This is to our webapp what main() is to C, $(document).ready is to jQuery, etc
    function start(resources, storeResources) {
        APP.database.open(function () {

            // Listen to the hash tag changing
            $(window).bind("hashchange", route);

            // Inject CSS Into the DOM
            $("head").append("<style>" + resources.css + "</style>");

            // Create app elements
            $("body").html(APP.templates.application());

            // Remove our loading splash screen
            $("#loading").remove();
			var data =[];
			APP.database.runQuery("SELECT value FROM tbl_setup WHERE id='cameraId';", [], function (value) { setCameraId(value);});
			var cameraId = data[0];

        });

        if (storeResources) {
            localStorage.resources = JSON.stringify(resources);
        }
    }

		
    return {
        start: start
    };
}());