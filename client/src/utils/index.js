import "whatwg-fetch";
import { jwtConfig } from "../config";
import upload from "superagent";

var token = localStorage.getItem("jwt") || "";
var user = localStorage.getItem("wiwaHub") || "{}";

export const callApi = (url, data, method) => {
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || "GET",
      mode: "cors",
      redirect: "follow",
      compress: true,
      credentials: "include",
      headers: { Authorization: "Bearer " + token, user }
    };
    if (method === "POST") {
      options.body = JSON.stringify(data);
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

export const imageUpload = (url, data, method) => {
  let photo = data;
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      credentials: "include"
    };
    if (method === "POST") {
      options.body = photo;
    }
    fetch(`${jwtConfig.fetchUrl}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const picUpload = async (file, folder) => {
  let photo = new FormData();
  photo.append("file", file);
  return new Promise(async (resolve, reject) => {
    let imageUrl = await imageUpload("/uploadFile", photo, "POST");
    if (imageUrl.file.hasOwnProperty("url")) {
      resolve({ url: imageUrl.file.url, fileName: imageUrl.file.original_filename });
    } else {
      reject(new Error("Unable to resolve url"));
    }
  });
};
