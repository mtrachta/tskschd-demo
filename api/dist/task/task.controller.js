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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const passport_1 = require("@nestjs/passport");
const auth_entity_1 = require("../auth/entities/auth.entity");
const get_user_decorator_1 = require("../_helper/get-user.decorator");
const get_task_filter_dto_1 = require("./dto/get-task-filter.dto");
let TaskController = class TaskController {
    constructor(srv) {
        this.srv = srv;
        this.logger = new common_1.Logger('TaskController');
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
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('/count'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getItemCount", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_task_filter_dto_1.GetTaskFilterDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getItems", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getItem", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto,
        auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_entity_1.User]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteItem", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map