APP.templates = (function () {
    'use strict';

    function application() {
        return '<div id="window"><div id="header"><h1>Welcome to Wizards Quest</h1></div><div id="body"></div></div>';
    }
	function selectCamera() {
		return '<div class="select"> <label for="videoSource">Video source: </label><select id="videoSource"></select> </div> <video muted autoplay></video> <button id="cameraButton">Select this Camera</button>';  // <div id="reader" style="width:300px;height:250px"></div><div id="translation"><video> </video> </div></div>
	}
    function home() {
        return '<button id="refreshButton">Translate a Magical Artifact</button><div id="reader" style="width:300px;height:250px"></div><div id="translation"> </div></div>';
    }
	function translateArtifactView() {
		return '<p> <h2> View your artifact through the magical lens to receive a translation: </h2> <p> <div id="reader" style="width:300px;height:250px"></div><p> <h2> Translation: </h2> <div id="translation"> </div></div><button id="closeButton">Close Translator</button>';
	}

    return {
        application: application,
        home: home,
		selectCamera: selectCamera,
		translateArtifactView: translateArtifactView,
    };
}());