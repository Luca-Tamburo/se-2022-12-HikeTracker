# TEMPLATE FOR RETROSPECTIVE (Team 12)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)
- [time report from you track](#time-report-from-youtrack)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done 3 &rarr; 3
- Total points committed vs. done 11 &rarr; 11
- Nr of hours planned vs. spent (as a team) 72h 10m &rarr; 74h 10m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 22      |        | 23h 05m    | 26h 40m      |
| HT-7  | 9       | 5      | 17h 10m    | 17h 55m      |
| HT-8  | 9       | 3      | 15h        | 15h 10m      |
| HT-9  | 9       | 3      | 15h        | 16h 10m      |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual) 1h 28m &rarr; 1h 31m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 = - 0.027

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated &rarr; 8h 10m
  - Total hours spent &rarr; 8h 25m
  - Nr of automated unit test cases &rarr; 205 (client side), 25 (server side)
  - Coverage (if available) 32.46% (client), 73.52% (server)
- E2E testing:
  - Total hours estimated &rarr; 5h
  - Total hours spent &rarr; 5h
- Integration testing:
  - Total hours estimated &rarr; 8h 30m
  - Total hours spent &rarr; 8h 45m
  - Nr of automated integration test cases &rarr; 158
  - Coverage (if available) 88.31%

- Code review
  - Total hours estimated &rarr; 7h
  - Total hours spent &rarr; 7h

- Technical Debt management:
  - Total hours estimated &rarr; 4h
  - Total hours spent &rarr; 4h
  - Hours estimated for remediation by SonarQube &rarr; 41h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues &rarr; 25h
  - Hours spent on remediation &rarr; 3h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") &rarr; 0.3%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability)
    - reliability &rarr; A
    - security &rarr; A
    - maintainability &rarr; A


## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We underestimated the time to make the unit test for search hut server side.

- What lessons did you learn (both positive and negative) in this sprint?

  - We learned how to properly manage the time we have.

- Which improvement goals set in the previous retrospective were you able to achieve?

  Strarting from the sprint #2 retrospective:

  - We achieved the sprint goals in advance.
  - We managed the previous sprint tasks in a proper way.
  - We better organized the Github workflow

- Which ones you were not able to achieve? Why?

  - No one.

- Improvement goals for the next sprint and how to achieve them (techincal tastk, team coordination, etc.)
  - Improve test coverage, achievable by adding specific tasks
  - Higher productivity, achievable by merging different part of the project earlier (possibly as soon as they are ready)

## Time report from youtrack

<https://polito-se2-22-12.youtrack.cloud/reports/time/147-7?line=issue>
