(define (problem run-generatorplus)
    (:domain generatorplus)
    (:objects gen - generator tank1 tank2 - tank)
    (:init
		(= (fuelLevel gen) 940)
		(= (capacity gen) 1600)

		(= (fuelInTank tank1) 40)
		(= (fuelInTank tank2) 40)

                (not (generatorStarted gen))
		(available tank1)
		(available tank2)

		(safe gen)
     )  
     (:goal (and (generator-ran) (< (running_time) 3000)) )
)
