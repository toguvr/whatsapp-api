import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { create } from '@wppconnect-team/wppconnect';

export let client;

async function bootstrap() {
  await create({
    session: 'bot',
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
      Object.assign(client, {
        status: 'QRCODE',
        qrcode: base64Qr,
        urlcode: urlCode,
      });
      // base64Qr = base64Qr.replace('data:image/png;base64,', '');
      // const imageBuffer = Buffer.from(base64Qr, 'base64');
    },
    statusFind: (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    headless: true, // Headless chrome

    devtools: false, // Open devtools by default
    useChrome: true, // If false will use Chromium instance
    debug: false, // Opens a debug session
    logQR: true, // Logs QR automatically in terminal
    browserWS: '', // If u want to use browserWSEndpoint
    browserArgs: [], // Parameters to be added into the chrome browser instance
    puppeteerOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }, // Will be passed to puppeteer.launch
    disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
    updatesLog: true, // Logs info updates automatically in terminal
    autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
    tokenStore: 'file', // Define how work with tokens, that can be a custom interface
    folderNameToken: './tokens', //folder name when saving tokens
  })
    .then((instance) => {
      client = instance;
    })
    .catch((erro) => console.log(erro));

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Whatsapp Api')
    .setDescription('all about whatsapp api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  await app.listen(port || 3333);
}
bootstrap();
