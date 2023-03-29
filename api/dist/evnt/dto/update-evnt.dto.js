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
exports.UpdateEvntDto = void 0;
const class_validator_1 = require("class-validator");
const evnt_priority_enum_1 = require("../enum/evnt-priority.enum");
const evnt_status_enum_1 = require("../enum/evnt-status.enum");
class UpdateEvntDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(evnt_status_enum_1.EvntStatus),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(evnt_priority_enum_1.EvntPriority),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "parentID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateEvntDto.prototype, "start", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateEvntDto.prototype, "finish", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "taskID", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "assigneeID", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEvntDto.prototype, "note", void 0);
exports.UpdateEvntDto = UpdateEvntDto;
//# sourceMappingURL=update-evnt.dto.js.map