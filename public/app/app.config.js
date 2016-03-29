'use strict';

var apiConfig = window.apiConfig || {};

apiConfig.API_ROOT_URL = '/api';
apiConfig.POST_URL = apiConfig.API_ROOT_URL + '/post';

window.apiConfig = apiConfig;
