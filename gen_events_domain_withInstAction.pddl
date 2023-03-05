(define (domain generatorplus)
(:requirements :fluents :durative-actions :duration-inequalities :adl :typing :time :negative-preconditions)
(:types generator tank)
(:predicates (generator-ran) (available ?t - tank) (using ?t - tank ?g - generator) (safe ?g - generator) (generatorStarted ?g - generator))
(:functions (fuelLevel ?g - generator) (capacity ?g - generator) (fuelInTank ?t - tank) (ptime ?t - tank) (dur ?g - generator) )


(:action generateStart
 :parameters (?g - generator)
 :precondition (and (not (generatorStarted ?g)) (>= (fuelLevel ?g) 0) (safe ?g))
 :effect (and (generatorStarted ?g) (assign (dur ?g) 0) )
)

(:process generateProcess
 :parameters (?g - generator)
 :precondition (and (generatorStarted ?g))
 :effect (and (decrease (fuelLevel ?g) (* #t 1)) 
	      (increase (dur ?g) (* #t 1)) )	      
)

(:event generateFail
 :parameters (?g - generator)
 :precondition (and (generatorStarted ?g) (not (= (dur ?g) 1000)) 
                    (not (>= (fuelLevel ?g) 0)) )
 :effect (and (assign (dur ?g) 1001) )
)

(:action generateEnd
 :parameters (?g - generator)
 :precondition (and (generatorStarted ?g) (>= (fuelLevel ?g) 0) (safe ?g) (= (dur ?g) 1000) )
 :effect (and (generator-ran) (not (generatorStarted ?g)) )
)

(:action refuel
 :parameters (?g - generator ?t - tank)
 :precondition (and (not (using ?t ?g)) (available ?t))
 :effect (and (using ?t ?g) (not (available ?t)))
)



(:process refuelling
 :parameters (?g - generator ?t -tank)
 :precondition (and (using ?t ?g))
 :effect (and (decrease (fuelInTank ?t) (* #t (* 0.001 (* (ptime ?t) (ptime ?t))))) 
	      (increase (ptime ?t) (* #t 1))
  	      (increase (fuelLevel ?g) (* #t (* 0.001 (* (ptime ?t) (ptime ?t))))))	      
)
     
(:event tankEmpty
 :parameters (?g - generator ?t - tank)
 :precondition (and (using ?t ?g) (<= (fuelInTank ?t) 0))
 :effect (and (not (using ?t ?g)) )
)

(:event generatorOverflow
 :parameters (?g - generator)
 :precondition (and (> (fuelLevel ?g) (capacity ?g)) (safe ?g))
 :effect (and (not (safe ?g)))
)

)
