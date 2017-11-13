This is a program for running the telepresence robto via the web.
robotWebControl.py uses Flask and Socket.io to create a web server that 
serves a page with buttons for controlling the robot.  It sends its commands to
../rc_test_motors/rc_test_motors via a named pipe called 'pipe'.

Run in two windows.
Use run.sh to run in two windows

