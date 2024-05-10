import time
import sys
import select

def timer():
    start_time = time.time()
    elapsed_time = 0
    running = True
    print("Timer started automatically. Press Enter to stop.")

    try:
        while True:
            if running:
                # Check if Enter has been pressed without blocking
                if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
                    input()  # If Enter is pressed, handle it
                    elapsed_time = time.time() - start_time
                    running = False
                    print(f"\nTimer stopped at {elapsed_time:.2f} seconds. Press Enter to restart.")
                else:
                    # Update and display the timer if Enter has not been pressed
                    elapsed_time = time.time() - start_time
                    sys.stdout.write(f"\rTimer is running... {elapsed_time:.2f} seconds")
                    sys.stdout.flush()
                    time.sleep(0.1)  # Refresh every 0.1 seconds

            else:
                # Timer is not running, wait for Enter to restart it
                input()  # Blocking call since the timer is not updating now
                start_time = time.time()
                running = True
                print("Timer is running...")
    except KeyboardInterrupt:
        print("\nTimer interrupted with Ctrl+C.")
        return elapsed_time

try:
    final_elapsed_time = timer()
    print(f"\nTotal Elapsed Time: {final_elapsed_time:.2f} seconds")
except Exception as e:
    print(f"\nAn error occurred: {e}")