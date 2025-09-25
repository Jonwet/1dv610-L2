export default class Chart {
    #title
    #data

    constructor(title = "Untitled Chart") {
        this.#validateTitle(title)
        this.#title = title
        this.#data = []

    }

    setTitle(title) {
        this.#validateTitle(title)
        this.#title = title
    }

    getTitle() {
        return this.#title
    }

    addData(newData) {
        if (typeof newData !== "object" || newData === null || Array.isArray(newData)) {
            throw new Error("Data must be a non-null object")
        }

        for (const [label, value] of Object.entries(newData)) {
            if (typeof label !== "string" || label.trim() === "") {
                throw new Error("Data labels must be non-empty strings")
            }
            if (typeof value !== "number" || isNaN(value)) {
                throw new Error("Data values must be numbers")
            }
            this.#data.push({ label, value })
        }
    }

    getData() {
        return this.#data
    }

    #validateTitle(title) {
        if (typeof title !== "string" || title.trim() === "") {
            throw new Error("Title must be a non-empty string")
        }
    }
}