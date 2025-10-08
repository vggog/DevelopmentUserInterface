import HeaderComponent from './views/header.component.js';
import {render, RenderPosition} from './framework/render.js';
import CreateTaskComponent from "./views/create_task.component.js";
import BoardComponent from "./views/board.component.js";
import TasksColumnComponent from "./views/tasks-column.component.js";
import TaskItemComponent from "./views/task-item.component.js";


const bodyContainer= document.querySelector('body');
const mainContainer= document.querySelector('.container');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new CreateTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);
render(new BoardComponent(), mainContainer, RenderPosition.BEFOREEND);

const board = document.querySelector('.board');
for (let i = 0; i < 4; i++) {
    render(new TasksColumnComponent(), board, RenderPosition.AFTERBEGIN);
    const backLog = board.children[0].children[board.children[0].children.length-1];

    for (let j = 0; j < 3; j++) {
        render(new TaskItemComponent(), backLog, );
    }
}
