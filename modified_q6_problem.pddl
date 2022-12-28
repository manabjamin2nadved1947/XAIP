(define (problem car_prob)
    (:domain car)
    (:init (not (engineBlown))
            (running)
	    (transmission_fine)
	    (= (running_time) 0)
	    (= (up_limit) 3)
	    (= (down_limit) -3)
            (= d 0)
            (= a 0)
            (= v 0))
     (:goal (and (goal_reached) (not(engineBlown)) (<= (running_time) 11) (transmission_fine) ))
     (:metric minimize(total-time))
)
