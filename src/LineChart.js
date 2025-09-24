import Chart from "./Chart.js"

export default class LineChart extends Chart {
    #series = {}

    constructor(title = "Untitled Line Chart") {
        super(title)
    }

    // A line in the line chart has a name and multiple points of data
    addSeries(name, data) {
        this.#series[name] = [...data]
    }

    getSeries() {
        const copyOfSeries = {}
        for (const [name, data] of Object.entries(this.#series)) {
            copyOfSeries[name] = [...data]
        }
        return copyOfSeries
    }
}