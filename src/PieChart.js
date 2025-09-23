import Chart from "./Chart.js"

export default class PieChart extends Chart {
    constructor(title = "Untitled Pie Chart") {
        super(title)
    }

    getTotalVotes() {
        return this.getData().reduce((total, entry) => total + entry.value, 0)
    }
}

// Example code:
const chart = new PieChart("My Pie Chart")
chart.addData({ Apples: 10, Bananas: 7, Oranges: 15 })

console.log(chart.getTotalVotes()) // Output: 32



