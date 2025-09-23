import Chart from "./Chart.js"

export default class PieChart extends Chart {
    constructor(title = "Untitled Pie Chart") {
        super(title)
    }

    getTotalVotes() {
        return this.getData().reduce((total, entry) => total + entry.value, 0)
    }

    getVotePercentage() {
        const totalVotes = this.getTotalVotes()
        return this.getData().map(entry => ({
            label: entry.label,
            percentage: ((entry.value / totalVotes) * 100) + "%"
        }))
    }
}

// Example code:
const chart = new PieChart("My Pie Chart")
chart.addData({ Apples: 10, Bananas: 7, Oranges: 15 })

console.log(chart.getTotalVotes()) // Output: 32
console.log(chart.getVotePercentage()) // Output: [{ label: 'Apples', percentage: 31.25 }, { label: 'Bananas', percentage: 21.875 }, { label: 'Oranges', percentage: 46.875 }]



