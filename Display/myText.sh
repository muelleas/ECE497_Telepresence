# Here's how to use imagemagick to display text
# Make a blank image

SIZE=320x240
TMP_FILE=/tmp/frame.png



# From: http://www.imagemagick.org/Usage/text/
#modprobe fbtft_device name=adafruit28 busnum=1 rotate=90 gpios=reset:113,dc:116 cs=0
convert -background lightblue -fill blue -font Times-Roman -pointsize 24 \
      -size $SIZE \
      -draw "text 0,100 '$1'"\
      $TMP_FILE

sudo fbi -noverbose -T 1 $TMP_FILE

# convert -list font

