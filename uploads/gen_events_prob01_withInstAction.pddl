(define (problem run-generatorplus)
    (:domain generatorplus)
    (:objects gen - generator tank1  - tank)
    (:init
		(= (fuelLevel gen) 980)
		(= (capacity gen) 1600)

		(= (fuelInTank tank1) 40)
		

                (not (generatorStarted gen))
		(available tank1)
		

		(safe gen)
		(= (running_time) 0 )
     )  
     (:goal (and (generator-ran) (<= (running_time) 2000) ) )
)
