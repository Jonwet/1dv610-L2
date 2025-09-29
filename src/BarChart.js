import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = "Untitled Bar Chart") {
        super(title)
    }

    getHighestBar() {
        return this.getMaxValue()
    }

    getLowestBar() {
        return this.getMinValue()
    }

    sortBarsByValue(descending = true) {
        return this.sortByValue(descending)
    }
}