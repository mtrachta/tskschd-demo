"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_repository_1 = require("./auth.repository");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(rep, srv) {
        this.rep = rep;
        this.srv = srv;
        this.logger = new common_1.Logger('AuthService');
        this.logger.verbose('--- constructor ---');
    }
    async signup(signupDto) {
        this.logger.verbose(`signup->createDto: ${JSON.stringify(signupDto)}`);
        this.logger.verbose(`---`);
        return this.rep.signup(signupDto);
    }
    async signin(signinDto) {
        const { username, password } = signinDto;
        this.logger.verbose(`signin->username: ${JSON.stringify(username)}`);
        this.logger.verbose(`signin->password: ${JSON.stringify(password)}`);
        this.logger.verbose('---');
        const user = await this.rep.findOne({ username });
        this.logger.verbose(`signin->user: ${JSON.stringify(user)}`);
        this.logger.verbose('---');
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.srv.sign(payload);
            this.logger.verbose(`signin->accessToken: ${JSON.stringify(accessToken)}`);
            this.logger.verbose('---');
            return { accessToken };
        }
        else {
            this.logger.verbose('--- error ---');
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_repository_1.AuthRepository)),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map