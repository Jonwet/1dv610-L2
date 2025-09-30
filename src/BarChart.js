/**
 * @file Defines the BarChart class.
 * @author Jonatan Wetterberg
 */

import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = 'Untitled Bar Chart') {
        super(title)
    }

    getLargestBar() {
        return this.getMaxValue()
    }

    getSmallestBar() {
        return this.getMinValue()
    }

    sortBarsByValue(descending = true) {
        return this.sortByValue(descending)
    }

    getTotal() {
        return this.getTotalEntries()
    }
}
