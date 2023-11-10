import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: '5524999999999',
    description: `use Country + DDD + Number.`,
  })
  phone: string;

  @ApiProperty({
    example: 'Hello World',
    description: `your text to send.`,
  })
  message: string;
}
