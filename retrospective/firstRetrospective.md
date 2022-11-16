TEMPLATE FOR RETROSPECTIVE (Team 12)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)
- [time report from you track](#time-report-from-youtrack)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done  4 &rarr; 1
- Total points committed vs. done 19 &rarr; 3
- Nr of hours planned vs. spent (as a team) 74h 15m &rarr; 68h 50m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |   11    |        |  42h 15m   |   38h 45m    |
| HT-1   |   4     |   5    |  8h 30m    |   7h 30m     |
| HT-2   |   6     |   3    |  8h 30m    |   7h 20m     |
| HT-3   |   4     |   3    |  7h        |   8h 45m     |
| HT-4   |   4     |   8    |  7h        |   5h 45m     |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual) 2h 33m &rarr; 2h 22m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1  0.08

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated &rarr; 4h 45m
  - Total hours spent &rarr; 9h 15m
  - Nr of automated unit test casesa &rarr; 23 (16 for the client and 6 for the server)
  - Coverage (if available)
- E2E testing:
  - Total hours estimated &rarr; 8h
  - Total hours spent &rarr; 1h
- Code review
  - Total hours estimated &rarr; 2h
  - Total hours spent &rarr; 2h
  
## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Underestimation of the client side tasks.

  - Underestimation of the unit test tasks.
  
  - Some tasks where not considered like SCRUM meetings.

  - Some tasks where underestimated, they where more complex than we thought that they would be.

- What lessons did you learn (both positive and negative) in this sprint?

  - More coordination is needed during the sprint between front-end and back-end people.

  - We should focus on highest priority stories/tasks first, instead of dividing too much our effort on many stories at the same time.

  - Among us, there is a high availability in helping each other in difficult moments.

- Which improvement goals set in the previous retrospective were you able to achieve?

  Strarting from the demo project retrospective:

  - We improved the way we partition the stories, even if we think we should partition them, again, a little bit more (for example in the test tasks).
  
  - We divided tasks in client/server tasks. Coordination among us has been (just a little bit) improved. We should improve it more.
  
  - We created a specific task for planning the db.
  
  - We splitted our work taking into accouny our personal skills.

- Which ones you were not able to achieve? Why?

  - We achieved, partially, all the improvements we setted out to do.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Propose one or two

- We should partition a little bit more the tasks of each Story (expecially the test tasks).

- We need to improve coordination between teammates doing related tasks.

- One thing you are proud of as a Team!!

  - We help each other very willingly

## Time report from youtrack

`https://polito-se2-22-12.youtrack.cloud/reports/time/147-2?line=issue`
