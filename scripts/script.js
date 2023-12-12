// weerbericht ophalen

const apiUrl = 'https://dtnl-frontend-internship-case.vercel.app/api/get-weather';
var gradenCelsius;

fetch(apiUrl)
.then(response => response.json())
.then(data => {
console.log(data)

// temp in farenheid ophalen en afdrukken in div 
const weatherContainer = document.getElementById('weather-container'); //div met weerbericht tekst
const tempContainer = document.getElementById('temp-container'); // div met alleen temp

// const gradenCelsius
var gradenOpgehaald = data.temperature.metric // fahrenheit of celscius?
console.log(`f of c? : ${gradenOpgehaald}`)


// indien opgehaalde temp Fahrenheit is dit omzetten in celsius. vervolgens getal afronden
// en in variabele opslaan
if (gradenOpgehaald === "FAHRENHEIT") {     
  var gradenFahrenheit = data.temperature.temp;
  gradenCelsius = (gradenFahrenheit - 32) * (5/9);  
  gradenCelsius= Math.round(gradenCelsius);
   
} 
else {
  gradenCelsius = data.temperature.temp;
  console.log(`graden celsius buiten statement = ${gradenCelsius}`);
  
}
tempContainer.innerHTML = `<h3 class="temperature"> ${gradenCelsius}°</h3>`; //temp afdrukken in juiste div




// door array lopen van soorten weer, alleen het weerbericht afbeelden dat klopt met de opgehaalde temp
for (var i = 0; i < data.weatherInfo.length; i++) {               
  var item = data.weatherInfo[i];
  console.log(item);

  if (( item.maxTemp === null || item.maxTemp >= gradenCelsius) && (item.minTemp === null || item.minTemp <= gradenCelsius)) {
   
    // placeholder {{celsius}} vervangen door juiste temp (gradenCelsius)
    var weatherTitleWithPlaceholder = data.weatherInfo[i].title
    console.log(`orginele titel ${weatherTitleWithPlaceholder}`)
    var weatherTitleWithGradenCelsius = weatherTitleWithPlaceholder.replace("{{ CELCIUS }}°C", `${gradenCelsius}°C`)
    console.log(`aangepaste titel ${weatherTitleWithGradenCelsius}`)
    
    // aangepaste weatherinfo afbeelden 
    weatherContainer.innerHTML += `<p class="temperature-title">${weatherTitleWithGradenCelsius}</p>`;
    weatherContainer.innerHTML += `<p class="temperature-description">${data.weatherInfo[i].description}</p>`;
   
  }
}


})
.catch(error => {
console.error('Fout bij het ophalen van gegevens:', error);
});



// activiteiten ophalen

const apiUrl2 = 'https://dtnl-frontend-internship-case.vercel.app/api/get-activities'

fetch(apiUrl2)
.then(response => response.json())
.then(data2 => {
console.log(data2)

const activitiesContainer = document.getElementById('activities-container');
const noActivitiesContainer = document.getElementById('no-activities-container');

for (var b = 0; b < data2.activities.length; b++) {               
var activitieItem = data2.activities[b];
console.log(`activiteiten overzicht: ${data2.activities[b].imageUrl}`);


if ((activitieItem.maxTemp === null ||  activitieItem.maxTemp >= gradenCelsius) && ( activitieItem.minTemp === null || activitieItem.minTemp <= gradenCelsius)) {
  
  activitiesContainer.innerHTML += 
  `<div class="pictures">
    <div class="image-div"><img id="act-picture" class="activities-picture" src="${data2.activities[b].imageUrl}" alt="photo of the activity" onerror="this.src='https://static.thenounproject.com/png/504708-200.png';"></div>
    <div class="activity-div"><p class="activity">${data2.activities[b].title}</p><p class="activities-description">${data2.activities[b].description}</p></div>
  </div>`;
 
} else {
  noActivitiesContainer.innerHTML += 
  `<div class="pictures">
    <div class="image-div"><img id="act-picture" class="activities-picture" src="${data2.activities[b].imageUrl}" alt="photo of the activity" onerror="this.src='https://static.thenounproject.com/png/504708-200.png';"></div>
    <div class="activity-div"><p class="activity">${data2.activities[b].title}</p><p class="activities-description">${data2.activities[b].description}</p></div>
  </div>`;

  }
}

})
.catch(error => {
console.error('Fout bij het ophalen van gegevens2:', error);
});