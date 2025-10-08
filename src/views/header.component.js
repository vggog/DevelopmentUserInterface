import {createElement} from "../framework/render.js";


function headerComponentTemplate() {
    return (
        `<header>
            <h1 class="container">Список задач</h1>
        </header>`
    )
}


export default class HeaderComponent {
    getTemplate() {
        return headerComponentTemplate();
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
