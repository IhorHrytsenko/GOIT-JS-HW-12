import debounsed from 'lodash.debounce';
// import jsonAPI from "./js/jsonAPI";
// import templateCard from "./templates/card.hbs";
import templateList from "./templates/list.hbs";

const inputCountry = document.querySelector("#js-input");
let arrCountry = [];
const listCountry = document.querySelector("#js-list");

const clear = () =>{
    arrCountry = [];
    listCountry.remove;
}

const sendAPI = () => {
    const country = fetch(`https://restcountries.eu/rest/v2/name/${inputCountry.value}`)
    .then(data => { return data.json()})
    .then (arr => {arrCountry.push(...arr);
        if (arrCountry.length <= 10){
            createList(arrCountry);
        }
        else{
            console.log("more countries");
        }
        clear(arrCountry);
    })
    .catch(error => console.log(error));
}

const createList = (arr) => {listCountry.insertAdjacentHTML("beforebegin", templateList(arr));}

inputCountry.addEventListener("input", debounsed(sendAPI, 500));




