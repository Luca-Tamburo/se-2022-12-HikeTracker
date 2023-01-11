# TEMPLATE FOR RETROSPECTIVE (Team 12)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)
- [time report from you track](#time-report-from-youtrack)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done 4 &rarr; 4
- Total points committed vs. done 21 &rarr; 21
- Nr of hours planned vs. spent (as a team) 71h 50m &rarr; 72h 50m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 17      |        | 21h 30m    | 22h 30m      |
| HT-17 | 8       | 8      | 09h 50m    | 09h 50m      |
| HT-18 | 8       | 5      | 09h 50m    | 09h 45m      |
| HT-33 | 9       | 5      | 18h 50m    | 19h 40m      |
| HT-34 | 9       | 3      | 11h 50m    | 11h 05m      |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual) 1h 24m &rarr; 1h 25m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 = - 0.014

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated &rarr; 7h
  - Total hours spent &rarr; 6h30m
  - Nr of automated unit test cases &rarr; 241 (client side), 46 (server side)
  - Coverage (if available) 42,56% (client), 82.88% (server)
- E2E testing:
    - Total hours estimated &rarr; 3h50m
    - Total hours spent &rarr; 3h20m
- Integration testing:
  - Total hours estimated &rarr; 7h30m
  - Total hours spent &rarr; 7h30m
  - Nr of automated integration test cases &rarr; 212
  - Coverage (if available) 88.46%

- Code review
  - Total hours estimated &rarr; 5h40m
  - Total hours spent &rarr; 4h40m

- Technical Debt management:
  - Total hours estimated &rarr; 8h
  - Total hours spent &rarr; 8h30m
  - Hours estimated for remediation by SonarQube &rarr; 16h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues &rarr; 8h
  - Hours spent on remediation &rarr; 8h30m
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") &rarr; 0.2%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability, coverage)
    - reliability &rarr; A
    - security &rarr; A
    - maintainability &rarr; A
    - coverage &rarr; 60.80%


## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We underestimated only 1 hour out of 72, so we basically made an accurate estimate.

- What lessons did you learn (both positive and negative) in this sprint?

  - Thanks to technical debt management, we have learnt to write higher quality code. We have learnt to estimate stories well as we have little estimation error.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - We improved the overall test coverage from 54.7% last sprint to 60.8%.
  - We were more productive because all the work was finished well in advance.

  Strarting from the sprint #3 retrospective:

  - We achieved the sprint goals in advance.
  - We improved the tests coverage
  - We managed technical debt

- Which ones you were not able to achieve? Why?

  - No one.

- Improvement goals for the next sprint and how to achieve them (techincal tastk, team coordination, etc.)

  - Improve even more test coverage, achievable by adding specific tasks
  - Solve the little remaining tehcnical debt

- One thing you are proud of as a Team!!

  - We are very satisfied because we have completed all the tasks we set out to complete and no problems were found during the review. We are also proud of the way we collaborated with each other, because the coordination improved a lot during this sprint.

## Time report from youtrack

<https://polito-se2-22-12.youtrack.cloud/reports/time/147-7?line=issue>
