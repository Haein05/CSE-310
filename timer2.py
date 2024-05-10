import time

def typing_timer():
   
    input("Press Enter when you are ready to start typing...")
    
    start_time = time.time()
    input("Press Enter when you're done typing...")
    end_time = time.time()
    
    elapsed_time = end_time - start_time
    
    print("\nTime taken: {:.2f} seconds".format(elapsed_time))

typing_timer()
