(define (domain generatorplus)
(:requirements :fluents :durative-actions :duration-inequalities :adl :typing :time)
(:types generator tank)
(:predicates (has_done_refuel_2) (has_done_refuel_1) (generator-ran) (available ?t - tank) (using ?t - tank ?g - generator) (safe ?g - generator))
(:functions (fuelLevel ?g - generator) (capacity ?g - generator) (fuelInTank ?t - tank) (ptime ?t - tank) (running_time)  )
(:durative-action generate
 :parameters (?g - generator)
 :duration (= ?duration 1000)
 :condition (and (has_done_refuel_2) (over all (>= (fuelLevel ?g) 0)) (over all (safe ?g)))     
 :effect (and (decrease (fuelLevel ?g) (* #t 1))
	      (at end (generator-ran)))
)
(:action refuel
 :parameters (?g - generator ?t - tank)
 :precondition (and (has_done_refuel_2) (not (using ?t ?g)) (available ?t))
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
 :effect (and (not (using ?t ?g)))
)
(:event generatorOverflow
 :parameters (?g - generator)
 :precondition (and (> (fuelLevel ?g) (capacity ?g)) (safe ?g))
 :effect (and (not (safe ?g)))
)
(:process clock
 :parameters (?g -generator)
 :precondition (and (safe ?g))
 :effect (and (increase (running_time) (* #t 1)) )	      
)

(:action refuel_1
 :parameters (?g - generator ?t - tank)
 :precondition (and (not (has_done_refuel_1)) (not (using ?t ?g)) (available ?t))
 :effect (and (has_done_refuel_1) (using ?t ?g) (not (available ?t)))
)
(:action refuel_2
 :parameters (?g - generator ?t - tank)
 :precondition (and (not (has_done_refuel_2)) (has_done_refuel_1) (not (using ?t ?g)) (available ?t))
 :effect (and (has_done_refuel_2) (using ?t ?g) (not (available ?t)))
))