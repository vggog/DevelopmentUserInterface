import {AbstractComponent} from "../framework/view/abstract.component.js";

function createNoTaskTemplate() {
    return (
        `<p class="board_no-tasks">
            Loading...
        </p>`
    );
}

export default class LoadingViewControllerComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}