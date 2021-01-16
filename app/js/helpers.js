var holditbuster = [0, 0];

function toggleview(target){
  var targetele = document.getElementById(target)
  if (targetele.style.display === "none") {
    targetele.style.display = "block";
    
  } else {
    targetele.style.display = "none";
  }
}

function toggleHidden(target, index, defocus = false){
  var targetele = document.getElementById(target)
  if (defocus == true){
    holditbuster[index] = Date.now();
  }
  if (targetele.style.visibility === "hidden") {
    if (holditbuster[index] + 150 > Date.now())  return; // keep it from spazzing out when you click the setting icon to close it again
    targetele.style.visibility = "visible";
    targetele.classList.remove('fadeout')
    targetele.classList.add('fadein')
    
  } else {
    targetele.style.visibility = "hidden";
    targetele.classList.remove('fadein')
    targetele.classList.add('fadeout')
  }
}

function toggleLeft(target){
  var targetele = document.getElementById(target)
  if (targetele.classList.contains('expanded')) {
    targetele.classList.remove('expanded')
    targetele.classList.add('minimized')
  } else {
    targetele.classList.remove('minimized')
    targetele.classList.add('expanded')
  }
}

function toggleDCG(target){
  var wrapper = document.getElementById(("dcg-wrapper_" + target))
  var minmax = document.getElementById("dcg-minmax_" + target);
  if (wrapper.classList.contains('hidden')) {
    wrapper.classList.remove('hidden')
    minmax.innerHTML = "-"
  } else {
    wrapper.classList.add('hidden')
    minmax.innerHTML = "+"
  }
}
