import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = await this.prisma.role.create({
        data: {
          ...createRoleDto,
        },
      });
      return newRole;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new NotFoundException('Role já cadastrado');
      }
    }
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
