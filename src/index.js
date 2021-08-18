import debounsed from 'lodash.debounce';
// import jsonAPI from "./js/jsonAPI";
// import templateCard from "./templates/card.hbs";
import templateList from "./templates/list.hbs";

const inputCountry = document.querySelector("#js-input");
const countries = document.querySelector("#js-country");
let arrCountry = [];

const listCountryCreate = () => {
    const listCountry = document.createElement("ul");
    listCountry.id = "#js-list";
    countries.appendChild(listCountry);
    return listCountry;
}

const createList = (arr) => {listCountryCreate().insertAdjacentHTML("afterbegin", templateList(arr));}


const sendAPI = () => {
    // listCountryCreate().parentElement.remove(listCountryCreate());
    fetch(`https://restcountries.eu/rest/v2/name/${inputCountry.value}`)
    .then(data => { return data.json()})
    .then (arr => {arrCountry.push(...arr);
        if (arrCountry.length > 1 && arrCountry.length <= 10){
            createList(arrCountry);
        }
        else{
            console.log("more countries");
        }
    })
    .catch(error => console.log(error));
}

inputCountry.addEventListener("input", debounsed(sendAPI, 750));




