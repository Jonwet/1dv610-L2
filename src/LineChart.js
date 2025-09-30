import Chart from './Chart.js'

export default class LineChart extends Chart {
    #line = {}

    constructor(title = 'Untitled Line Chart') {
        super(title)
    }

    addLines(name, data) {
        this.#line[name] = [...data]
    }

    removeLine(name) {
        delete this.#line[name]
    }

    getLines() {
        const copyOfLines = {}
        for (const [name, data] of Object.entries(this.#line)) {
            copyOfLines[name] = [...data]
        }
        return copyOfLines
    }

    getLineNames() {
        return Object.keys(this.#line)
    }

    getMaxValueForEachLine() {
        const result = {}
        for (const [name, data] of Object.entries(this.#line)) {
            if (data.length === 0) {
                result[name] = null
            } else {
                result[name] = Math.max(...data)
            }
        }
        return result
    }

    getMinValueForEachLine() {
        const result = {}
        for (const [name, data] of Object.entries(this.#line)) {
            if (data.length === 0) {
                result[name] = null
            } else {
                result[name] = Math.min(...data)
            }
        }
        return result
    }

    // Gets the global max value among all lines, used for scaling the chart
    getGlobalMaxValue() {
        const allValues = []

        for (const data of Object.values(this.#line)) {
            allValues.push(...data)
        }
        if (allValues.length > 0) {
            return Math.max(...allValues)
        } else {
            return null
        }
    }

    // Gets the global min value among all lines, used for scaling the chart
    getGlobalMinValue() {
        const allValues = []

        for (const data of Object.values(this.#line)) {
            allValues.push(...data)
        }
        if (allValues.length > 0) {
            return Math.min(...allValues)
        } else {
            return null
        }
    }
}
