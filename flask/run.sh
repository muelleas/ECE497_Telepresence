# Here's how to run the web controlled robot
# sudo ../python/balance.py < pipe & 
# ./robotWebControl.py

../Display/on.sh
sudo service motion start
modprobe fbtft_device name=adafruit28 busnum=1 rotate=90 gpios=reset:113,dc:116 cs=0
tmux new-session -d -s robot
tmux new-window -t robot:1 -n 'Robot Web Control' ./robotWebControl.py 
#tmux split-window -v -t robot:1 "sudo ../python/balance.py < pipe"
tmux split-window -v -t robot:1 "sudo ../rc_test_motors/rc_test_motors < pipe"
tmux a -t robot