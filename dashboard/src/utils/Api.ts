import { string } from "prop-types";

interface Types {
  "crawler": string,
  "run_started_at": string,
  "run_url": string
}

export const getToken = () => {
  return localStorage.getItem("token") || null;
};



export const isLogin = () => {
  if (getToken() != null && getToken().length > 10) {
    return true;
  }
  return false;
};

//get header options
const no_auth_get_options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

//get header options
const get_options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Token ${getToken()}`,
  },
};

const no_auth_post_options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const fetchWithTimeout = (milliseconds, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout exceeded"));
    }, milliseconds);
    promise.then(resolve, reject);
  });
};



const api_server = "https://api.lobstr.io/v1"

const upload_server = "http://51.158.120.121:9050/api"


//log in user
export const loginUser = async (payload: { email: string, password: string }) => {
  no_auth_post_options["body"] = JSON.stringify(payload);
  try {
    const response = await fetchWithTimeout(
      10000,
      fetch(`${api_server}/login`, no_auth_post_options)
    );
    const json = await response.json();
    return { response: response, json: json };
  } catch {
    if (navigator.onLine) {
      return { error: "lobstr api in maintenance." };
    } else {
      return { error: "Connection refused. Please try again" };
    }
  }
};


export const getMetaData = async (run_id: string) => {
  const response = await fetch(
    `${api_server}/runs/${run_id}/metadata`, get_options
  );
  const json = await response.json();
  return { response: response, json: json };
}

export const getCrawlers = async () => {
  const response = await fetch(
    `${api_server}/clusters`, get_options
  );
  const json = await response.json();
  return { response: response, json: json };
};

export const getRuns = async (cluster_id: string) => {
  const response = await fetch(
    `${api_server}/runs?cluster=${cluster_id}`, get_options
  );
  const json = await response.json();
  return { response: response, json: json };
};

export const downloadRun = async (run_id: string) => {
  const response = await fetch(
    `${api_server}/v1/runs/${run_id}/download`,
    get_options
  );
  const json = await response.json();
  return { response: response, json: json };
};

export const getUploadRuns = async () => {
  const response = await fetch(
    `${upload_server}/upload/runs`, no_auth_get_options
  );
  const json = await response.json();
  return { response: response, json: json };
}

export const postForUpload = async (run_id: string, payload: Types) => {
  no_auth_post_options['body'] = JSON.stringify(payload)
  const response = await fetch(
    `${upload_server}/upload/${run_id}`, no_auth_post_options
  );
  const json = await response.json();
  return { response: response, json: json };
}



