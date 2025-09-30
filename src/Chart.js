/**
 * @file Defines the Chart class.
 * @author Jonatan Wetterberg
 */

export default class Chart {
    #chartTitle
    #data

    constructor(chartTitle = 'Unnamed Chart') {
        this.#validateTitle(chartTitle)
        this.#chartTitle = chartTitle
        this.#data = []
    }

    setChartTitle(chartTitle) {
        this.#validateTitle(chartTitle)
        this.#chartTitle = chartTitle
    }

    getTitle() {
        return this.#chartTitle
    }

    addData(newData) {
        this.#validateData(newData)

        for (const [label, value] of Object.entries(newData)) {
            this.#validateLabel(label)
            this.#validateValue(value)

            if (this.#data.some((entry) => entry.label === label)) {
                throw new Error(`Data with label "${label}" already exists`)
            } else {
                this.#data.push({ label, value })
            }
        }
    }

    getData() {
        return this.#data
    }

    updateData(label, newValue) {
        this.#validateLabel(label)
        this.#validateValue(newValue)

        const entry = this.#data.find((entry) => entry.label === label)
        if (!entry) {
            throw new Error(`Data with label "${label}" not found`)
        } else {
            entry.value = newValue
        }
    }

    getTotalEntries() {
        return this.#data.reduce((total, entry) => total + entry.value, 0)
    }

    sortByValue(descending = true) {
        const sortedData = [...this.getData()]
        sortedData.sort((a, b) => {
            if (descending) {
                return b.value - a.value
            } else {
                return a.value - b.value
            }
        })
        return sortedData
    }

    getMaxValue() {
        const data = this.getData()
        if (data.length === 0) return []

        let maxValue = data[0].value
        let highestValues = [data[0]]

        for (let i = 1; i < data.length; i++) {
            if (data[i].value > maxValue) {
                maxValue = data[i].value
                highestValues = [data[i]]
            } else if (data[i].value === maxValue) {
                highestValues.push(data[i])
            }
        }

        return highestValues
    }

    getMinValue() {
        const data = this.getData()
        if (data.length === 0) return []

        let minValue = data[0].value
        let lowestValues = [data[0]]

        for (let i = 1; i < data.length; i++) {
            if (data[i].value < minValue) {
                minValue = data[i].value
                lowestValues = [data[i]]
            } else if (data[i].value === minValue) {
                lowestValues.push(data[i])
            }
        }

        return lowestValues
    }

    #validateTitle(chartTitle) {
        if (typeof chartTitle !== 'string' || chartTitle.trim() === '') {
            throw new Error("Title can't be empty and must be a string")
        }
    }

    #validateData(data) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error("Data can't be null and must be an object")
        }
    }

    #validateLabel(label) {
        if (typeof label !== 'string' || label.trim() === '') {
            throw new Error("Data labels can't be empty and must be strings")
        }
    }

    #validateValue(value) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error('Data values must be numbers')
        }
    }
}
