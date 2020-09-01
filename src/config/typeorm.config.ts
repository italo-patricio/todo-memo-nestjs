import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5434,
	username: 'postgres',
	password: '',
	database: 'tasks',
	entities: [__dirname + '/../**/*.entity.ts'],
	synchronize: true,
}