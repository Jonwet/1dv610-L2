# Test Report - ChartHelper

**Module:** ChartHelper

**Tester:** Jonatan Wetterberg

**Test Date:** 2025-10-01

**Test Method:** Automated unit tests using the framework Jest

**Framework version:** Jest 30.1.3

## Test overview

I tested my module using the framework Jest. Currently i have created 31 test cases that test my public methods in the module. My tests test normal functionality like addData for example but also tests error handling.

All my tests passed successfully.

## Instructions

1. To start:
    - Node.js installed (I used version 24.1.0)
    - Install jest as dev dependancy

2. Run the tests:

```js
npm install
npm test
```

## Test results

| What was tested                 |                   How it was tested                   | Result |
| :------------------------------ | :---------------------------------------------------: | :----: |
| Barchart                        |                                                       |        |
| BarChart title                  |      Created a BarChart and retrieved the title       | Passed |
| BarChart data                   |        Added data to BarChart and retrieved it        | Passed |
| BarChart sort                   |          Added data and sorted bars by value          | Passed |
| BarChart max value              |     Added data and got the bar with highest value     | Passed |
| BarChart min value              |     Added data and got the bar with lowest value      | Passed |
| BarChart total                  |            Added data and got total value             | Passed |
| Chart                           |                                                       |        |
| Chart title                     |        Created a chart and retrieved the title        | Passed |
| Chart update title              |          Updated the title and retrieved it           | Passed |
| Chart title validation          |   Tried setting title as non-string and threw error   | Passed |
| Chart add data                  |         Added data to chart and retrieved it          | Passed |
| Chart data type validation      |         Added non-number data and threw error         | Passed |
| Chart data object validation    |      Added null/non-object data and threw error       | Passed |
| Chart label validation          |      Added data with empty label and threw error      | Passed |
| Chart update data               |   Updated existing value in data and checked values   | Passed |
| Chart add duplicate label       | Tried adding data with existing label and threw error | Passed |
| Chart update non-existing label |   Tried updating non-existing label and threw error   | Passed |
| LineChart                       |                                                       |        |
| LineChart title                 |      Created a LineChart and retrieved the title      | Passed |
| LineChart add lines             |           Added line data and retrieved it            | Passed |
| LineChart get line names        |    Added multiple lines and retrieved their names     | Passed |
| LineChart remove lines          |              Added lines and removed one              | Passed |
| LineChart max per line          |           Retrieved max value for each line           | Passed |
| LineChart min per line          |           Retrieved min value for each line           | Passed |
| LineChart global max            |         Retrieved max value across all lines          | Passed |
| LineChart global min            |         Retrieved min value across all lines          | Passed |
| PieChart                        |                                                       |        |
| PieChart title                  |      Created a PieChart and retrieved the title       | Passed |
| PieChart add data               |              Added data and retrieved it              | Passed |
| PieChart total                  |            Added data and got total value             | Passed |
| PieChart percentages            |         Calculated percentages of each slice          | Passed |
| PieChart max value              |    Added data and got the slice with highest value    | Passed |
| PieChart min value              |  Added data and got the slice with the lowest value   | Passed |

## Summary

All my tests passed however some of my might not be necessary. I think some of my tests can be removed due to them being identical to the tests on the main Chart.js file.
