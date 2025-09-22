export default class Chart {
    #title;

    constructor(title = "Untitled Chart") {
        this.#title = title;

    }

    setTitle(title) {
        this.#title = title;
    }

    getTitle() {
        return this.#title;
    }
}