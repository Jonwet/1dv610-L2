import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = "Untitled Bar Chart") {
        super(title)
    }

    sortByValue(descending = true) {
        const sortedData = [...this.getData()]
        sortedData.sort(function(a, b) {
            if (descending) {
                return b.value - a.value
            } else {
                return a.value - b.value
            }
        })
        return sortedData
    }

    getMaxBar() {
        const data = this.getData()
        if (data.length === 0) return []

        const value = data.map(function(entry) { 
            return entry.value 
        })
        const maxValue = Math.max(...value)

        return data.filter(function(entry) { 
            return entry.value === maxValue 
        })
    }

    getMinBar() {
        const data = this.getData()
        if (data.length === 0) return []

        const value = data.map(function(entry) { 
            return entry.value 
        })
        const minValue = Math.min(...value)

        return data.filter(function(entry) { 
            return entry.value === minValue 
        })
    }
}