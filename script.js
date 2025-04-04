let countries;

function renderAllCountries(){
    fetch("https://restcountries.com/v3.1/all")
    .then( res=> res.json())
    .then( param_countries =>{
        countries = param_countries
        countries.forEach(renderCountryCard)
    })
    .catch(err => {
        console.log("unable to fetch countries, Error is:",err)
        document.querySelector(".countries-container").innerHTML = "<p><b>Unable to fetch data. Check your internet connection or restcountries.com took too long to respond</b></p>";
    } )
}
renderAllCountries();
const countriesContainer = document.querySelector(".countries-container")

function renderCountryCard(country){
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    // console.log(country.name);
    countryCard.href= `./Country.html?name=${country.name.common}`
    countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>`
    countriesContainer.append(countryCard);
}

// ......THIS IS TOO MUCH OF CODE! WE CAN MAKE IT BETTER BY THE ABOVE WAY!
// const countriesContainer = document.querySelector(".countries-container")
// console.log(countriesContainer);
// const countryCard = document.createElement("a");
// countryCard.classList.add("country-card");

// const cardImage = document.createElement("img");
// cardImage.src = "https://flagcdn.com/de.svg"

// countryCard.append(cardImage);

// console.log(countryCard);
// countriesContainer.append(countryCard)


//filter implementation
const filterByRegion = document.querySelector(".filter-by-region");
filterByRegion.addEventListener("change" , (e) =>{
    // console.log(e.target.value);
    // console.dir(filterByRegion.value);
    if(filterByRegion.value == 'all'){
        renderAllCountries();
    }
    countriesContainer.innerHTML = ""
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then(res => res.json())
    .then(countries => countries.forEach(renderCountryCard))
})

//searching implementation: method 1
const inputField = document.querySelector("#input");
// inputField.addEventListener("input", (e)=>{
//     // console.log('input event fired....');
//     let val = inputField.value;
//     let URL = `https://restcountries.com/v3.1/name/${val}`;
//     if(val == "")
//         URL = `https://restcountries.com/v3.1/all`;

//     fetch(URL)
//     .then( res=> res.json())
//     .then(countries => {
//         // console.log("countries: ",countries);
//         // console.log("val: ",val=='');
        
//         countriesContainer.innerText = "";
//         countries.forEach(renderCountryCard);
//     })
//     .catch(err => {
//         if(err instanceof TypeError){
//             countriesContainer.innerHTML = `<p id="no-country-found"><b>(No country found!)</b></p>`;
//         }
//     })
// })


//searching implementation: method 2

inputField.addEventListener("input", ()=>{
    // console.log('input event fired....');
    let resultingCountries = countries.filter( country => country.name.common.toLowerCase().includes(inputField.value.toLowerCase()));
    countriesContainer.innerText = ""
    if(resultingCountries.length == 0){
        countriesContainer.innerHTML = `<p id="no-country-found"><b>(No such country found!)</b></p>`;
        console.log('jhvhbghjbghjbhj');
    }
    resultingCountries.forEach(renderCountryCard);
})


//theme toggle

const themeToggle = document.querySelector(".header-content p")
themeToggle.addEventListener("click",() =>{
        document.body.classList.toggle("dark");
        themeMode = themeMode=="dark" ? "light" : "dark";
        if(themeMode == "dark")
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; Light Mode`
        else
            themeToggle.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode`
            
        localStorage.setItem("theme", themeMode);
})
// console.log(localStorage.getItem("theme"));
let themeMode ;
if(! localStorage.getItem("theme")){
    themeMode = "light";
    localStorage.setItem("theme", themeMode);
}else
    themeMode = localStorage.getItem("theme")
// debugger; ⭐⭐⭐⭐⭐ // first know to yourself what & how you are doing, what is your line
if(themeMode == "dark"){
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; Light Mode`
}


