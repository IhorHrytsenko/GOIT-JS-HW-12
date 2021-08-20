import debounsed from 'lodash.debounce';
// import jsonAPI from "./js/jsonAPI"; возможность переделать на класс
import templateCard from "./templates/card.hbs";
import templateList from "./templates/list.hbs";
import { alert, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

const inputCountry = document.querySelector("#js-input");
const countries = document.querySelector("#js-country");
let arrCountry = [];

const clearButton = document.querySelector("#js-clear");

const listCountryCreate = () => {
    const listCountry = document.createElement("ul");
    listCountry.id = "js-list";
    countries.appendChild(listCountry);
    return listCountry;
}

const createList = (arr) => {
    listCountryCreate().insertAdjacentHTML("afterbegin", templateList(arr));
};

const createCard = (elem) => {
    listCountryCreate().insertAdjacentHTML("afterbegin", templateCard(elem));
};

const sendAPI = () => {
    fetch(`https://restcountries.eu/rest/v2/name/${inputCountry.value}`)
    .then(data => { return data.json()})
    .then (arr => {
        arrCountry=[];
        if (document.querySelector("#js-list")){
            countries.removeChild(document.querySelector("#js-list"));
        }
        
        arrCountry.push(...arr);

        if (arrCountry.length === 1){
            createCard(arrCountry[0]);
        }
        if (arrCountry.length > 1 && arrCountry.length <= 10){
            createList(arrCountry);
        }
        if (arrCountry.length > 10){
            defaultModules.set(PNotifyMobile, {});
            alert({
                text: 'Too many matches found. Please enter a more specific query.'
            });
        }
    })
    .catch(error => console.log(error));
}

inputCountry.addEventListener("input", debounsed(sendAPI, 750));


