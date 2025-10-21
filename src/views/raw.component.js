import {AbstractComponent} from "../framework/view/abstract.component.js";

function rawComponentTemplate() {
    return (
        `<li class="raw-task-item">Перетащите карточку</li>`
    );
}

export default class RawComponent extends AbstractComponent{

    constructor(task) {
        super();
        this.task = task;
    }

    get template() {
        return rawComponentTemplate();
    }
}