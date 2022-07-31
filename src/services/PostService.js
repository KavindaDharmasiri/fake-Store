import axios from "../axios";

class PostService {
    createPostUser = async (data) => {
        console.log("form data: " + data)
        const promise = new Promise((resolve, reject) => {
            axios.post('users', data)
                .then((res) => {
                    console.log('return')
                    return resolve(res)
                })
                .catch((er) => {
                    console.log("error")
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
}
export default new PostService();