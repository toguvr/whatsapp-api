import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { client } from 'src/main';

@Injectable()
export class MessagesService {
  async create(createMessageDto: CreateMessageDto) {
    const { phone, message } = createMessageDto;
    let mensagemretorno = '';
    let sucesso = false;
    const cellphone = phone.includes('@c.us') ? phone : phone + '@c.us';
    const existsNumber = await client.checkNumberStatus(cellphone);
    if (existsNumber.canReceiveMessage === true) {
      await client
        .sendText(existsNumber.id._serialized, message)
        .then((result) => {
          console.log('Result: ', result); //return object success
          sucesso = true;
          mensagemretorno = result.id;
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else {
      mensagemretorno = 'O numero não está disponível ou está bloqueado';
    }

    const return_object = {
      status: sucesso,
      message: mensagemretorno,
    };

    return return_object;
  }
  createBulk(createMessageDto: CreateMessageDto[]) {
    const mensagens = createMessageDto;
    console.log(mensagens);
    const minDelay = 1000; // 1 segundo em milissegundos
    const maxDelay = 10000; // 10 segundos em milissegundos

    mensagens.forEach((data, index) => {
      const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      setTimeout(() => {
        console.log(
          `Mensagem ${index + 1}: ${JSON.stringify(data)} em ${delay} seg`,
        );
        this.create({
          phone: data.phone,
          message: data.message,
        });
      }, delay);
    });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
