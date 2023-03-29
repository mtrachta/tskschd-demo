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
exports.EvntService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const evnt_repository_1 = require("./evnt.repository");
let EvntService = class EvntService {
    constructor(rep) {
        this.rep = rep;
        this.logger = new common_1.Logger('EvntService');
        this.logger.verbose('--- constructor ---');
    }
    async getItemCount(user) {
        this.logger.verbose(`getItemCount - start`);
        this.logger.verbose(`---`);
        return this.rep.getItemCount(user);
    }
    async createItem(createDto, user) {
        this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
        this.logger.verbose(`---`);
        return this.rep.createItem(createDto, user);
    }
    async getItems(filterDto, user) {
        this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
        this.logger.verbose(`---`);
        return this.rep.getItems(filterDto, user);
    }
    async getItem(id, user) {
        this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`---`);
        return this.rep.getItem(id, user);
    }
    async updateItem(id, updateDto, user) {
        this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
        this.logger.verbose(`---`);
        return this.rep.updateItem(id, updateDto, user);
    }
    async deleteItem(id, user) {
        this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`---`);
        return this.rep.deleteItem(id, user);
    }
};
EvntService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evnt_repository_1.EvntRepository)),
    __metadata("design:paramtypes", [evnt_repository_1.EvntRepository])
], EvntService);
exports.EvntService = EvntService;
//# sourceMappingURL=evnt.service.js.map