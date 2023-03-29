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
exports.EvntController = void 0;
const common_1 = require("@nestjs/common");
const evnt_service_1 = require("./evnt.service");
const create_evnt_dto_1 = require("./dto/create-evnt.dto");
const update_evnt_dto_1 = require("./dto/update-evnt.dto");
const passport_1 = require("@nestjs/passport");
const auth_entity_1 = require("../auth/entities/auth.entity");
const get_user_decorator_1 = require("../_helper/get-user.decorator");
const get_evnt_filter_dto_1 = require("./dto/get-evnt-filter.dto");
let EvntController = class EvntController {
    constructor(srv) {
        this.srv = srv;
        this.logger = new common_1.Logger('EvntController');
        this.logger.verbose('--- constructor ---');
    }
    createItem(createDto, user) {
        this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
        this.logger.verbose(`---`);
        return this.srv.createItem(createDto, user);
    }
    getItemCount(user) {
        this.logger.verbose(`getItemCount - start`);
        this.logger.verbose(`---`);
        return this.srv.getItemCount(user);
    }
    getItems(filterDto, user) {
        this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
        this.logger.verbose(`---`);
        return this.srv.getItems(filterDto, user);
    }
    getItem(id, user) {
        this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`---`);
        return this.srv.getItem(id, user);
    }
    updateItem(id, updateDto, user) {
        this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
        this.logger.verbose(`---`);
        return this.srv.updateItem(id, updateDto, user);
    }
    deleteItem(id, user) {
        this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
        this.logger.verbose(`---`);
        return this.srv.deleteItem(id, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evnt_dto_1.CreateEvntDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('/count'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "getItemCount", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_evnt_filter_dto_1.GetEvntFilterDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "getItems", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "getItem", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evnt_dto_1.UpdateEvntDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], EvntController.prototype, "deleteItem", null);
EvntController = __decorate([
    (0, common_1.Controller)('evnt'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [evnt_service_1.EvntService])
], EvntController);
exports.EvntController = EvntController;
//# sourceMappingURL=evnt.controller.js.map