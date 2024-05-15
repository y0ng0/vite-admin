import { get,post } from './index'

export const login = (params) => {
    return post('api/user/admin/login', params);
}

export const list = (params) => {
    return get('api/user/list', params);
}

export const disable = (params) => {
    return post('api/user/disable', params);
}

export const enable = (params) => {
    return post('api/user/enable', params);
}

export const refreshPwd = (params) => {
    return get('api/user/refreshPwd', params);
}