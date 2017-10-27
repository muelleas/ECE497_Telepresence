Contained is the solution for hw05

Short Responses

1. In response to the matrix of light values being sent, the beaglebone ignites 
the corresponding LED's to the bits in the 8 value matrix. 

2. When an LED is clicked on the browser, an event occurs where the logic of
which light should turn on next or turn off next is handled. Once the desired
output is determined, it is sent to the beagleBoard via socket.emit and the 
virtual display is updated by adding element tags so the stylesheet will
alter the appearance. 

3. .on 

4. I will create a second array of eight hexadecimal values to control the eight
spaces of the LED array used to turn red lights on/off. With this array, I 
will compose a parallel emit call to turn on the corresponding lights. The
difficulty will be structuring the digital logic such that the three lights
load properly and switch between themselves with the proper click commands.

5. Detailed Below

The matrixLED.js file has been updated to account for dual color work. Click 
once for green light, once more for yellow lihgt, a third time for red, 
and a fourth time to disable the LED.

The functions matrix(data and ledClick(i,j) were adjusted to make this 
functionality possible.

The matric.css file has also been updated to add in style for red and yellow
lights on the display

# Comments from Prof. Yoder
# Found your answers to the questions.  They look good. (ignites?)
# Thanks for the demo.
# Grade:  10/10