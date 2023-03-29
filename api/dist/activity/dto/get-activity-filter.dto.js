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
exports.GetActivityFilterDto = void 0;
const class_validator_1 = require("class-validator");
const activity_priority_enum_1 = require("../enum/activity-priority.enum");
const activity_status_enum_1 = require("../enum/activity-status.enum");
class GetActivityFilterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(activity_status_enum_1.ActivityStatus),
    __metadata("design:type", String)
], GetActivityFilterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(activity_priority_enum_1.ActivityPriority),
    __metadata("design:type", String)
], GetActivityFilterDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetActivityFilterDto.prototype, "search", void 0);
exports.GetActivityFilterDto = GetActivityFilterDto;
//# sourceMappingURL=get-activity-filter.dto.js.map