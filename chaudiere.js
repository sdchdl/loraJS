var txPayload1 = [];
var notified = 0;

L.on("tx", 'led.blink(LED1,1);');

function chaudiere() {
	
	T.init();
	
	function temperature() {
		var temp = T.read()
		if (temp >= 30 && !notified) {
			txPayload1 = temp;
			L.send( 20, txPayload1, function() {
				L.send( 20, txPayload1);  // 1 retry
			});				
			notified = 1;
		}
		if (temp < 30 && notified) {
			txPayload1 = temp;
			L.send( 20, txPayload1, function() {
				L.send( 20, txPayload1);  // 1 retry
			});	
			notified = 0;
		}
	}
	setInterval(temperature, 4000);
}

L.on('init', 'chaudiere()');

B.on('short', function() { if (notified) { led.blink(LED2, 1); } else { led.blink(LED1,1); } });
