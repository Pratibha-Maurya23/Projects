// const url = "https://cat-fact.herokuapp.com/facts";
// const factPara = document.querySelector("#fact");
// const btn = document.querySelector("#btn");
 


//  const getFacts = async () => {
//     console.log("getting data ........");
//     let response =await fetch(url);
//     console.log(response);//JSON format
//     let data = await response.json();
//    factPara.innerText = data[4].text;
//  };


// function getFacts(){
//     fetch(url)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         // console.log(data);
//         factPara.innerText = data[4].text;
//     });
// }

//  btn.addEventListener("click", getFacts);



//Currency converter
const base_URL = "https://api.currencyapi.com/v3/latest?apikey=API+KEY+HERE&base_currency=";

const dropdowns = document.querySelectorAll(".dropdown select");
const  btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
    

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD" ){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR" ){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
  const url = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  
 let finalAmount =  amtVal * rate;
 msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
};


const updateFlag = (element) => {
    let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
};


btn.addEventListener("click", async (evt) =>{
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
 
