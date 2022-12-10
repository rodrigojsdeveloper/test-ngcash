"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocks_1 = require("../../../../../src/mocks");
const data_source_1 = require("../../../../../src/data-source");
const app_1 = require("../../../../../src/app");
const supertest_1 = __importDefault(require("supertest"));
describe('Tests for transaction routes', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then(res => connection = res)
            .catch(err => console.error('Error during Data Source initialization', err));
        yield (0, supertest_1.default)(app_1.app).post('/users').send(mocks_1.user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection.destroy(); }));
    test('Must be able to list transactions date', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date();
        const day = String(date.getDate() - 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        const login = yield (0, supertest_1.default)(app_1.app).post('/session').send(mocks_1.session);
        const token = login.body.token;
        const response = yield (0, supertest_1.default)(app_1.app).get(`/transactions/${formattedDate}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('map');
    }));
    test('Must be able to prevent listing transactions date without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date();
        const day = String(date.getDate() - 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        const response = yield (0, supertest_1.default)(app_1.app).get(`/transactions/${formattedDate}`).send(mocks_1.transaction);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    }));
});