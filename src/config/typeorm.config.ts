import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(__dirname + '/../**/*.entity.ts');

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5434,
	username: 'postgres',
	password: '',
	database: 'tasks',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
}