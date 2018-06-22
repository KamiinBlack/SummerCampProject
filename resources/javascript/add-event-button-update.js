
(function (){
    
    
setTimeout(function(){
    
    console.log("DOM fully loaded and parsed");
    
    var allBtn = document.querySelectorAll('.update-btn');
    console.log(allBtn);
    
    for (let i=0; i<allBtn.length; i++){
       allBtn[i].disabled = false; 
    }
    
    allBtn.disabled = false;

    for (let i=0; i<allBtn.length; i++) {
        allBtn[i].addEventListener('click', ({ target }) => {
                            
           console.log(target.parentNode);
            var formBtn = document.createElement('FORM');
            var hidenNode = document.createElement('INPUT');
            var btn = document.createElement("BUTTON");
            formBtn.name='form-btn';
            formBtn.method='post';
            hidenNode.name = "mTitleOfEvent2";
            //hidenNode.placeholder = "Change name";
            var t = document.createTextNode("OK");
            btn.appendChild(t); 
            btn.id = "ok-button";
            
            
            target.parentNode.appendChild(formBtn);
            formBtn.appendChild(hidenNode);
            formBtn.appendChild(btn);
            //tu moge dac specjalna nazwe i w drugiej metodzie zrobic ze jesli na nia wejdziesz to usuwa wszystko!
        
      });
    };
    }, 2000);
})();


