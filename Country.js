let conuntryName = new URLSearchParams(window.location.search).get("name")

fetch(`https://restcountries.com/v3.1/name/${conuntryName}?fullText=true`)
.then( res => res.json())
.then(([countryObj]) =>{    ///use destructuring here instead of doing process in next two lines
    // .then(countryData =>{
    // const countryObj = countryData[0];
    console.log(countryObj.name.official);
    const countryDetail = document.querySelector("#country-detail");
    // debugger;
    //determining NativeName
    let nativeName;
    if(countryObj.name.nativeName)
        nativeName = Object.values(countryObj.name.nativeName)[0].common;

    countryDetail.innerHTML = `<img src=${countryObj.flags.png} alt="flag" id="flag">
                <div class="detail-text-container">
                    <h2>${countryObj.name.common}</h2>
                    <div class="detail-text">
                        <p><b>Native Name: </b>${nativeName ? nativeName : countryObj.name.common}</p>
                        <p><b>Population: </b>${countryObj.population.toLocaleString("en-IN")}</p>
                        <p><b>Region: </b>${countryObj.region}</p>
                        <p><b>Sub Region: </b>${countryObj.subregion ? countryObj.subregion : "(No Subregion)"}</p>
                        <p><b>Capital: </b>${countryObj.capital ? countryObj.capital.join(", ") : "(No Capital)"}</p>
                        <p><b>Top Level Domain: </b>${countryObj.tld.join(", ")}</p>
                        <p><b>Currencies: </b>${countryObj.currencies ? (Object.values(countryObj.currencies).map(({name})=> name) ).join(", ") : "(No Currency)" }</p>
                        <p><b>Languages: </b>${Object.values(countryObj.languages).join(", ")}</p>
                    </div>
                    <p id="border-countries"><b>Border Countries: &nbsp;</b></p>
                </div>`
{/* <p><b>Currencies: </b>${Object.keys(countryObj.currencies).map(cur => countryObj.currencies[cur].name).join(", ")}</p> */}

    
    const borderCountries = document.querySelector("#border-countries");
    if(countryObj.borders)
        countryObj.borders.forEach( borderCountryCode => {
            fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`)
            .then(res => res.json())
            .then(borderCountryObj =>{
                const anchor = document.createElement("a");

                // console.log(borderCountryObj);

                anchor.href = `./Country.html?name=${borderCountryObj[0].name.common}`;
                anchor.innerText = borderCountryObj[0].name.common;
                borderCountries.append(anchor);
            })
            
        });
    else{
        borderCountries.innerHTML= "<b>Border Countries: &nbsp;</b>(No Border Country)"
    }
    
})
.catch(err => console.error("ERRROR OCCURED:\n",err))

const backBtn = document.querySelector("#backBtn");
console.dir(backBtn);
backBtn.addEventListener("click", ()=>{
    history.go(-1);
});

//toggle theme
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

let themeMode= "light"
if(localStorage.getItem("theme") == "dark"){
    themeMode = "dark"
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; Light Mode`
}
