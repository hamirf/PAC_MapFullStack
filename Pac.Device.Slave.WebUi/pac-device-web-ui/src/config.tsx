const production = {
  SERVICE_URL: '//' + window.location.hostname + ':' + window.location.port + '/api',
  SIGNALR_URL: '//' + window.location.hostname + ':' + window.location.port + '/notification',
};

const development = {
  SERVICE_URL: 'https://' + window.location.hostname + ':7027/api',
  SIGNALR_URL: '//' + window.location.hostname + ':7027/notification',
};


export default process.env.NODE_ENV === 'production' ? production : development;