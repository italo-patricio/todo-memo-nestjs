import { Controller, Get, Post, Body, Query, Param, Delete, Patch, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';

@Controller('/tasks')
export class TasksController {

	constructor(private tasksService: TasksService) {}

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getAllTasks(filterDto);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
	 return this.tasksService.createTask(createTaskDto);
	}

	@Get('/:id')
	getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
		return this.tasksService.getTaskById(id);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: number): Promise<void> {
		return this.tasksService.deleteTask(id);
	}

	@Patch('/:id/status')
	updateTask(
		@Param('id', ParseIntPipe) id: number,
	 	@Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task>{
		return this.tasksService.updateTask(id, status);
	}


}
