// this the date that can be adjusted by adding 24 hours or removing 24 hours 

let setDate = new Date()

let currentDate = new Date()
// this can be used in a function to change the date as needed by adding 24 hours or removing 24 hours 
// setDate.setHours(-24).toString()

let todaysDate = setDate.toISOString().substring(0, 10)

let shortenedDate = currentDate.toISOString().substring(0, 10)

console.log(todaysDate);

// this is for the NASA API 
const apiKey = 'EflI7eLWE1kQAcej1ytPC34pDGbXr1J4McwieXEM'
let nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;

// this is to change the background image of the page 
function imgChange(info) {
    document.getElementById('bgImgChange').style.backgroundImage = `url("${info.url}")`
}

// this is to change the title of the page 
titleHTML = async (info) => {
    let htmlOut = document.getElementById("space-day-title")
    htmlOut.innerHTML = `<a href="${info.hdurl}" target="_blank">${info.title}</a>`
};

// this is to change the explanation 
imgDetailsHTML = async (info) => {
    let htmlOut = document.getElementById("img-details")
    htmlOut.innerHTML = `${info.explanation}`
    
};

// this is to change the date in the page
dateHTML = async (info) =>{
    let htmlOut = document.getElementById("photo-taken")
    htmlOut.innerHTML = `${info.date}`
    
}

// this is to change the credit of the image 
creditHTML = async (info) =>{
    let htmlOut = document.getElementById("img-credits")
    htmlOut.innerHTML = `<strong>Image Credits:</strong> ${info.copyright}</p>`
    
}

// this jsut takes all the function and runs all of them 
function runHTML(info) {

   imgDetailsHTML(info)
    titleHTML(info)
    imgChange(info)
    dateHTML(info)
    creditHTML(info)
    console.log(info)

}


// this to fetch the json data from the nasa api and change the html at the same time, this also checks if the next page is undefined and sets the day back 24 hours after clicking forward
const space = async (url) => {
    await fetch(url)
        .then(  async response => await response.json())
        .then(data => {
            if(data.url == undefined ){
                setDate.setHours(-24).toString();
                todaysDate = setDate.toISOString().substring(0, 10);
                console.log(todaysDate)
                nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;
            }
            else
               { runHTML(data)
           }
        })
           
        // .then( data => runHTML(data))
        .catch(error => console.error('Error:', error))
};

// running the function above to change the page to today's data 
space(nasaApi);

// async await funcion for the numbers fact API
const numbersAPI = async (url) => {
    await fetch(url)
        .then(  async response => await response.json())
        .then(data => {
            let htmlOut = document.getElementById("fact-details")
            htmlOut.innerHTML = data.text;
            //writes to the screen the date
        })
           
        // .then( data => runHTML(data))
        .catch(error => console.error('Error:', error))
};
//converts from the standard date format to the date format the API link path needs in order to work
function convertDate(inputDate) {
    newFormat = inputDate.replace(/-/g, "/");
    withOutYear = newFormat.slice(4);
    return withOutYear;
}

//calling the API
numbersAPI(`http://numbersapi.com${convertDate(todaysDate)}/date?json`);

//Go backwards a day
function backwards() {
    setDate.setHours(-24).toString();
    todaysDate = setDate.toISOString().substring(0, 10);
    console.log(todaysDate)
    nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;
    space(nasaApi);
    numbersAPI(`http://numbersapi.com${convertDate(todaysDate)}/date?json`);
};

//Go forwards a day
function forward() {
    setDate.setHours(24).toString();
    todaysDate = setDate.toISOString().substring(0, 10);
    console.log('yes')
    console.log(todaysDate)
    nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;
    space(nasaApi);
    //if statement if the todaysDate variable is larger than the shortenedDate variable (AKA the date that we live in now) than the hours go back 24hours
    if(todaysDate > shortenedDate){
        setDate.setHours(-24).toString();
        todaysDate = setDate.toISOString().substring(0, 10);
        //replays the current day fact without going forward
    }
    numbersAPI(`http://numbersapi.com${convertDate(todaysDate)}/date?json`);
};

// interactive 
// this is to check if there is  a swipe and change the page forward or backwards 
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            forward()
        } else {
            backwards()
            /* left swipe */
        }                       
    } 
    xDown = null;
    yDown = null;                                             
};