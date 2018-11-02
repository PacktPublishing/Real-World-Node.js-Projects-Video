import axios from 'axios';

export class ProductsService {
    constructor() {
        this.baseUrl = "http://localhost:9000/api/products";
    }

    async findAll() {
        let response = await axios.get(this.baseUrl);
        return this.checkAndReturn(response);
    }

    async update(product) {
        let response = await axios.put(`${this.baseUrl}/${product._id}`, {
            available: product.available
        });
        return this.checkAndReturn(response);
    }

    checkAndReturn(response) {
        if (response.status !== 200) {
            throw new Error("Request failed");
        }
        return response.data;
    }
}