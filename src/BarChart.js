import Chart from './Chart.js'

export default class BarChart extends Chart {
    constructor(title = "Untitled Bar Chart") {
        super(title)
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