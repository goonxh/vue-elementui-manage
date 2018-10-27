let baseUrl = '';

if(process.env.NODE_ENV === 'development') {
    baseUrl = '/api';
} else {
    baseUrl = 'https://api.xiehao.xin';
}

export {
    baseUrl,
}