document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  
    var allBtn =  document.getElementsByClassName('delete-btn');
     
    
    for (let i=0; i<allBtn.length; i++) {
        allBtn[i].addEventListener('click', ({ target }) => {
        console.log("delate");
      
    })};
});




