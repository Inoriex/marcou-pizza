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
exports.TicketController = void 0;
const ticket_dto_1 = require("./dto/ticket.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ticket_service_1 = require("./ticket.service");
const get_user_decorator_1 = require("../components/decorators/get-user.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async getTicket(res, req) {
        const ticket = await this.ticketService.getAllTicket();
        return res.status(common_1.HttpStatus.OK).json({
            message: "le ticket a été récupéré avec succès",
            data: ticket,
        });
    }
    async createTicket(user, ticket, res, req) {
        const newTicket = await this.ticketService.createTicket(Object.assign(Object.assign({}, ticket), { userId: user._id }));
        return res.status(common_1.HttpStatus.OK).json({
            message: "le ticket a été crée avec succès",
            data: newTicket,
        });
    }
    async getUserTicket(user, ticketId, res, req) {
        const userTicket = await this.ticketService.getUserTicket(user._id, ticketId);
        return res.status(common_1.HttpStatus.OK).json({
            message: "le ticket a été crée avec succès",
            data: userTicket,
        });
    }
    async getAllUserTicket(user, res, req) {
        const userTickets = await this.ticketService.getAllUserTickets(user._id);
        return res.status(common_1.HttpStatus.OK).json({
            message: "le ticket a été crée avec succès",
            data: userTickets,
        });
    }
};
__decorate([
    (0, common_1.Get)("/all"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Récupération du ticket OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Impossible de récupéré du tickets" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de récupérer les détails du ticket" }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTicket", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Création du ticket OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Impossible de créer le ticket" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de créer le ticket" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticket_dto_1.createTicketDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)("/:ticketId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Création du ticket OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Impossible de créer le ticket" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de créer le ticket" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("ticketId")),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getUserTicket", null);
__decorate([
    (0, common_1.Get)("/userTickets"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: "Création du ticket OK 👌 " }),
    (0, swagger_1.ApiBadRequestResponse)({ description: "Impossible de créer le ticket" }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: "impossible de créer le ticket" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getAllUserTicket", null);
TicketController = __decorate([
    (0, swagger_1.ApiTags)("api/ticket"),
    (0, common_1.Controller)("api/ticket"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map