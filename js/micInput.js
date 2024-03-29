function webaudio_tooling_obj () {
    var audioContext = new AudioContext();
    
	timeRadius = 0;
	oldDrawX = 0;
	oldDrawY = 0;
	input = null;
	radius = 0;
	sprite = null;
	oldTime = 0;
	oldNote = 0;
	
	AMOUNT = 100;

    var BUFF_SIZE = 16384;

    var audioInput = null,
        microphone_stream = null,
        gain_node = null,
        script_processor_node = null,
        script_processor_fft_node = null,
        analyserNode = null;

    if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia){
        navigator.getUserMedia({audio:true}, 
          function(stream) {
              start_microphone(stream);
          },
          function(e) {
            alert(e);
          }
        );

    } else { alert('getUserMedia not supported in this browser.'); }

     function start_microphone(stream){
	      gain_node = audioContext.createGain();
	      gain_node.connect( audioContext.destination );
	
	      microphone_stream = audioContext.createMediaStreamSource(stream);
	      microphone_stream.connect(gain_node); 
	
	      script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);

	      microphone_stream.connect(script_processor_node);
	
	      gain_node.gain.value = 0;
	
	      script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
	      script_processor_fft_node.connect(gain_node);
	
	      analyserNode = audioContext.createAnalyser();
	
	      analyserNode.smoothingTimeConstant = 0;
	      analyserNode.fftSize = 2048;
	
	      microphone_stream.connect(analyserNode);
	
	      analyserNode.connect(script_processor_fft_node);
	
	      script_processor_fft_node.onaudioprocess = function() {
	      	 array = new Uint8Array(analyserNode.frequencyBinCount);
	      	 analyserNode.getByteFrequencyData(array);

             for (var i = 0; i < AMOUNT; i++) {
            	 averageValue += array[i];
             }
             
             averageValue = averageValue / AMOUNT;
             
             largestValue = Math.max.apply(null, array);
            
             largestFreq = array.indexOf(largestValue);

			 dominance = largestValue / averageValue;
         };
     }
}