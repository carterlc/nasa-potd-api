// this the date that can be adjusted by adding 24 hours or removing 24 hours 

let setDate = new Date()

// this can be used in a function to change the date as needed by adding 24 hours or removing 24 hours 
// setDate.setHours(-24).toString()

let todaysDate = setDate.toISOString().substring(0, 10)

const apiKey = 'EflI7eLWE1kQAcej1ytPC34pDGbXr1J4McwieXEM'
let nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;

function imgChange(info) {
    document.getElementById('bgImgChange').style.backgroundImage = `url(${info.url})`
}


titleHTML = async (info) => {
    let htmlOut = document.getElementById("space-day-title")
    htmlOut.innerHTML = `${info.title}`
};

imgDetailsHTML = async (info) => {
    let htmlOut = document.getElementById("img-details")
    htmlOut.innerHTML = `${info.explanation}`
    
};

dateHTML = async (info) =>{
    let htmlOut = document.getElementById("photo-taken")
    htmlOut.innerHTML = `${info.date}`
    
}

creditHTML = async (info) =>{
    let htmlOut = document.getElementById("img-credits")
    htmlOut.innerHTML = `<strong>Image Credits:</strong> ${info.copyright}</p>`
    
}

function runHTML(info) {

   imgDetailsHTML(info)
    titleHTML(info)
    imgChange(info)
    dateHTML(info)
    creditHTML(info)
    console.log(info)}

}



const space = async (url) => {
    await fetch(url)
        .then(  async response => await response.json())
        .then(data => {
            if(data.title == undefined ){
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



space(nasaApi);

function backwards() {
    setDate.setHours(-24).toString();
    todaysDate = setDate.toISOString().substring(0, 10);
    console.log(todaysDate)
    nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;
    space(nasaApi);
};

function forward() {
    setDate.setHours(24).toString();
    todaysDate = setDate.toISOString().substring(0, 10);
    console.log(todaysDate)
    nasaApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${todaysDate}&concept_tags=True&hd=True`;
    space(nasaApi);
};

// interactive 

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