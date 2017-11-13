Curtis Humm and Andrew Mueller
ECE497 Telepresence Documentation

Setup and Initialization 

Go into rc_test_motors and run the Makefile
Go into flask and run the install
Follow the instructions here http://www.instructables.com/id/Raspberry-Pi-remote-webcam/ making sure to leave the port as the defult (8081)

User Instructions 
Use the commmand ./run.sh to begin the operation
Navigate to 192.167.7.2:5000, you should see the control buttons, Video Feed, and LCD text input
In web applet, use forward, back, left, and right to control the wheel, and stop to halt the robot. 
Type text into the enter bar and press echo to update the LCD Display

To Exit the Program
Press the end button to halt the program, then ctrl-c out of both terminals of the t-mux
Run the command ./close.sh to stop the camera

