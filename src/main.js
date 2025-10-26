import HeaderComponent from './views/header.component.js';
import {render, RenderPosition} from './framework/render.js';
import CreateTaskComponent from "./views/create_task.component.js";
import TaskBoardPresenter from "./presenter/tasks-board.presenter.js";
import TaskModel from "./models/task.model.js";
import TasksApiService from "./tasks-api.service.js";


const bodyContainer= document.querySelector('body');
const mainContainer= document.querySelector('.container');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const END_POINT = 'https://68fe21aa7c700772bb12e38c.mockapi.io';

const tasksModel = new TaskModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const taskBoardPresenter=new TaskBoardPresenter(mainContainer, tasksModel);

const createTaskComponent = new CreateTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(createTaskComponent, mainContainer, RenderPosition.AFTERBEGIN);

await taskBoardPresenter.init();
