
document.addEventListener("DOMContentLoaded", function(event) {
    
    console.log("DOM fully loaded and parsed");
    
    var allBtn = document.getElementsByClassName('update-btn');
    console.log(allBtn);

    for (let i=0; i<allBtn.length; i++) {
        allBtn[i].addEventListener('click', ({ target }) => {
        console.log("upadte");
      });
    }
});




