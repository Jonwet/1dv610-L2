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

    getMaxBar() {
        const data = this.getData()
        if (data.length === 0) return []

        const maxValue = Math.max(...data.map(entry => entry.value))
        return data.filter(entry => entry.value === maxValue)
    }

    getMinBar() {
        const data = this.getData()
        if (data.length === 0) return []

        const minValue = Math.min(...data.map(entry => entry.value))
        return data.filter(entry => entry.value === minValue)
    }
}