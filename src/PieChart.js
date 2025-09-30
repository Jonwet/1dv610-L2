/**
 * @file Defines the PieChart class.
 * @author Jonatan Wetterberg
 */

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

    getTotal() {
        return this.getTotalEntries()
    }

    getPercentage() {
        const total = this.getTotal()
        return this.getData().map((entry) => ({
            label: entry.label,
            percentage: (entry.value / total) * 100 + '%',
        }))
    }
}
