import "whatwg-fetch";
import { jwtConfig } from "../config";
import upload from "superagent";


export const callApi = (url, data, method) => {
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || "GET",
      mode: "cors",
      redirect: "follow",
      compress: true,
      credentials: "include",
    };
    if (method === "POST") {
      options.body = JSON.stringify(data);
      options.headers = {}
      options.headers.Accept = "application/json";
      options.headers["Content-Type"] = "application/json";
    }
    fetch(`${jwtConfig.fetchUrl}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        reject(err);
      });
  });
};

export const callApiWithFormData = (url, data, method, file) => {
  let photo = new FormData();
  photo.append("file", file);
  photo.append('data', JSON.stringify(data))
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || "GET",
      mode: "cors",
      redirect: "follow",
      credentials: "include",
    };
    if (method === "POST") {
      options.body = photo;
      options.headers = {}
      options.headers.Accept = "application/json";
    }
    fetch(`${jwtConfig.fetchUrl}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        reject(err);
      });
  });
};