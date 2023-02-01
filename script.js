// this the date that can be adjusted by adding 24 hours or removing 24 hours 

let setDate = new Date()

// this can be used in a function to change the date as needed by adding 24 hours or removing 24 hours 
// setDate.setHours(-24).toString()

let todaysDate = setDate.toISOString().substring(0, 10)

const apiKey = 'EflI7eLWE1kQAcej1ytPC34pDGbXr1J4McwieXEM'
let nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;


titleHTML = async (info) => {
    let htmlOut = document.getElementById("space-day-title")
    htmlOut.innerHTML = `${info.title}`
    console.log(info)
};

imgDetailsHTML = async (info) => {
    let htmlOut = document.getElementById("img-details")
    htmlOut.innerHTML = `${info.explanation}`
    console.log(info)
};
function runHTML(info){
imgDetailsHTML(info)
titleHTML(info)
}


const space = async (url) => {
    await fetch(url)
        .then(async response => await response.json())
        .then( data => runHTML(data))
        .catch(error => console.error('Error:', error))
};


space(nasaApi);