document.getElementById("spinner").style.display = "none";
// Start
const buttonInput = () => {
  const searchInput = document.getElementById("search-input");
  const searchInputText = searchInput.value;
  searchInput.value = "";
  let str = searchInputText;
  let stringRep = str.replace("+", "%2B");
  document.getElementById("spinner").style.display = "block";
  // error handle
  if (searchInputText == "") {
    const url = `http://smartbloodapi.somee.com/donors`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => androidPhone(data));
  }
  // Phone Search url
  else {
    const url = `http://smartbloodapi.somee.com/donors?BloodGroup=${stringRep}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => androidPhone(data));
  }
};
// Phone Search data
const androidPhone = (phones) => {
  const phoneInfo = document.getElementById("phone-info");
  phoneInfo.textContent = "";
  const phoneDetail = document.getElementById("phone-detail");
  phoneDetail.textContent = "";
  // error handle
  if (phones.length == 0) {
    document.getElementById("no-phone").style.display = "block";
  } else {
    debugger;
    let i = 0;
    phones?.forEach((phone) => {
      console.log(phone);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `    
         <div class="card">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p class="card-text">${phone.phoneNumber}</p>                
                <p class="card-text">${phone.bloodGroup}</p>
                <p class="card-text">${phone.fullAddress}</p>
            </div>
        </div>
        `;
      // Do not show if data is out of 20
      if (i < 20) {
        phoneInfo.appendChild(div);
      }
      i++;
    });
    document.getElementById("no-phone").style.display = "none";
  }
  document.getElementById("spinner").style.display = "none";
};
// Phone detail url
const showPhoneDetails = (info) => {
  const url = `https://openapi.programming-hero.com/api/phone/${info}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => specificPhoneDetail(data));
};

const specificPhoneDetail = (photo) => {
  // console.log(photo);
  const phoneDetail = document.getElementById("phone-detail");
  phoneDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="row row-col-1 row-col-md-2>
    <div class="card">
      <img src="${photo.data.image}" class="" alt="...">
    </div>
      <div class="card-body">
        <h5 class="card-title">Model: ${photo.data.name}</h5>
        <p class="card-text">Brand: ${photo.data.brand}</p >
        <p class="card-text">Chipset: ${photo.data.mainFeatures.chipSet}</p >
        <p class="card-text">Storage: ${photo.data.mainFeatures.storage}</p >
        <p class="card-text">ReleaseDate: ${
          photo.data.releaseDate
            ? photo.data.releaseDate
            : "No Release Date Found &#10006;"
        }</p >
        <p id='sensor-show' class="card-text">Sensors: </p >
        <h5>Others:</h5>
        <p class="card-text">Bluetooth: ${
          photo.data.others.Bluetooth
            ? photo.data.others.Bluetooth
            : "Not found &#10006;"
        }</p >
        <p class="card-text">USB: ${photo.data.others.USB}</p >
        <p class="card-text">WLAN: ${photo.data.others.WLAN}</p >
      </div >
      </div>
  `;
  phoneDetail.appendChild(div);
  // sensor show dynamic part
  photo.data.mainFeatures.sensors.forEach((sensor) => {
    const sensorShow = document.getElementById("sensor-show");
    const li = document.createElement("li");
    li.innerText = sensor;
    sensorShow.appendChild(li);
  });
};
