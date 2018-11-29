let baseUrl = '';

if(process.env.NODE_ENV === 'development') {
    baseUrl = '/api';
} else {
    baseUrl = window.location.origin+ '/api';
}

export {
    baseUrl,
}