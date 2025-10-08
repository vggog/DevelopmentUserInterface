import {render} from '../framework/render.js';
import BoardComponent from "../views/board.component.js";
import TaskItemComponent from "../views/task-item.component.js";
import {status} from "../constants/status.js";
import {statusLabel} from "../constants/status-label.js";
import TasksColumnComponent from "../views/tasks-column.component.js";
import ClearButtonComponent from "../views/clear-button.component.js";


export default class TaskBoardPresenter {
    #tasksBoardComponent=new BoardComponent();

    #boardContainer=null;
    #tasksModel=null;
    #boardTasks=[]

    constructor (boardContainer, tasksModel) {
        this.#boardContainer=boardContainer;
        this.#tasksModel=tasksModel;
        this.#boardTasks=[...this.#tasksModel.getTasks()];
    }

    init(){
        render(this.#tasksBoardComponent, this.#boardContainer);
        for (let i=0; i < status.length; i++) {
            const taskTableComponent=new TasksColumnComponent(status[i], statusLabel[status[i]]);
            render(taskTableComponent,this.#tasksBoardComponent.getElement());

            let filterTaskList=this.#boardTasks.filter(task => task.status === status[i]);
            for (let j = 0; j < filterTaskList.length; j++) {
                const task = new TaskItemComponent(filterTaskList[j]);
                render(task, taskTableComponent.getElement().querySelector("ul"));
            }

            if(status[i] === "trash") {
                render(new ClearButtonComponent(),taskTableComponent.getElement());
            }
        }
    }
}
