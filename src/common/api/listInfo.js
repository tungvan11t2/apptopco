import axios from '../axios';
// get refer select
export async function getDataSelect(token) {
    try {
        return await axios.get('BookingInfoList', {
            params: {
                token: token
            }
        });
    } catch (e) {
        return null;
    }
}
// get refer select data to btn search
export async function getDataSearch(dataObj) {
    try {
        return await axios.get('SearchBookingInfo', {
            params: dataObj
        });
    } catch (e) {
        return e;
    }
}
// event delete
export async function deleteInfoDetail(dataObj) {
    try {
        return await axios.post('BookingInfoDelete', dataObj);
    }
    catch (e) {
        return null;
    }
}
// event extension
export async function extensionInfoDetail(dataObj) {
    try {
        return await axios({
            method: 'post',
            url: '/BookingInfoExtension',
            data: dataObj
        });
    }
    catch (e) {
        return e;
    }
}
// event Get Position
export async function getPosition(dataObj) {
    try {
        return await axios.get('GetPosition', {
            params: dataObj
        });
    } catch (e) {
        return null;
    }
}
// event save booking update
export async function saveBookingUpdate(dataObj) {
    try {
        return await axios({
            method: 'post',
            url: '/BookingInfoUpdate',
            data: dataObj
        });
    }
    catch (e) {
        return e;
    }
}