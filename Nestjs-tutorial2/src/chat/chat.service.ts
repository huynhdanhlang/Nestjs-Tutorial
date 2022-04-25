import { Injectable } from '@nestjs/common';
import { AuthenticationServices } from '../authentication/authentication.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import Message from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthenticationServices,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(
        authenticationToken,
      );
    if (!user) {
      throw new WsException('Invalid credentials');
    }
    return user;
  }

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messagesRepository.create({
      content,
      author,
    });

    await this.messagesRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }
}
