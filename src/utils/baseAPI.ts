const URL = "http://localhost:3333";

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