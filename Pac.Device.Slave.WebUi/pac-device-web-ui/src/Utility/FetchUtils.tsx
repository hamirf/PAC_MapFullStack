
import { EResultCode, Result } from "../Model/Result";
import { ENotificationType } from "../Model/ENotificationType";
import fileDownload from "js-file-download";
import { sendNotification } from "../Redux/NotificationSlice";
import { getDispatch } from "../Redux/Store";

function getAuthHeader(body?: any) {
  // const user = UserCredentialUtil.getUserCredential();
  // const token = user !== null ? user.token : "";
  let header = new Headers();
  // header.append("Authorization", "Bearer " + token);
  if ( body ) {
    if ( !( body instanceof FormData ) ) {
      header.append("Content-Type", "application/json");
    }
  }

  header.append("pragma", "no-cache");
  header.append("cache-control", "no-cache");

  return header;
}

export function concatOptionalParameter(url: string, args: any) {
  let params:Array<string> = [];
  let keys = Object.keys(args);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let value = args[key];
    if (value != null && value !== undefined) {
      if (Array.isArray(value)) {
        for (let j = 0; j < value.length; j++) {
          params.push(key + "=" + value[j]);
        }
      } else {
        params.push(key + "=" + value);
      }
    }
  }
  if (params.length > 0) {
    return url + "?" + params.join("&");
  } else {
    return url;
  }
}

export async function handleFetch(request: Request): Promise<void> {
  return fetch(request)
    .then((response) => handleResponse(response))
    .catch((error) => {
      console.error(error.message);
      return Promise.reject(error.message);
    });
}

export async function handleResponse(response: Response): Promise<void> {
  const dispatch = getDispatch();
  console.log("RESPONSE", response);
  if (response.status === 200 || response.status === 400) {
    let result: Result<void> = await response.json();
    return handleResult(result);
  } else if (response.status === 401) {
    // dispatch(deleteUserCredential());
    window.location.href = "/login";
    return Promise.reject(new Error("User is not Authorized!"));
  } else {
    const message = {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    };
    const messageStr = JSON.stringify(message, undefined, 2);
    dispatch(sendNotification(ENotificationType.Error, messageStr));
    throw new Error(messageStr);
  }
}

async function handleResult(result: Result<void>): Promise<void> {
  const dispatch = getDispatch();
  console.log("OK RESPONSE", { result });

  switch (result.resultCode) {
    case EResultCode.Ok: {
      return Promise.resolve();
    }
    case EResultCode.Warning: {
      dispatch(sendNotification(ENotificationType.Warning, result.description));
      return Promise.resolve();
    }
    case EResultCode.Fail:
    case EResultCode.Error: {
      const description = result.description
        ? result.description
        : "Unknown Error";
      dispatch(sendNotification(ENotificationType.Error, description));
      throw new Error(description);
    }
  }
  return Promise.reject(new Error("Unknown result code"));
}

export async function handleError(error: Error) {
  const dispatch = getDispatch();
  console.log("ERROR RESPONSE", { error });
  dispatch(sendNotification(ENotificationType.Error, error.message));
  return {
    error: error.message,
  };
}

export async function handleErrorString(error: string) {
  const dispatch = getDispatch();
  console.log("ERROR RESPONSE", { error });
  dispatch(sendNotification(ENotificationType.Error, error));
  return {
    error: error,
  };
}

export async function sendPostRequest(endpoint: string, body?: any) {
  let request =
    body === null || body === undefined
      ? new Request(endpoint, {
          method: "POST",
          headers: getAuthHeader(),
        })
      : new Request(endpoint, {
          method: "POST",
          body: body,
          headers: getAuthHeader(body),
        });
  console.log("POST", { endpoint }, { body });
  console.log(JSON.stringify(body));
  return handleFetch(request);
}

export async function sendPostRequestReturnValue<T>(
  endpoint: string,
  body?: any
) {
  let request;
  if ( body === null || body === undefined ) {
    request = new Request(endpoint, {
                method: "POST",
                headers: getAuthHeader(),
              });
  } else if ( body instanceof FormData ) {
    request = new Request(endpoint, {
                method: "POST",
                body: body,
                headers: getAuthHeader(body),
              });
  } else {
    request = new Request(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
                headers: getAuthHeader(body),
              });    
  }
  console.log("POST", { endpoint }, { body });
  return handleFetchWithValue<T>(request);
}

export async function sendPutRequest(
  endpoint: string,
  body?: any
): Promise<void> {
  let request =
    body === null || body === undefined
      ? new Request(endpoint, {
          method: "PUT",
          headers: getAuthHeader(),
        })
      : new Request(endpoint, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: getAuthHeader(body),
        });

  console.log("PUT", { endpoint }, { body });

  return handleFetch(request);
}
export async function sendPutRequestReturnValue<T>(
    endpoint: string,
    body?: any
) {
  let request =
      body === null || body === undefined
          ? new Request(endpoint, {
            method: "PUT",
            headers: getAuthHeader(),
          })
          : new Request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: getAuthHeader(body),
          });
  
  console.log("PUT", { endpoint }, { body });
  
  return handleFetchWithValue<T>(request);
}

export async function sendDeleteRequest(
  endpoint: string,
  body?: any
): Promise<void> {
  let request =
    body === null || body === undefined
      ? new Request(endpoint, {
          method: "DELETE",
          headers: getAuthHeader(),
        })
      : new Request(endpoint, {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: getAuthHeader(body),
        });

  console.log("DELETE", { endpoint }, { body });

  return handleFetch(request);
}

