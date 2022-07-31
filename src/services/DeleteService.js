import axios from "../axios";

class DeleteService {

    deleteUser = async (data) => {

        const promise = new Promise((resolve, reject) => {
            axios.delete('users/'+data)   //10s
                .then((res) => {
                    console.log(res)
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
}

export default new DeleteService();

