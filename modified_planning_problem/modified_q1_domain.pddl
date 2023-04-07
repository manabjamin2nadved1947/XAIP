(define (domain car)
(:requirements :typing :durative-actions :fluents :time :negative-preconditions :timed-initial-literals)
(:predicates (has_done_accelerate_3) (has_done_decelerate_2) (has_done_accelerate_1) (running) (stopped) (engineBlown) (transmission_fine) (goal_reached) )
(:functions (d) (v) (a) (up_limit) (down_limit) (running_time) )
(:process moving
:parameters ()
:precondition (and (running))
:effect (and (increase (v) (* #t (a)))
             (increase (d) (* #t (v)))
	     (increase (running_time) (* #t 1))
)
)
(:action accelerate
  :parameters()
  :precondition (and (has_done_accelerate_3) (running) (< (a) (up_limit)))
  :effect (and (increase (a) 1))
)
(:action decelerate
  :parameters()
  :precondition (and (has_done_accelerate_3) (running) (> (a) (down_limit)))
  :effect (and (decrease (a) 1))
)
(:event engineExplode
:parameters ()
:precondition (and (running) (>= (a) 1) (>= (v) 100))
:effect (and (not (running)) (engineBlown) (assign (a) 0))
)
(:action stop
:parameters()
:precondition(and (has_done_accelerate_3) (= (v) 0) (>= (d) 30) (not (engineBlown)) )
:effect(goal_reached)
)

(:action accelerate_1
  :parameters()
  :precondition (and (not (has_done_accelerate_1)) (running) (< (a) (up_limit)))
  :effect (and (has_done_accelerate_1) (increase (a) 1))
)
(:action decelerate_2
  :parameters()
  :precondition (and (not (has_done_decelerate_2)) (has_done_accelerate_1) (running) (> (a) (down_limit)))
  :effect (and (has_done_decelerate_2) (decrease (a) 1))
)
(:action accelerate_3
  :parameters()
  :precondition (and (not (has_done_accelerate_3)) (has_done_decelerate_2) (running) (< (a) (up_limit)))
  :effect (and (has_done_accelerate_3) (increase (a) 1))
))