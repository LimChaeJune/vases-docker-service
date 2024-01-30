import 'module-alias/register';
import path from 'path';
import express, { NextFunction } from 'express';
import session from 'express-session';
import connectSession from 'connect-session-knex';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';
import configure from './configure';
import { RegisterRoutes } from '@app/controllers/http/routes';
import modules from '@app/modules';
import { BaseEntity } from '@app/modules/datasource/BaseEntity';
import { ValidateError } from 'tsoa';
import { CustomValidationError } from '@app/types/response';

const KnexSessionStore = connectSession(session);

// global config 설정
const config = configure();
global.config = config;
console.log(config);

modules.initialize().then(() => {
  const app = express();
  const session_store = new KnexSessionStore({
    knex: BaseEntity.database,
    createtable: false,
    tablename: 'saige_session',
  });
  const router = express.Router();

  router.use('/public', express.static(path.join(__dirname, '../public')));

  router.use(express.urlencoded());
  router.use(express.json());

  router.use(
    session({
      secret: 'saige',
      cookie: {
        maxAge: 1000 * 60 * config.session_time,
      },
      saveUninitialized: false,
      resave: false,
      store: session_store,
      rolling: true,
    })
  );

  router.use(passport.initialize());
  router.use(passport.session());

  router.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/service/v1/public/swagger.json',
      },
    })
  );

  router.get(
    '/redoc',
    redoc({
      title: 'API Docs',
      specUrl: '/service/v1/public/swagger.json',
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#6EC5AB',
            },
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
              code: '#87E8C7',
              backgroundColor: '#4D4D4E',
            },
          },
          menu: {
            backgroundColor: '#ffffff',
          },
        },
      },
    })
  );

  router.use(function ensureAuth(req, res, next) {
    if (req.isAuthenticated() || req.path.startsWith('/auth')) {
      next();
    } else {
      res.status(401).send({ message: 'Not Allowed' });
    }
  });

  RegisterRoutes(router);

  router.use(function errorHandler(
    err: unknown,
    req: any,
    res: any,
    next: NextFunction
  ) {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).send({
        message: 'Validation Failed',
        details: err.fields,
      });
    }

    if (err instanceof CustomValidationError) {
      return res.status(422).send({
        message: 'Validation Failed',
        details: err.fields,
      });
    }

    if (err instanceof Error) {
      return res.status(500).send({ message: 'Interval Server Error' });
    }

    next();
  });
  // app.use(function notFoundHandler(req, res, next) {
  //   res.status(404).send({
  //     message: 'Not Found',
  //   });
  // });

  app.use('/service/v1', router);

  app
    .listen(global.config.port, global.config.host, () => {
      console.log('server process');
    })
    .on('error', (err) => {
      console.log(err);
    });
});
