import axios from '../axios';

export async function userLogin(objUser) {
    try {
        return await axios.post('UserLogin', objUser);
    }
    catch (e) {
        return null;
    }
}

export async function checkToken(objToken) {
    try {
        return await axios.post('CheckToken', objToken);
    }catch (e) {
        return null;
    }
}

export async function getUsers(token) {
    try {
        return await axios.get('Users', {
            params: {
                token: token
            }
        });
    }catch (e) {
        return null;
    }
}
