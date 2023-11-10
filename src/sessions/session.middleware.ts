import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { client } from 'src/main';
import { contactToArray } from 'src/utils/functions';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (client && client.isConnected) {
        await client.isConnected();
      } else {
        return res.status(404).json({
          response: null,
          status: 'Disconnected',
          message: 'A sessão do WhatsApp não está ativa.',
        });
      }
      next();
    } catch (error) {
      return res.status(404).json({
        response: null,
        status: 'Disconnected',
        message: 'A sessão do WhatsApp não está ativa.',
      });
    }
  }
}
