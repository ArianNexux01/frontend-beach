const environmentDev = {
  baseURL: 'http://localhost:3001/api',
  fileURL: 'http://localhost:3001/',
};

const environmentProd = {
  baseURL: 'http://192.168.1.5:3001/api',
  fileURL: 'http://192.168.1.5:3001/',
};

// eslint-disable-next-line no-constant-condition
export const environment = false ? environmentDev : environmentProd;
