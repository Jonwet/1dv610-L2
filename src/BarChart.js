import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = "Untitled Bar Chart") {
        super(title)
    }

    sortByValue(descending = true) {
        const sortedData = [...this.getData()]
        sortedData.sort((a, b) => descending ? b.value - a.value : a.value - b.value)
        return sortedData
    }
}