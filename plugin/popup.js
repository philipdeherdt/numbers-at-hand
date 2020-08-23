document.addEventListener('DOMContentLoaded', function() {
  var uuidBtn = document.getElementById('btn-uuid');
  uuidBtn.addEventListener('click', function() { getRandomUuid(); }, false);
	
  var rrnBtn = document.getElementById('btn-rrn');
  rrnBtn.addEventListener('click', function() { getRandomRrnNumber(); }, false);
	
  var companyBtn = document.getElementById('btn-companynbr');
  companyBtn.addEventListener('click', function() { getRandomCompanyNumber(); }, false);
	
  var rszBtn = document.getElementById('btn-rsznbr');
  rszBtn.addEventListener('click', function() { getRandomRszNumber(); }, false);
	
}, false);

//https://www.uuidgenerator.net/
function getRandomUuid() {
	uuid = "00000000-0000-0000-0000-000000000000"
	copy(uuid);
	setStatus(uuid);
}
//RSZ-nummer https://nl.wikipedia.org/wiki/RSZ-nummer
function getRandomRszNumber() {
	base = randomIntFromInterval(1000,1999999); 
	control = 96- (100*base)%97;
	rsznbr = ''.concat( 100 * base + control).padStart(9, "0");
  
	copy(rsznbr);
	setStatus(rsznbr);
}

//Ondernemingsnummer https://nl.wikipedia.org/wiki/Kruispuntbank_van_Ondernemingen
function getRandomCompanyNumber() {
	base = randomIntFromInterval(2000000,19999999); 
	control = 97 - base % 97;
	companynbr = ''.concat( 100 * base + control).padStart(10, "0");
  
	copy( companynbr);
	setStatus(companynbr);
}

//Rijksregisternummer https://nl.wikipedia.org/wiki/Rijksregisternummer
function getRandomRrnNumber() {
	year = randomIntFromInterval(1920,2019);
	month = randomIntFromInterval(1,12);
	day = randomIntFromInterval(1,28);
	counter = randomIntFromInterval(1,999);

	base = ((year%100)*10000000) + (month*100000) + (day*1000) + (counter);
	checksum = year>=2000 ? (97 - (base+2000000000) % 97) : (97 - base % 97);
	rrn = ''.concat( 100 * base + checksum).padStart(11, "0");
  
	copy(rrn);
	setStatus(rrn);
}

//IBAN https://nl.wikipedia.org/wiki/International_Bank_Account_Number
//Telefoonnummer https://nl.wikipedia.org/wiki/Telefoonnummer
//Kentekenplaat https://nl.wikipedia.org/wiki/Kentekenplaat
//https://en.wikipedia.org/wiki/Vehicle_identification_number


function setStatus(text) {
    document.getElementById('status').innerHTML = text;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function copy(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}