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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const bcrypt = require("bcrypt");
let AuthRepository = class AuthRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('AuthRepository');
        this.logger.verbose('--- constructor ---');
    }
    async signup(signupDto) {
        const { username, password, firstname, lastname } = signupDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword, firstname, lastname });
        this.logger.verbose(`signup->user: ${JSON.stringify(user)}`);
        this.logger.verbose('---');
        try {
            await this.save(user);
            this.logger.verbose(`signup->saved(user): ${JSON.stringify(user)}`);
            this.logger.verbose('---');
        }
        catch (error) {
            this.logger.verbose(`signup->error: ${JSON.stringify(error)}`);
            this.logger.verbose('---');
            if (error.code === 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
AuthRepository = __decorate([
    (0, typeorm_1.EntityRepository)(auth_entity_1.User),
    __metadata("design:paramtypes", [])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map