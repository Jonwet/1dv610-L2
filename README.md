# Chart module

A Javascript chart module that enables you to create and manage chart data in Javascript. Currently only rendering for the BarChart class is implemented.

## Features

### Chart

- Add, update and validate chart data

### BarChart

- Get largest and smallest value
- Sort based on value
- Render a bar chart in the terminal
- Get total entries

### PieChart

- Get largest and smallest value
- Sort based on value
- Get total entries
- Get percentage representation of each slice

### LineChart

- Get max/min values for each line or globally
- Add and remove lines dynamically

## Usage

### BarChart Usage

```js
const barChart = new BarChart('Example BarChart')
barChart.addData({ Item1: 10, Item2: 5, Item3: 8 })

console.log(barChart.render())
console.log('Largest Bar:', barChart.getLargestBar())
```

### PieChart Usage

```js
const pieChart = new PieChart('Example PieChart')
pieChart.addData({ Item1: 65, Item2: 20, Item3: 15 })

console.log('Percentages:', pieChart.getPercentage())
```

### LineChart Usage

```js
const lineChart = new LineChart('Example LineChart')
lineChart.addLines('Item1', [10, 12, 15, 8])
lineChart.addLines('Item2', [5, 7, 6, 9])
console.log('Global Max:', lineChart.getGlobalMaxValue())
```

## Installation

Clone the repository and import the module into your project.

```js
import { BarChart, LineChart, PieChart } from '../superChart.js'
```

Example file structure

```js
your-project/
│
├── src/
│   ├── Chart.js
│   ├── BarChart.js
│   ├── LineChart.js
│   └── PieChart.js
│
├── superChart.js
└── your-app.js
```

## Requirements

- Any modern node.js version

## License

MIT
