
import { get,post } from './index'

export const list = (params) => {  
    return get('api/product/admin/getTags',params)
};

export const add = (params) => {
    return post('api/product/admin/addTag',params)
};

export const remove = (params) => {
    return get('api/product/admin/removeTag',params)
}