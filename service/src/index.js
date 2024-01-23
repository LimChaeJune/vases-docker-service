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
const KnexSessionStore = (0, connect_session_knex_1.default)(express_session_1.default);
// global config 설정
const config = (0, configure_1.default)();
global.config = config;
console.log(config);
modules_1.default.initialize().then(() => {
    const app = (0, express_1.default)();
    const session_store = new KnexSessionStore({
        knex: BaseEntity_1.BaseEntity.database,
        createtable: false,
        tablename: 'saige_session',
    });
    app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
    app.use(express_1.default.urlencoded());
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: 'saige',
        cookie: {
            maxAge: 1000 * 60 * config.session_time,
        },
        saveUninitialized: false,
        resave: false,
        store: session_store,
        rolling: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
        swaggerOptions: {
            url: '/public/swagger.json',
        },
    }));
    app.get('/redoc', (0, redoc_express_1.default)({
        title: 'API Docs',
        specUrl: '/public/swagger.json',
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
    (0, routes_1.RegisterRoutes)(app);
    app
        .listen(global.config.port, global.config.host, () => {
        console.log('server process');
    })
        .on('error', (err) => {
        console.log(err);
    });
});
//# sourceMappingURL=index.js.map