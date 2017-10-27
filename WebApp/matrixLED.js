    var socket;
    var firstconnect = true,
        i2cNum  = "0x70",
	dispR = [],
	dispG = [];
	var color = 0;
	var cList = [[],[],[],[],[],[],[],[]];
	

// Create a matrix of LEDs inside the <table> tags.
var matrixData;
for(var j=7; j>=0; j--) {
	matrixData += '<tr>';
	for(var i=0; i<8; i++) {
	    matrixData += '<td><div class="LED" id="id'+i+'_'+j+
		'" onclick="LEDclick('+i+','+j+')">'+
		i+','+j+'</div></td>';
	    }
	matrixData += '</tr>';
}
$('#matrixLED').append(matrixData);

// The slider controls the overall brightness
$("#slider1").slider({min:0, max:15, slide: function(event, ui) {
	socket.emit("i2cset",  {i2cNum: i2cNum, i: ui.value+0xe0, disp: 1});
    }});

// Send one column when LED is clicked.
function LEDclick(i, j) {
//	alert(i+","+j+" clicked");
    if((dispG[i] & 0x1<<j) !== 0x1<<j){
        if((dispR[i] & 0x1<<j) !== 0x1<<j){
            dispG[i] ^= 0x1<<j;
        } else {
            dispR[i] ^= 0x1<<j;
        }
    } else {
        if((dispR[i] & 0x1<<j) !== 0x1<<j){
            dispR[i] ^= 0x1<<j;
        } else {
            dispG[i] ^= 0x1<<j;
        }
    }
    
    
    
    
    //New code

    //End
    
    //A change was made in the line below
    //
    
    
    
    socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+dispG[i].toString(16)});
			     
	socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i + 1, 
			     disp: '0x'+dispR[i].toString(16)});
			     
			     
	//Change was made in the line above
			     
//	socket.emit('i2c', i2cNum);
    // Toggle bit on display
    
    
    
    if(dispG[i]>>j&0x1 === 1) {
        if(dispR[i]>>j&0x1 === 1) {
            $('#id'+i+'_'+j).addClass('onYellow');
            $('#id'+i+'_'+j).removeClass('onGreen');
            $('#id'+i+'_'+j).removeClass('onRed');
        } else {
            $('#id'+i+'_'+j).removeClass('onYellow');
            $('#id'+i+'_'+j).addClass('onGreen');
            $('#id'+i+'_'+j).removeClass('onRed');
        }
    } else {
        if(dispR[i]>>j&0x1 === 1) {
            $('#id'+i+'_'+j).addClass('onRed');
        } else {
            $('#id'+i+'_'+j).removeClass('onRed');
        }
        $('#id'+i+'_'+j).removeClass('onGreen');
        $('#id'+i+'_'+j).removeClass('onYellow');
    }
        
}

    function connect() {
      if(firstconnect) {
        socket = io.connect(null);

        // See https://github.com/LearnBoost/socket.io/wiki/Exposed-events
        // for Exposed events
        socket.on('message', function(data)
            { status_update("Received: message " + data);});
        socket.on('connect', function()
            { status_update("Connected to Server"); });
        socket.on('disconnect', function()
            { status_update("Disconnected from Server"); });
        socket.on('reconnect', function()
            { status_update("Reconnected to Server"); });
        socket.on('reconnecting', function( nextRetry )
            { status_update("Reconnecting in " + nextRetry/1000 + " s"); });
        socket.on('reconnect_failed', function()
            { message("Reconnect Failed"); });

        socket.on('matrix',  matrix);

    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x21, disp: 1}); // Start oscillator (p10)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x81, disp: 1}); // Disp on, blink off (p11)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0xe7, disp: 1}); // Full brightness (page 15)
    /*
	i2c_smbus_write_byte(file, 0x21); 
	i2c_smbus_write_byte(file, 0x81);
	i2c_smbus_write_byte(file, 0xe7);
    */
        // Read display for initial image.  Store in disp[]
        socket.emit("matrix", i2cNum);

        firstconnect = false;
      }
      else {
        socket.socket.reconnect();
      }
    }

    function disconnect() {
      socket.disconnect();
    }


    // When new data arrives, convert it and display it.
    // data is a string of 16 values, each a pair of hex digits.
    function matrix(data) {
        var i, j;
        dispR = [];
        dispG = [];
        //        status_update("i2c: " + data);
        // Make data an array, each entry is a pair of digits
        data = data.split(" ");
        //        status_update("data: " + data);
        // Every other pair of digits are Green. The others are red.
        // Ignore the red.
        // Convert from hex.
        console.log(data);
        for (i = 0; i < data.length; i += 2) {
            dispR[(i / 2)] = parseInt(data[i + 1], 16);
            dispG[(i /2)] = parseInt(data[i], 16);
        }
        //        status_update("disp: " + disp);
        // i cycles through each column
        for (i = 0; i < dispG.length; i++) {
            // j cycles through each bit
            for (j = 0; j < 8; j++) {
                if (((dispG[i] >> j) & 0x1) === 1) {
                    if (((dispR[i] >> j) & 0x1) === 1) {
                        $('#id' + i + '_' + j).addClass('onYellow');
                        $('#id' + i + '_' + j).removeClass('onRed');
                        $('#id' + i + '_' + j).removeClass('onGreen');
                    } else {
                        $('#id' + i + '_' + j).addClass('onGreen');
                        $('#id' + i + '_' + j).removeClass('onRed');
                        $('#id' + i + '_' + j).removeClass('onYellow');
                    }
                } else if (((dispR[i] >> j) & 0x1) === 1) {
                    $('#id' + i + '_' + j).removeClass('onGreen');
                    $('#id' + i + '_' + j).removeClass('onYellow');
                    $('#id' + i + '_' + j).addClass('onRed');
                } else {
                    $('#id' + i + '_' + j).removeClass('onRed');
                    $('#id' + i + '_' + j).removeClass('onGreen');
                    $('#id' + i + '_' + j).removeClass('onYellow');
                }
            }
        }
    }

    function status_update(txt){
	$('#status').html(txt);
    }

    function updateFromLED(){
      socket.emit("matrix", i2cNum);    
    }

connect();

$(function () {
    // setup control widget
    $("#i2cNum").val(i2cNum).change(function () {
        i2cNum = $(this).val();
    });
});
