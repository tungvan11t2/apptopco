import axios from '../axios';

export async function uploadAvatar(objUpload) {
    try {
        return await axios.post('UploadAvatar', objUpload);
    }catch (e) {
        return null;
    }
}
