import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { exception } from 'console';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';


@Injectable()
export class TasksService {

	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}


	// private tasks: Task[] = [];

	async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
		return await this.taskRepository.getTasks(filterDto);
	}	

	async getTaskById(id: number ): Promise<Task> {
		const found = await this.taskRepository.findOne(id);

		if(!found) {
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}

		return found;
	}


	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async deleteTask(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id);
		
		if(result.affected === 0){
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}
	}

	async updateTask(id: number, status: TaskStatus): Promise<Task>{
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();
		return task;
	}

}
