import axios from "axios";
const baseUrl = "/api/people";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response);
};

const updatePerson = (personId, newPerson) => {
  const request = axios.put(`${baseUrl}/${personId}`, newPerson);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, updatePerson };
