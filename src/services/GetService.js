import axios from "../axios";

class GetService {

    fetchAllUsers = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    fetchAllProducts = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    fetchAllCarts = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }

    fetchAllProductCategories = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products/categories')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }
}

export default new GetService();

