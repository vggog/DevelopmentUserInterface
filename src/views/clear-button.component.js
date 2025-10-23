import {AbstractComponent} from "../framework/view/abstract.component.js";


function clearButtonComponentTemplate() {
    return (
        `<form>
<button type="submit" class="clear-button" ">
            Очистить
        </button>
</form>
`
    );
}

export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;
    #disabled = false;

    get template() {
        return clearButtonComponentTemplate(this.#disabled);
    }

    constructor( {onClick} ) {
        super();
        this.#handleClick = onClick;

        this.element.addEventListener('submit', this.#clickHandler)
    }

    #clickHandler = (evn) => {
        evn.preventDefault();
        this.#handleClick();
    }
}