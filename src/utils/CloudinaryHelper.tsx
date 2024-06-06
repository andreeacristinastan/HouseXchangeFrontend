import React from "react";
const baseUrl = `https://api.cloudinary.com/v1_1/depdeolt0`;

type MakeUploadFnParams = {
  file: string;
  fieldName: string;
  progressCallback: (arg1: boolean, arg2: number, arg3: number) => void;
  successCallback: (arg1: undefined) => void;
  errorCallback: (arg1: string) => void;
  addImages: (image: string) => void;
  setTokens: (value: (prevState: string[]) => string[]) => void;
};

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback,
  addImages,
  setTokens,
}: MakeUploadFnParams) => {
  const url = `${baseUrl}/image/upload`;

  const formData = new FormData();
  formData.append(fieldName, file);
  formData.append("upload_preset", "y9gqbvk9");

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const { delete_token: deleteToken } = JSON.parse(request.response);
      const { url } = JSON.parse(request.response);
      setTokens((prevTokenVector) => [...prevTokenVector, deleteToken]);
      addImages(url);
      console.log(request.response);

      successCallback(deleteToken);
    } else {
      errorCallback(request.responseText);
    }
  };

  request.send(formData);

  return () => {
    request.abort();
  };
};

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback,
}) => {
  const url = `${baseUrl}/delete_by_token`;

  const request = new XMLHttpRequest();
  request.open("POST", url);

  request.setRequestHeader("Content-Type", "application/json");

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      successCallback();
    } else {
      errorCallback(request.responseText);
    }
  };
  request.send(JSON.stringify({ token }));
};

export const getImage = (publicId: string) => {
  const url = `${baseUrl}/image/upload/${publicId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      document.body.appendChild(img);
    })
    .catch((e) => {
      console.error("Error:", e);
    });
};
