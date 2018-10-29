let baseUrl = '';

if(process.env.NODE_ENV === 'development') {
    baseUrl = '/api';
} else {
    baseUrl = 'http://xiehao.xin:8787';
}

export {
    baseUrl,
}