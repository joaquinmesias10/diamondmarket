const setItem = (key, json_data) => {
  localStorage.setItem(key, JSON.stringify(json_data));
} 

const getItem = (key) => {
  let str_data = localStorage.getItem(key);
  return JSON.parse(str_data);
} 

const removeItem = (key) => {
  localStorage.removeItem(key)
}
export default {setItem, getItem, removeItem}