const URL = "https://api.infoci.secont.es.gov.br";

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