const environmentDev = {
  baseURL: 'http://localhost:3001/api',
  fileURL: 'http://localhost:3001/',
};

const environmentProd = {
  baseURL: 'http://41.205.55.48:3001/api',
  fileURL: 'http://41.205.55.48:3001/',
};

// eslint-disable-next-line no-constant-condition
export const environment = false ? environmentDev : environmentProd;
