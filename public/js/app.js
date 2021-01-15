var activeBuilding
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

function furnishOffice(floor, data, classes = "has-text-light") {
  floor.innerHTML += `<div class="ctx-domain-channel-text ${classes} noselect" id="${data.id}"><div class="ctx-domain-channel-text-title"><i class="fa fa-hashtag" aria-hidden="true"></i> ${data.name}</div></div>`
}

function constructFloor(parent, data) {

  parent.innerHTML += `
          <div class="ctx-domain-channel-group ${data.classes}" id="${data.id}">
            <div class="ctx-dcg-title-wrapper   noselect" onclick="toggleDCG('${data.id}')">
              <div class="ctx-dcg-min-max" id="dcg-minmax-${data.id}">-</div>
              <div class="ctx-dcg-title">
              ${data.name}
              </div>
            </div>
            <div class="ctx-dcg-child-wrapper" id="dcg-wrapper-${data.id}">
            </div>
            
          </div>
          `

  var sorted = data.offices.sort(sortByProperty('position'))
  var newparent = document.getElementById(`dcg-wrapper-${data.id}`)
  for (var office in sorted) {
    if (sorted[office].type == "channel-text") {
      furnishOffice(newparent, sorted[office], data.childClasses)
    }
    if (sorted[office].type == "group") {
      constructFloor(newparent, sorted[office])
    }
  }
}

function populateBuilding(id) {
  var ctxPanel = document.getElementById("context-panel");
  var floorplanUrl = `../temp/${id}.json`;

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
}

function constructBuilding(data) {

  var buildingsPanel = document.getElementById("buildingWrapper");
  var activeBuffer = "";

  if (data.active){
    activeBuffer = "active"
  }

  var template = `
  <div class="domain ${activeBuffer}" id="${data.id}">
    <div class="domain-icon-wrapper">
      <img class="domain-icon" src="${data.icon}" alt="Generic Profile Picture">
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

function swapBuildingNameplate(data){

}

// Code for loading a new building 
function enterBuilding(data) {

  populateBuilding(data.id)

  document.getElementById("ctx-building-title").innerHTML = data.name
  document.getElementById("ctx-server-icon").src = data.icon

  activeBuilding = data.id
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

}

window.onload = function () {
  buildingPlan()
}