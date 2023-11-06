const URL = "http://localhost:8080";

const HEADERS = (token:string | null) => {
  return {
    "Authorization": `Bearer ${token}`
  }
};

const baseAPI = {
  URL,
  HEADERS
}

export default baseAPI;