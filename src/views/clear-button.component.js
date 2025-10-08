import {createElement} from '../framework/render.js';


function clearButtonComponentTemplate() {
    return (
        `<button class="clear-button">
            Очистить
        </button>`
    );
}

export default class ClearButtonComponent {

    getTemplate() {
        return clearButtonComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}