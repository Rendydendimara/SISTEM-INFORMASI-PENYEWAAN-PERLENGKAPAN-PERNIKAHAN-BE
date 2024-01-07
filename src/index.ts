import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import http from 'http';
import https from 'https';
import { Request, Response, NextFunction } from 'express';
import Debug from 'debug';
import fs from 'fs';
const debug = Debug('backend-pengajuancuti:server');
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';
import db from './db/mysql/db-config';
import { createTableUser, createUser } from './db/mysql/models/User';
import { createTablePaket } from './db/mysql/models/Paket';
import { createTablePesanan } from './db/mysql/models/Pesanan';
import { PORT } from './config';

const folders = ['uploads/images'];
for (const folder of folders) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

dotenv.config();

// init express app
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Init Mysql
db.getConnection(async (err: any, result: any) => {
  if (err) {
    console.log('Database tidak terkoneksi, aplikasi tidak dapat meload data');
    console.log('err', err);
  } else {
    console.log('Successfully connected to database');
    await createTableUser();
    await createTablePaket();
    await createTablePesanan();

    // create admin
    // createUser({
    //   username: 'Admin',
    //   password: 'Password123',
    //   hakAkses: 'admin',
    //   token: '',
    //   nomor_telepon: '',
    //   alamat: '',
    //   email: 'admin@gmail.com'
    // });
    // create user
    // createUser({
    //   username: 'User',
    //   password: 'Password123',
    //   nama: 'User',
    //   hakAkses: 'user',
    //   nip: '12345',
    //   token: '',
    //   unitId: 1,
    // });
    //   password: 'password',
    //   email: 'admin@gmail.com',
    //   username: 'admin',
    // });

    // await createUnit({
    //   namaUnit: 'Unit A',
    //   alamat: 'Waingapu',
    // });
    // await createUnit({
    //   namaUnit: 'Unit B',
    //   alamat: 'Payeti',
    // });
    // await createUnit({
    //   namaUnit: 'Unit C',
    //   alamat: 'Radamata',
    // });
    // await createJenisBarang({
    //   namaJenisBarang: 'Barang A',
    //   kodeJenisBarang: 'BRGA',
    // });
    // await createJenisBarang({
    //   namaJenisBarang: 'Barang B',
    //   kodeJenisBarang: 'BRGB',
    // });
    // await createJenisBarang({
    //   namaJenisBarang: 'Barang C',
    //   kodeJenisBarang: 'BRGC',
    // });
  }
});

// Set Public Folder
app.use('/uploads/images', express.static('uploads/images'));

// Logger
app.use(
  morgan(function (tokens, req, res) {
    const responseCode = tokens?.status(req, res) ?? '500';
    if (responseCode.charAt(0) === '4' || responseCode.charAt(0) === '5') {
      if (req.body.files) {
        req.body.files = undefined; // except files
      }
      console.log('request.body', req.body);
      console.log('request.query', req.query);
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        responseCode,
        tokens['response-time'](req, res),
        'ms',
      ].join(' ');
    }
  })
);

// Cors enable (include before routes)
app.use(cors());

// Protection http using helmet
app.use(helmet());

// Mount routes
app.use('/api', apiRouter);

// // 404
// app.use(express.static(path.join(__dirname, '/client/build')));

// // 404
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/client/build/index.html`));
// });

// error handler
app.use(
  async (err: Error | any, req: Request, res: Response, next: NextFunction) => {
    const isDev =
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'staging';
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = isDev ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({
      success: false,
      data: null,
      message: isDev ? err.message : 'Ooops ada kesalahan pada sistem.',
    });
  }
);

// Listen
const port = normalizePort(process.env.PORT || PORT);
app.set('port', port);

if (process.env.NODE_ENV === 'development') {
  // const httpsServer = https.createServer(app);
  const httpsServer = http.createServer(app);

  httpsServer.listen(port, () => {
    const addr = httpsServer.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug(`Listening on ${bind}`);
    console.log(
      [
        `🚀 Server start on port ${port}`,
        `Running with ${process.env.NODE_ENV} environment...`,
      ],
      'app-startup'
    );
  });
  console.log('\nserver running on port ', port);
  httpsServer.on('error', onError);
} else {
  const server = http.createServer(app);
  server.listen(port);
  console.log('Running on', server.address());
  server.on('error', onError);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
