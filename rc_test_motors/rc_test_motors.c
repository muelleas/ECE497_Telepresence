/*******************************************************************************
* rc_test_motors.c
*
* demonstrates use of H-bridges to drive motors. Instructions are printed
* to the screen when called.
*******************************************************************************/

#include "./rc_usefulincludes.h"
#include "./roboticscape.h"

// possible modes, user selected with command line arguments
typedef enum m_mode_t{
	DISABLED,
	NORMAL,
	BRAKE,
	FREE,
	SWEEP
} m_mode_t;

// printed if some invalid argument was given
void print_usage(){
	printf("\n");
	printf("-d {duty}   define a duty cycle from -1.0 to 1.0\n");
	printf("-b          enable motor brake function\n");
	printf("-f          enable free spin function\n");
	printf("-s {duty}   sweep motors back and forward at duty cycle\n");
	printf("-m {motor}  specify a single motor from 1-4, otherwise all\n");
	printf("            motors will be driven equally.\n");
	printf("-h          print this help message\n");
	printf("\n");
}

int main(int argc, char *argv[]){
	double duty = 0.5;
	int ch = 1;
	int c, in;
	int all = 1;	// set to 0 if a motor (-m) argument is given
	char choice[5];
	m_mode_t m_mode = DISABLED;
	
	// parse arguments
	opterr = 0;
	
	// initialize hardware first
	if(rc_initialize()){
		fprintf(stderr,"ERROR: failed to run rc_initialize(), are you root?\n");
		return -1;
	}

	// bring H-bridges of of standby
	rc_enable_motors(); 
	rc_set_led(GREEN,ON);
	rc_set_led(RED,ON);
	
	// decide what to do
	
	//Does this alone work?
	
	printf("Start\n");
	while(choice[0] != 'q'){
		//while(choice[0] != '''){
			gets(choice);
		//}
		printf("Char: %s",choice);
		if(choice[0] == '1'){
			printf("Forward\n");
			rc_set_motor(ch,duty);
			rc_set_motor(3,duty);
		} else if(choice[0] == '2'){
			printf("Backward\n");
			rc_set_motor(ch,-0.5);
			rc_set_motor(3,-0.5);
			
		} else if(choice[0] == '3'){
			printf("Left\n");
			rc_set_motor(ch,duty);
			rc_set_motor(3,0);
		} else if(choice[0] == '4'){
			printf("Right\n");
			rc_set_motor(3,duty);
			rc_set_motor(ch,0);
		}	else {
			printf("sending duty cycle 0 to motor %d\n", ch);
			rc_set_motor(ch,0);
			rc_set_motor(3,0);
		}
	}
	printf("Exit\n");

	// wait untill the user exits
	while(rc_get_state()!=EXITING){
		if(m_mode==SWEEP){
			duty = -duty; // toggle back and forth to sweep motors side to side
			if(all){
				printf("sending duty cycle %0.4f to all motors\n", duty);
				rc_set_motor_all(duty);
			}
			else{
				printf("sending duty cycle %0.4f to motor %d\n", duty, ch);
				rc_set_motor(ch,duty);
			}
		}
		
		// if not in SWEEP mode, the motors have already been set so do nothing
		rc_usleep(500000);
	}
	
	// User must have existed, put H-bridges into standby
	// not entirely necessary since cleanup_cape does this too
	rc_disable_motors();	
	printf("All Motors Off\n\n");
	
	// final cleanup
	rc_cleanup();
	return 0;
}

