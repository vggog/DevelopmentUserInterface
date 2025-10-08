import {createElement} from "../framework/render.js";

function boardComponentTemplate() {
    return (
        `<div class="board">

        </div>`
    );
}

export default class BoardComponent {

    getTemplate() {
        return boardComponentTemplate();
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