import { useCallback, useEffect, useState } from "react";

// This is for sending the request
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  console.log("-- http erro 11->", resData)
  if(!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, Failed to send request!"
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData]  = useState(initialData);
  const [error, setError] = useState();

  // for setting state
  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, {...config, body: data});
      setData(resData);
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(()=>{
    if ((config && (config.method === "GET" || !config.method)) || !config)
    sendRequest();
  }, [sendRequest, config])

  return {
    data,
    error,
    isLoading,
    sendRequest
  }
}