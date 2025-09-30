import Chart from './Chart.js'

export default class PieChart extends Chart {
    constructor(title = 'Untitled Pie Chart') {
        super(title)
    }

    getLargestSlice() {
        return this.getMaxValue()
    }

    getSmallestSlice() {
        return this.getMinValue()
    }

    sortSlicesByValue(descending = true) {
        return this.sortByValue(descending)
    }

    getTotalEntries() {
        return this.getData().reduce((total, entry) => total + entry.value, 0)
    }

    getPercentage() {
        const totalEntries = this.getTotalEntries()
        return this.getData().map((entry) => ({
            label: entry.label,
            percentage: (entry.value / totalEntries) * 100 + '%',
        }))
    }
}
