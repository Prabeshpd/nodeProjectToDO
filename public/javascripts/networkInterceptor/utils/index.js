const methodsInvocation = ({ method, url, onSuccess, onError, headers, xhr, data }) => {
  let methodConstructors = { method, url, onSuccess, onError, headers, xhr, data };
  const methods = {
    GET: new Get(methodConstructors),
    POST: new Post(methodConstructors),
    PUT: new Put(methodConstructors),
    DELETE: new Delete(methodConstructors)
  };
  return methods[method];
};

const dataToJson = data => JSON.stringify(data);

const setXhrHeader = ({ xhr, headers }) => {
  for (let [key, value] of Object.entries(headers)) {
    xhr.setRequestHeader([key], [value]);
  }
};

const jsontoData = data => JSON.parse(data);

const getAccessToken = () => {
  let cookie = {};
  document.cookie.split(";").forEach(el => {
    let [k, v] = el.split("=");
    cookie[k.trim()] = v;
  });
  return cookie["access_token"];
};
