import reqwest from 'reqwest';
import config from '../../config/app.config';
import localStorage from '../../libs/storageHelper';

const baseURL = config.BASE_URL;

export function handleRequest(method, url, requireAuth, additionalOptions) {
  const user = localStorage.getFromStorage('loggedUser');
  const ajaxOptions = {
    url: baseURL + url,
    type: 'json',
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(additionalOptions),
  };
  if (requireAuth && user) {
    ajaxOptions.headers.Authorization = `Bearer ${user.token}`;
  }
  const request = reqwest(ajaxOptions);

  request.catch( (error) => {
    if(error.status === config.RESPONSE.UNAUTHORIZED) {
      localStorage.removeFromStorage('loggedUser');
      window.location = "login";
    }
  });
  return request;
}