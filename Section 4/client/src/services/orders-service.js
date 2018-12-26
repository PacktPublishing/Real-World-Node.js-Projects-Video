import axios from 'axios';

export class OrdersService {
    constructor() {
        this.baseUrl = "http://localhost:9000/api/orders";
    }

    async findAll(email) {
        let response = await axios.get(`${this.baseUrl}/${email}`);
        return this.checkAndReturn(response);
    }

    async create(order) {
        let response = await axios.post(this.baseUrl, order);
        return this.checkAndReturn(response);

    }

    async remove(id) {
        let response = axios.delete(`${this.baseUrl}/${id}`);
        return this.checkAndReturn(response);
    }

    checkAndReturn(response) {
        if (response.status !== 200) {
            throw new Error("Request failed");
        }
        return response.data;
    }
}