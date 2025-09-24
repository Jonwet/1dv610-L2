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
        for (const [label, value] of Object.entries(newData)) {
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