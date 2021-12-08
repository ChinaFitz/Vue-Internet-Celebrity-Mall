import { v4 as uuidv4 } from 'uuid';

export function gen_uuid() {
    // uuid对于每个人应该只有一个且拥有后不再改变, uuid存储在localStorage中
    let uuid = localStorage.getItem('UUID');
    // 为新游客生成uuid
    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem('UUID', uuid);
    }
    return uuid;
}
