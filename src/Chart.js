export default class Chart {
    #title
    #data

    constructor(title = "Untitled Chart") {
        this.#title = title
        this.#data = []

    }

    setTitle(title) {
        this.#title = title
    }

    getTitle() {
        return this.#title
    }

    addData(newData) {
        for (const [label, value] of Object.entries(newData)) {
            this.#data.push({ label, value })
        }
    }

    getData() {
        return this.#data
    }
}