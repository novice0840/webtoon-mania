import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // constructor() {
  //   super();

  //   // Extend PrismaClient with middleware logic
  //   this.$extends({
  //     query: {
  //       $allModels: {
  //         async findMany({ args, query }) {
  //           // Exclude soft-deleted records for all models
  //           if (!args.where) args.where = {};
  //           args.where['deleted'] = false;
  //           return query(args);
  //         },
  //         async findUnique({ args, query }) {
  //           // Exclude soft-deleted records for all models
  //           if (!args.where) args.where = {};
  //           args.where['deleted'] = false;
  //           return query(args);
  //         },
  //         async delete({ args, query }) {
  //           // Soft delete logic for single records for all models
  //           args.action = 'update';
  //           args.data = { deleted: true };
  //           return query(args);
  //         },
  //         async deleteMany({ args, query }) {
  //           // Soft delete logic for multiple records for all models
  //           args.action = 'updateMany';
  //           if (!args.data) args.data = {};
  //           args.data['deleted'] = true;
  //           return query(args);
  //         },
  //         async create({ args, query }) {
  //           // Add createdAt and updatedAt timestamps for all models
  //           args.data['createdAt'] = new Date();
  //           args.data['updatedAt'] = new Date();
  //           return query(args);
  //         },
  //         async update({ args, query }) {
  //           // Update the updatedAt timestamp for all models
  //           args.data['updatedAt'] = new Date();
  //           return query(args);
  //         },
  //       },
  //     },
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
