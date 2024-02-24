"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_knex_1 = __importDefault(require("connect-session-knex"));
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const redoc_express_1 = __importDefault(require("redoc-express"));
const configure_1 = __importDefault(require("./configure"));
const routes_1 = require("@app/controllers/http/routes");
const modules_1 = __importDefault(require("@app/modules"));
const BaseEntity_1 = require("@app/modules/datasource/BaseEntity");
const tsoa_1 = require("tsoa");
const response_1 = require("@app/types/response");
const express_ws_1 = __importDefault(require("express-ws"));
const KnexSessionStore = (0, connect_session_knex_1.default)(express_session_1.default);
// global config 설정
const config = (0, configure_1.default)();
global.config = config;
console.log(config);
modules_1.default.initialize().then(() => {
    const app = (0, express_1.default)();
    const wsInstance = (0, express_ws_1.default)(app);
    const send = (msg, targets) => {
        wsInstance.getWss().clients.forEach((client) => {
            if (targets && targets.length > 0) {
                if (client.user && targets.includes(client.user.idx)) {
                    client.send(msg);
                }
            }
            else {
                client.send(msg);
            }
        });
    };
    const session_store = new KnexSessionStore({
        knex: BaseEntity_1.BaseEntity.database,
        createtable: false,
        tablename: 'saige_session',
    });
    const router = express_1.default.Router();
    router.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
    router.use(express_1.default.urlencoded());
    router.use(express_1.default.json());
    router.use((0, express_session_1.default)({
        secret: 'saige',
        cookie: {
            maxAge: 1000 * 60 * config.session_time,
        },
        saveUninitialized: false,
        resave: false,
        store: session_store,
        rolling: true,
    }));
    router.use(passport_1.default.initialize());
    router.use(passport_1.default.session());
    router.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
        swaggerOptions: {
            url: '/service/v1/public/swagger.json',
        },
    }));
    router.get('/redoc', (0, redoc_express_1.default)({
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
    }));
    router.use(function ensureAuth(req, res, next) {
        if (req.isAuthenticated() || req.path.startsWith('/auth')) {
            next();
        }
        else {
            res.status(401).send({ message: 'Not Allowed' });
        }
    });
    (0, routes_1.RegisterRoutes)(router);
    router.use(function errorHandler(err, req, res, next) {
        if (err instanceof tsoa_1.ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).send({
                message: 'Validation Failed',
                details: err.fields,
            });
        }
        if (err instanceof response_1.CustomValidationError) {
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
    router.ws('*', (ws, req) => {
        if (!req.user) {
            ws.close();
            return;
        }
        ws.user = req.user;
        ws.on('message', (msg) => {
            console.log(msg);
        });
        ws.on('close', () => {
            console.log('WebSocket was closed');
        });
    });
    app.use('/service/v1', router);
    app
        .listen(global.config.port, global.config.host, () => {
        console.log('server process');
    })
        .on('error', (err) => {
        console.log(err);
    });
});
//# sourceMappingURL=index.js.map