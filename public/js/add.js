const storeForm = document.getElementById("store-form");
const idType = document.getElementById("id-type");
const idNumber = document.getElementById("id-number");
const dimensions = document.getElementById("dimensions");
const lon1 = document.getElementById("Longitude-1");
const lat1 = document.getElementById("Latitude-1");
const lon2 = document.getElementById("Longitude-2");
const lat2 = document.getElementById("Latitude-2");
const lon3 = document.getElementById("Longitude-3");
const lat3 = document.getElementById("Latitude-3");
const lon4 = document.getElementById("Longitude-4");
const lat4 = document.getElementById("Latitude-4");
const lon5 = document.getElementById("Longitude-5");
const lat5 = document.getElementById("Latitude-5");

const checkpointsform = document.getElementById("checkpoints-form");
const CheckLongitude = document.getElementById("CheckLongitude-1");
const CheckLatitude = document.getElementById("CheckLatitude-1");

const userlandsform = document.getElementById("userlands-form");
const IDTYPE = document.getElementById("IDTYPE");
const IDNUMBER = document.getElementById("IDNUMBER");

const estateform = document.getElementById("estate-form");
const companyName = document.getElementById("CompanyName");
const followers = document.getElementById("Followers");
const image = document.getElementById("image");
const location1 = document.getElementById("Location-1");
const price2 = document.getElementById("Price-2");
const location2 = document.getElementById("Location-2");

const estateformInfo = document.getElementById("estateInfo-form");

const addFollowerForn = document.getElementById("addFollower-form");
const compName = document.getElementById("Compname");

let formData = new FormData();

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  // if (idType.value === '' || idNumber.value === '') {
  //   alert('Please fill in fields');
  // }

  const sendBody =
    // idType: idType.value,
    // idNumber: idNumber.value,
    // dimensions: dimensions.value,
    // location: {
    //     type: "Polygon",
    [
      [-2.986321568878143, 10.84846235073391],
      [-2.9003192190246274, 5.132132362026809],
      [1.7738484140320132, 5.429725924050852],
      [0.08744704684451321, 11.107140547306297],
      [-2.986321568878143, 10.84846235073391],
    ];
  // [
  //   [parseFloat(lon1.value), parseFloat(lat1.value)],
  //   [parseFloat(lon2.value), parseFloat(lat2.value)],
  //   [parseFloat(lon3.value), parseFloat(lat3.value)],
  //   [parseFloat(lon4.value), parseFloat(lat4.value)],
  //   [parseFloat(lon5.value), parseFloat(lat5.value)],
  // ];
  // }
  // const sendBody = {
  //   _id: lon1.value,
  //   userOne: true,
  //   // notificationToken: lat1.value,
  //   // userOneMessage: lon2.value,
  //   // userTwoMessage: lat2.value
  // }
  // const sendBody = {
  //   // _id: lon1.value,
  //   userEmail: 'zenutema@gmail.com',
  //   // notificationToken: lat1.value,
  //   // userOneMessage: lon2.value,
  //   // userTwoMessage: lat2.value
  // }

  try {
    const res = await fetch("/houseswithinboundary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }
    const ponse = await res.json();
    console.log(ponse);
    // alert('Store added!');
    // window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

async function checkcoords(e) {
  e.preventDefault();

  const sendCheckBody = {
    longitude: CheckLongitude.value,
    latitude: CheckLatitude.value,
  };

  try {
    const res = await fetch("/checkpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendCheckBody),
    });
    const promise = await res.json();
    alert(promise);
    console.log(promise);
    // window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

async function userlands(e) {
  e.preventDefault();

  const sendCheckBody = {
    idType: IDTYPE.value,
    idNumber: IDNUMBER.value,
  };

  try {
    const res = await fetch("/userlands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendCheckBody),
    });
    const promise2 = await res.json();
    alert(promise2);
    console.log(promise2);
    // window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

// Send POST to API to add company
async function addCompany(e) {
  e.preventDefault();

  console.log(image.value);
  const followNum = followers.value;
  // formData.append({
  //     nameOfCompany: companyName.value,
  //     numberOfFollowers: followers.value,
  //     // houses: [{price: price1.value, location: location1.value, houseCoordinates: {type: "Point", coordinates:[-0.17578097424708533, 9.228515625]}}, {price: price2.value, location: location2.value, houseCoordinates: {type: "Point", coordinates: [2.0022938400506973, 1.9999998807907104]}}],
  //     companyImageUrl: image.value
  //   });

  formData.append("nameOfCompany", companyName.value);
  formData.append("numberOfFollowers", followers.value);
  formData.append("companyImageUrl", {
    uri: image.value,
    name: "image.jpg",
    type: "image/jpeg",
  });

  try {
    const res = await fetch("/addcompanyinfo", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // body: JSON.stringify(sendBody)
      body: formData,
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }

    alert("Store added!");
  } catch (err) {
    alert(err);
    return;
  }
}

async function getEstateInfo(e) {
  e.preventDefault();

  const sendCheckBody = {
    nameOfCompany: infoCompanyName.value,
  };

  try {
    const res = await fetch("/companyinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendCheckBody),
    });
    const promise2 = await res.json();
    alert(promise2);
    console.log(promise2);
    // window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

async function addFollower(e) {
  e.preventDefault();

  const data = {
    // nameOfCompany: compName.value,
    house_id: "20j82",
  };

  try {
    const res = await fetch("/findhouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const promise2 = await res.json();
    alert(promise2);
    console.log(promise2);
    // window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
checkpointsform.addEventListener("submit", checkcoords);
userlandsform.addEventListener("submit", userlands);
// estateform.addEventListener('submit', addCompany);
estateformInfo.addEventListener("submit", getEstateInfo);
addFollowerForn.addEventListener("submit", addFollower);
