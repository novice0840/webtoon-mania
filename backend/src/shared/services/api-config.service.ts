import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (value === null) {
      throw new Error(key + ' environment variable does not set');
    }
    return value;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get mysqlConfig(): TypeOrmModuleOptions {
    console.log(this.configService.get<string>('DB_KIND'));
    console.log(typeof this.configService.get<number>('DB_PORT'));
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'webtoon_mania',
      entities: ['../../entity/**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
