import {AbstractComponent} from "../framework/view/abstract.component.js";


function headerComponentTemplate() {
    return (
        `<header>
            <h1 class="container">Список задач</h1>
        </header>`
    )
}


export default class HeaderComponent extends AbstractComponent {

    get template() {
        return headerComponentTemplate();
    }
}
