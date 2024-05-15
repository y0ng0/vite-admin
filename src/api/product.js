import {get,post } from './index'

export const list = (params) => {
    return get('api/product/admin/list', params);
}

export const hide = (params) => {
    return post('api/product/admin/hide', params);
}