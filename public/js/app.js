var activeBuilding
var activeOffice
var buildingManifest

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

function findBuilding(building, target) {
  return building == target;
}

function stripID(id){
  return id.substring(id.indexOf("_") + 1)
}

function furnishOffice(floor, data, classes = "has-text-light") {
  floor.innerHTML += `<div class="ctx-domain-channel-text ${classes} noselect" id="${data.id}"><div class="ctx-domain-channel-text-title" id="title_${data.id}"><i class="fa fa-hashtag" aria-hidden="true"></i> ${data.name}</div></div>`
}

function constructFloor(parent, data) {
  parent.innerHTML += `
          <div class="ctx-domain-channel-group ${data.classes}" id="${data.id}">
            <div class="ctx-dcg-title-wrapper   noselect" onclick="toggleDCG('${data.id}')">
              <div class="ctx-dcg-min-max" id="dcg-minmax_${data.id}">-</div>
              <div class="ctx-dcg-title">
              ${data.name}
              </div>
            </div>
            <div class="ctx-dcg-child-wrapper" id="dcg-wrapper_${data.id}">
            </div>
            
          </div>
          `

  var sorted = data.offices.sort(sortByProperty('position'))
  var newparent = document.getElementById(`dcg-wrapper_${data.id}`)
  for (var office in sorted) {
    if (sorted[office].type == "channel-text") {
      furnishOffice(newparent, sorted[office], data.childClasses)
    }
    if (sorted[office].type == "group") {
      constructFloor(newparent, sorted[office])
    }
  }
}

function constructBuilding(data) {

  var buildingsPanel = document.getElementById("buildingWrapper");
  var activeBuffer = "";

  if (data.active) {
    activeBuffer = "active"
  }

  var template = `
  <div class="domain ${activeBuffer}" id="${data.id}">
    <div class="domain-icon-wrapper" >
      <img class="domain-icon" src="${data.icon}" alt="Generic Profile Picture" id="icon_${data.id}">
    </div>
    <div class="domain-misc-wrapper">
      <div class="domain-misc-content">
        <div class="domain-titles-wrapper">
          <div class="domain-title">${data.name}</div>
          <div class="domain-subtitle"></div>
        </div>
      </div>
    </div>

    <div class="domain-title-tooltip"> ${data.name} </div>
  </div>`

  buildingsPanel.innerHTML += template
}



function populateBuilding(id) {
  var ctxPanel = document.getElementById("context-panel");
  var floorplanUrl = `../temp/${id}.json`;
  ctxPanel.innerHTML = ` <div class="toggle-left-panel" onclick="toggleLeft('left-panel')">`

  fetch(floorplanUrl)
    .then(res => res.json())
    .then((out) => {

      var sorted = out.sort(sortByProperty('position'))
      for (var office in sorted) {
        if (sorted[office].type == "channel-text") {
          furnishOffice(ctxPanel, sorted[office])
        }
        if (sorted[office].type == "group") {
          constructFloor(ctxPanel, sorted[office])
        }
      }

    })
    .catch(err => { throw err });

    ctxPanel.addEventListener("click", (e) => {
      console.log(stripID(e.target.id));
    });
}

// Code for loading a new building 
function enterBuilding(data) {

  populateBuilding(data.id)

  document.getElementById("ctx-building-title").innerHTML = data.name
  document.getElementById("ctx-server-icon").src = data.icon

  activeBuilding = data.id
  
}

function changeBuilding (elemId){
  var id = stripID(elemId)
  if (id != activeBuilding){
  var data = _.findWhere (buildingManifest, {"id": id})
  enterBuilding(data)
  }
}



function buildingPlan() {
  var buildingsJson = `../temp/buildings.json`;

  fetch(buildingsJson)
    .then(res => res.json())
    .then((out) => {

      var sorted = out.sort(sortByProperty('position'))
      buildingManifest = sorted;
      for (var building in sorted) {

        constructBuilding(sorted[building])

        if (sorted[building].active) {
          enterBuilding(sorted[building])
          
        }
      }

    })
    .catch(err => { throw err });
    

    var buildingIcon = document.getElementById("buildingWrapper");
    console.log(buildingIcon)
    buildingIcon.addEventListener("click", (e) => {
      if (e.target.id) changeBuilding(e.target.id);
     
    });
}


window.onload = function () {
  buildingPlan()
  
}