export function sendLoadImageRequest(endpoint: string) {
  let request = new Request(endpoint, {
    method: "GET",
    headers: getAuthHeader(),
  });

  return fetch(request)
    .then((response) => {
      if(response.status === 200){
        return response.blob();
      }else {
        return undefined;
      }
    })
    .then((blob) => {
      if(blob !== undefined){
        return URL.createObjectURL(blob);
      }

      return "";
    });
}

export function sendDownloadImageRequest(endpoint: string, filename: string) {
  let request = new Request(endpoint, {
    method: "GET",
    headers: getAuthHeader(),
  });

  console.log("GET", { endpoint });
  fetch(request).then((response) => {
    response.blob().then((value) => {
      fileDownload(value, filename);
    });
  });
}

export async function sendDownloadZip(endpoint: string, filename: string) :  Promise<void>{
  let request = new Request(endpoint, {
        method: "GET",
        headers: getAuthHeader(),
        
      });
  fetch(request).then( (response) => {
    if (response.status==200){
      //ToDo : Not ideal condition.
      //error --> success dowload
      //no error --> any error
      var responseBlob =response.clone();
      response.text().then((text)=>{
        try{
          let result : Result<null>= JSON.parse(text);//Read response code status
          return handleResultDownload(result);
        }catch (error){
          //cant' parse to json, it's mean file can be downloaded
          responseBlob.blob().then((value) => {
            fileDownload(value, filename);
            
          })
          
        }    
      })
    }else{
      let error = response.text();
      const dispatch = getDispatch();
      dispatch(
        sendNotification(
          ENotificationType.Error,
          `Failed to download zip file "${filename}"\nReason: ${error}`
        ))
      return Promise.reject(new Error(`Failed to download zip file "${filename}"\nReason: ${error}`));
    }
  }).catch((error)=>{
    return Promise.reject(error.message);
  });
}
export async function handleResultDownload(result:Result<null>){
  const dispatch = getDispatch();
  switch (result.resultCode) {
    case EResultCode.Ok: {
      return Promise.resolve();      
    }
    case EResultCode.Warning: {
      dispatch(sendNotification(ENotificationType.Warning, result.description));
      return Promise.resolve();
    }
    case EResultCode.Fail:
    case EResultCode.Error: {
      const description = result.description
        ? result.description
        : "Unknown Error";
      dispatch(sendNotification(ENotificationType.Error, description));
      return Promise.resolve()
      //return Promise.reject(new Error(description));
    }
  }
  return Promise.reject(new Error("Unknown result code"));
}

export function sendDownloadTextRequest(endpoint: string, filename: string) {
  let request = new Request(endpoint, {
    method: "GET",
    headers: getAuthHeader(),
  });

  console.log("GET", { endpoint });
  fetch(request).then(async (response) => {
    //console.log("GET RESPONSE", { response });
    if (response.status === 200) {
      response
        .text()
        .then((value) => {
          //console.log("GET RESPONSE DATA", { value });
          fileDownload(value, filename);
        })
        .catch((e) => handleError(e));
    } else {
      let error = await response.text();
      const dispatch = getDispatch();
      dispatch(
        sendNotification(
          ENotificationType.Error,
          `Failed to download file "${filename}"\nReason: ${error}`
        )
      );
      // response.text().then( (e) => handleErrorString(e));
    }
  });
}

export function sendGetRequest<T>(endpoint: string): Promise<T> {
  let request = new Request(endpoint, {
    method: "GET",
    headers: getAuthHeader(),
  });
  console.log("GET", { endpoint });
  return handleFetchWithValue<T>(request);
}

export function concatParameter(arg: { [index: string]: any }) {
  let params:Array<string> = [];
  let keys = Object.keys(arg);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let value = arg[key];
    if (value) {
      params.push(key + "=" + value);
    }
  }
  if (params.length > 0) {
    return "?" + params.join("&");
  } else {
    return "";
  }
}

function handleFetchWithValue<T>(request: Request): Promise<T> {
  return fetch(request)
    .then<T>((response) => handleResponseWithValue<T>(response))
    .catch<T>((error) => {
      console.error(error.message);
      return Promise.reject(error.message);
    });
}

export async function handleResponseWithValue<T>(
  response: Response
): Promise<T> {
  const dispatch = getDispatch();
  console.log("RESPONSE", response);
  if (response.status === 200 || response.status === 400) {
    let test = await response.json();
    let result: Result<T> = test;
    return handleResultWithValue<T>(result);
  } else if (response.status === 401) {
    // dispatch(deleteUserCredential());
    window.location.href = "/login";
    return Promise.reject(new Error("User is not Authorized"));
  } else {
    const message = {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    };
    const messageStr = JSON.stringify(message, undefined, 2);
    dispatch(sendNotification(ENotificationType.Error, messageStr));
    return Promise.reject(new Error(messageStr));
  }
}

async function handleResultWithValue<T>(result: Result<T>): Promise<T> {
  const dispatch = getDispatch();
  console.log("OK RESPONSE", { result });

  switch (result.resultCode) {
    case EResultCode.Ok: {
      console.log("RESULT VALUE", result.value );
      if (result.value == null) {
        return Promise.reject<T>(new Error("result value is null"));
      }
      return Promise.resolve<T>(result.value);
    }
    case EResultCode.Warning: {
      if (result.value == null) {
        return Promise.reject<T>(new Error("result value is null"));
      }
      dispatch(sendNotification(ENotificationType.Warning, result.description));
      return Promise.resolve<T>(result.value);
    }
    case EResultCode.Fail:
    case EResultCode.Error: {
      const description = result.description
        ? result.description
        : "Unknown Error";
      dispatch(sendNotification(ENotificationType.Error, description));
      return Promise.reject<T>(new Error(description));
    }
  }
  return Promise.reject<T>(new Error("Unknown result code"));
}

