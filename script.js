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
      .then((data) => donorList(data));
  }
  // Donor Search url
  else {
    const url = `http://smartbloodapi.somee.com/donors?BloodGroup=${stringRep}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => donorList(data));
  }
};
// Donor Search data
const donorList = (donor) => {
  const donorInfo = document.getElementById("donor-info");
  donorInfo.textContent = "";
  const donorDetail = document.getElementById("donor-detail");
  donorDetail.textContent = "";
  // error handle
  if (donor.length == 0) {
    document.getElementById("no-donor").style.display = "block";
  } else {
    debugger;
    let i = 0;
    donor?.forEach((donor) => {
      console.log(donor);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `    
         <div class="card">
            <div class="card-body">
                <h5 class="card-title">${donor.name}</h5>
                <p class="card-text">${donor.phoneNumber}</p>                
                <p class="card-text">${donor.bloodGroup}</p>
                <p class="card-text">${donor.fullAddress}</p>
            </div>
        </div>
        `;
      // Do not show if data is out of 20
      if (i < 20) {
        donorInfo.appendChild(div);
      }
      i++;
    });
    document.getElementById("no-donor").style.display = "none";
  }
  document.getElementById("spinner").style.display = "none";
};
