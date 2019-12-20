export default class ColorRepo {
    _key;

    constructor(key = 'notes-color-store') {
        this._key = key
    }

    generateRandomColor(mix = [155, 155, 155]) {
        return new Array(3)
            .fill(undefined)
            .map((_, i) => (Math.floor(Math.random() * 255) + mix[i]) / 2);
    }

    generateRandomColors(count = 0) {
        return new Array(Math.max(0, count))
            .fill(undefined)
            .map(() => this.generateRandomColor());
    }

    get() {
        const colors = JSON.parse(localStorage.getItem(this._key) || '[]');
        return colors instanceof Array ? colors : [];
    }

    put(colors) {
        localStorage.setItem(this._key, JSON.stringify(colors));
    }
}
