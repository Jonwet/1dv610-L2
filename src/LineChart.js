import Chart from "./Chart.js"

export default class LineChart extends Chart {
    #line = {}

    constructor(title = "Untitled Line Chart") {
        super(title)
    }

    addLines(name, data) {
        this.#line[name] = [...data]
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
}