function queryStringify(data?: {[key:string]:string}) {
  const arr = [];
  for (const key in data) {
    arr.push(key + '=' + data[key]);
  }
  return arr.length? '?' + (arr.join('&')) : '';
}

export class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = (url:string, options: {data?:{[key:string]:any}, headers?:{[key:string]:string}, timeout?:number}) => {
        return this.request(this.baseUrl + url + queryStringify(options.data),  {
      ...options,
      method: 'GET'
    }, options.timeout);
  };

  put= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(this.baseUrl + url , {...options, method: 'PUT'}, options.timeout);
  };
  post= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(this.baseUrl + url , {...options, method: 'POST'}, options.timeout);
  };
  delete= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(this.baseUrl + url , {...options, method: 'DELETE'}, options.timeout);
  };

  request = (url:string, options: {data?:any, headers?:{[key:string]:string}, method:string}, timeout = 5000) => {
    const headers =  options.headers;
    const data = options.data;
    const method = options.method;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials  = true;
      xhr.responseType = 'json';
      if (headers){
        for (const key of Object.keys(headers)){
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.timeout = timeout;
      xhr.onload = function () {
        if (xhr.status >= 200  &&  xhr.status < 300){
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData){
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }

      }
    })
  };
}

