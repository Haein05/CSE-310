import time
import curses

def typing_timer(stdscr):
    # Set stdscr.getch() to non-blocking
    stdscr.nodelay(True)

    # Clear the screen
    stdscr.clear()

    # Print the instructions
    stdscr.addstr(0, 0, "Start typing. Press 'Enter' when done.")
    stdscr.refresh()

    start_time = time.time()
    elapsed_time = 0

    try:
        while True:
            # Attempt to read a keypress
            key = stdscr.getch()

            # Update the time display continuously
            elapsed_time = time.time() - start_time
            stdscr.addstr(1, 0, f"Time elapsed: {elapsed_time:.2f} seconds")
            stdscr.refresh()

            # If Enter is pressed, break out of the loop
            if key == 10:  # ASCII code for Enter
                break

            # Sleep to reduce CPU load
            time.sleep(0.1)

    finally:
        # Clear nodelay mode
        stdscr.nodelay(False)

    # Print the final time
    stdscr.addstr(2, 0, f"Final time: {elapsed_time:.2f} seconds")
    stdscr.refresh()
    stdscr.getch()  # Wait for another key press to exit

# Wrap the function to handle initialization and cleanup
curses.wrapper(typing_timer)
