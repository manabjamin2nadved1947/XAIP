(define (problem car_prob)
    (:domain car)
	(:init
		(running)
		(transmission_fine)
		(= (running_time) 0)
		(= (up_limit) 1)
		(= (down_limit) -1)
		(= d 0)
		(= a 0)
		(= v 0)
	)
     (:goal (and (goal_reached) (not(engineBlown)) (<= (running_time) 50) (transmission_fine) ))
     (:metric minimize(total-time))
)
