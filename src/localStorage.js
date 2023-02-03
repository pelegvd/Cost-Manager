/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/
const LocalStorage = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },

    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export default LocalStorage;
