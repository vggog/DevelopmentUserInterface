import HeaderComponent from './views/header.component.js';
import {render, RenderPosition} from './framework/render.js';
import CreateTaskComponent from "./views/create_task.component.js";
import TaskBoardPresenter from "./presenter/tasks-board.presenter.js";
import TaskModel from "./models/task.model.js";


const bodyContainer= document.querySelector('body');
const mainContainer= document.querySelector('.container');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new CreateTaskComponent(), mainContainer, RenderPosition.AFTERBEGIN);

const tasksModel = new TaskModel();
const taskBoardPresenter=new TaskBoardPresenter(mainContainer, tasksModel);

taskBoardPresenter.init();
