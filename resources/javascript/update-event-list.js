// show all events from database with aditional buttons
(function() {
    
    fetch('/events-log.json', {mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
        for(let i = 0;i<data.length;i++){
            
            
            var formBtn = document.createElement('FORM');
            var formBtn2 = document.createElement('FORM');
            var hidenNode = document.createElement('INPUT');
            var hidenNode2 = document.createElement('INPUT');
            var hidenNode3 = document.createElement('INPUT');
            var node = document.createElement("LI");
            var btn = document.createElement("BUTTON");
            var btn2 = document.createElement("BUTTON");
            var t = document.createTextNode("Delate"); 
            var t2 = document.createTextNode("Update"); 
            formBtn.name='form-btn';
            formBtn2.name='form-btn2';
            formBtn.method='post';
            formBtn.action='/events-main';
            formBtn2.method='post';
            formBtn2.action='/events-main';
            
            hidenNode.type = "hidden";
            hidenNode2.type = "hidden";
            hidenNode3.type = "hidden";
            btn2.disabled = true;
            hidenNode.name = "hTitleOfEvent";
            hidenNode2.name = "hDescOfEvent";
            hidenNode3.name = "hTitleOfEvent2";
            hidenNode.value = data[i].titleOfEvent;
            hidenNode2.value = data[i].describeOfEvent;
            hidenNode3.value = data[i].titleOfEvent;
            
            
            
                                    
            node.classList.add("li-event");
            btn.classList.add("delete-btn");
            btn2.classList.add("update-btn");
            formBtn.classList.add("event-form");
            formBtn2.classList.add("event-form2");
            btn.appendChild(t); 
            btn2.appendChild(t2);  
            var textnode = document.createTextNode('Event name : ' + data[i].titleOfEvent + ' , ' + 'Event discription : ' + data[i].describeOfEvent);
            node.appendChild(textnode);
            document.getElementById("ulEvent").appendChild(node).className = "li-event";
            document.getElementById("ulEvent").appendChild(formBtn).className = "event-form";
            document.getElementById("ulEvent").appendChild(formBtn2).className = "event-form2";
            formBtn.appendChild(hidenNode);
            formBtn.appendChild(hidenNode2);
            formBtn2.appendChild(hidenNode3);
            
            formBtn.appendChild(btn).className = "delete-btn";
            formBtn2.appendChild(btn2).className = "update-btn";
            
                
              
        };
    });
  })();








