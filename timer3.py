import time

def typing_timer():
    print("Start typing now...")  # Inform the user to start typing.
    start_time = time.time()     # Start the timer.

    input("Press Enter when you're done typing...")  # Wait for the user to finish typing.
    end_time = time.time()       # Stop the timer.

    elapsed_time = end_time - start_time
    print("\nTime taken: {:.2f} seconds".format(elapsed_time))  # Print the elapsed time.

typing_timer()