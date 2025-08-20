import { HttpService, NotificationService } from "services";
import { format, parse } from "date-fns";

const IssuePeriodService = {
    async findAll(boardId, filter) {
        const params = {
            startDate: format(parse(filter.startDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
            endDate: format(parse(filter.endDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
        };

        const { data } = await HttpService.get(`/boards/${boardId}/issue-periods`, { params });
        return data;
    },

    async create(boardId, issuePeriod) {
        try {
            const body = {
                startDate: issuePeriod.startDate,
                endDate: issuePeriod.endDate
            };

            await HttpService.post(`/boards/${boardId}/issue-periods`, body);
            NotificationService.notifySuccess("Período inserido com sucesso");

            return {};
        } catch ({ response }) {
            if (response.status === 400) {
                this._notifyCreateIssuePeriodErrors(response);
                return response.data;
            } else {
                NotificationService.notifyError("Falha ao cadastrar período");
                return {};
            }
        }
    },

    async delete(boardId, issuePeriodId) {
        try {
            await HttpService.delete(`/boards/${boardId}/issue-periods/${issuePeriodId}`);

            NotificationService.notifySuccess("Período removido com sucesso");
        } catch (error) {
            NotificationService.notifyError("Falha ao remover o período");
        }
    },

    async update(boardId, issuePeriodId) {
        try {
            await HttpService.put(`/boards/${boardId}/issue-periods/${issuePeriodId}`);

            NotificationService.notifySuccess("Período atualizado com sucesso");
            return {};
        } catch ({ response }) {
            if (response.status === 400) {
                this._notifyCreateIssuePeriodErrors(response);
                return response.data;
            } else {
                NotificationService.notifyError("Falha ao cadastrar período");
                return {};
            }
        }
    },

    _notifyCreateIssuePeriodErrors({ data }) {
        for (let [key, value] of Object.entries(data)) {
            value.forEach(error => {
                NotificationService.notifyError(`${key} - ${error}`);
            });
        }
    }

};

export default IssuePeriodService;
