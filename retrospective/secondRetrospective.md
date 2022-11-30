# TEMPLATE FOR RETROSPECTIVE (Team 12)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)
- [time report from you track](#time-report-from-youtrack)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done 5 &rarr; 5
- Total points committed vs. done 22 &rarr; 22
- Nr of hours planned vs. spent (as a team) 72h &rarr; 74h 45m
  - N.B. We made a mistake and on YouTrack we estimated less than 72 hours because we misunderstood that hours needed for completing old stories had not to be estimated in youtrack again

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 9       |        | 18h        | 20h 05m      |
| HT-1  | 5       | 5      | 11h 20m    | 10h 55m      |
| HT-2  | 9       | 3      | 13h 30m    | 14h 50m      |
| HT-4  | 6       | 8      | 13h        | 13h 30m      |
| HT-5  | 9       | 3      | 8h 50m     | 8h 20m       |
| HT-6  | 9       | 3      | 7h 20m     | 7h 5m        |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- N.B.
  We manually counted the real actual hours for sprint 1 uncompleted stories (HT-1,HT-2,HT-4) because we made the mistake of moving the uncompleted sprint 1 tasks in sprint 2.
  On youtrack the actual hours are the sum of sprint 1 hours+ sprint 2 hours for the tasks we wrongly moved from sprint 1 to sprint 2.
  We extracted the sprint 2 hours and we reported them in the statistics.
  The estimation of those hours has been wrongly done without reporting it on youtrack, because we did not know how to insert it using the already existing tasks without overwriting the sprint 1 existing estimation.

- Hours per task average, standard deviation (estimate and actual) 1h 32m &rarr; 1h 35m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 = - 0.04

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated &rarr; 9h
  - Total hours spent &rarr; 10h 15m
  - Nr of automated unit test cases &rarr; 151 (client side) , 8 (server side)
  - Coverage (if available)
- E2E testing:
  - Total hours estimated &rarr; 6h
  - Total hours spent &rarr; 6h
- Integration testing:
  - Total hours estimated &rarr; 6h
  - Total hours spent &rarr; 10h
  - Nr of automated integration test cases &rarr; 72

- Code review
  - Total hours estimated &rarr; 4h 30m
  - Total hours spent &rarr; 4h 45m

- N.B.
    Server side we focused more on integration testing, testing the proper functioning of the API with various types of correct and incorrect input that a user can send to the system, since for unit tests the only thing testable is the "dao doing the dao"... We think there is no need to test error cases for the dao, because errors are caught at the top level (API level), so once it is verified that "dao does the dao" there is not much else to test. This is the motivation behind the poor presence of server-side unit testing. 

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We underestimated the time to insert the 25 requested hikes into the db.
  - We made the mistake of moving the uncompleted sprint 1 tasks in sprint 2, so the estimation of those hours has been wrongly done without reporting it on youtrack, because we did not know how to insert it using the already existing tasks without overwriting the sprint 1 existing estimation.

- What lessons did you learn (both positive and negative) in this sprint?

  - We understood how to correctly manage on YouTrack the uncompleted tasks of the previous sprint.
  - we have to trust less user input.
  - We need to better organize the working branches of github, because during this sprint multiple people often worked in the same branch, and sometimes this caused data loss.

- Which improvement goals set in the previous retrospective were you able to achieve?

  Strarting from the sprint #1 retrospective:

  - We learned to divide better an user story in tasks.
  - We improved coordination between client and server developers.

- Which ones you were not able to achieve? Why?

  - No one.

> Propose one or two

    - We have to try to archieve the sprint goals earlier, thus we can find possible mistakes in the implementation of the tasks.
    - We have to apply the lesson we understood in this sprint about the management of uncompleted stories
    - We have to try to better organize the working branches of github, to allow more work indipendence.

- One thing you are proud of as a Team!!

  - We archived our goals.

## Time report from youtrack

<https://polito-se2-22-12.youtrack.cloud/reports/time/147-3?line=issue>
