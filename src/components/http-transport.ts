function queryStringify(data?: {[key:string]:string}) {
  let arr = [];
  for (let key in data) {
    arr.push(key + '=' + data[key]);
  }
  return arr.length? '?' + (arr.join('&')) : '';
}

export class HTTPTransport {
  get = (url:string, options: {data?:{[key:string]:any}, headers?:{[key:string]:string}, timeout?:number}) => {
        return this.request(url + queryStringify(options.data),  {
      ...options,
      method: 'GET'
    }, options.timeout);
  };

  put= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(url , {...options, method: 'PUT'}, options.timeout);
  };
  post= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(url , {...options, method: 'POST'}, options.timeout);
  };
  delete= (url:string, options: {data?:any, headers?:{[key:string]:string}, timeout?:number}) => {

    return this.request(url , {...options, method: 'DELETE'}, options.timeout);
  };

  request = (url:string, options: {data?:any, headers?:{[key:string]:string}, method:string}, timeout:number = 5000) => {
    let headers =  options.headers;
    let data = options.data;
    let method = options.method;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials  = true;
      xhr.responseType = 'json';
      if (headers){
        for (let key of Object.keys(headers)){
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.timeout = timeout;
      xhr.onload = function () {
        if (xhr.status >= 400){
          reject(xhr);
        } else {
          resolve(xhr);
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

