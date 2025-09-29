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
        this.#validateData(newData)

        for (const [label, value] of Object.entries(newData)) {
            if (typeof label !== "string" || label.trim() === "") {
                throw new Error("Data labels can't be empty and must be strings")
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
            throw new Error("Title can't be empty and must be a string")
        }
    }
    
    #validateData(data) {
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
            throw new Error("Data can't be null and must be an object")
        }
    }
}