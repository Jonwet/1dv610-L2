import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = "Untitled Bar Chart") {
        super(title)
    }
}


// Example code:
const chart = new BarChart("My Bar Chart");
chart.addData({ Apples: 10, Bananas: 7, Oranges: 15 });

console.log(chart.getData());



