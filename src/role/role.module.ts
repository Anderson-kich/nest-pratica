import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [DbModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
