import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaProvider) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
        },
      });

      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new NotFoundException('Usuário já cadastrado');
      }
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...updateUserDto,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado.');
      }
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado.');
      }
    }
  }

  async assignRoleToUser(userId: string, roleId: string) {
    const roleIds = [
      { id: 'b952967e-36f3-47bf-a80b-c0976f608884' },
      { id: 'f7ba1d59-f179-40b6-b984-750c1baa1785' },
    ];

    const userRole = await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: roleIds, // Conecta uma role existente pelo ID
        },
      },
      include: { roles: true },
    });

    return userRole;
  }
}
