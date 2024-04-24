const date = new Date();
var currentmonth = date.getMonth();
var currentyear = date.getFullYear();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const months = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
const days = ['Mon','Tue','Wed','Thurs','Fri','Sat','Sun'];

const current_month = document.querySelector('span.current-month');
const current_year = document.querySelector('span.current-year');
const row = document.querySelector('ul.days');
const dates = document.querySelector('ul.dates');
const arrow_next = document.querySelector('.next');
const arrow_prev = document.querySelector('.prev');
const spec_dates = document.querySelectorAll('.dates li.previous');
const month_dropdown= document.querySelector('#select-month');
const year_dropdown = document.querySelector('#select-year');
const btnapplydate = document.querySelector('.apply-date');

var selectedmonth;
var selectedyear;

current_month.innerText= months[date.getMonth()];
current_year.innerText= date.getFullYear();

for(let i=0;i<days.length;i++){
    row.innerHTML+=`<li> ${days[i]} </li>`;
    
}


const makedates = (currentmonth,currentyear) =>{ // function that makes the calendar
    var firstDay = new Date(currentyear, currentmonth, 1);
    var lastDay = new Date(currentyear, currentmonth + 1, 0);
    var lastdayprev = new Date(currentyear,currentmonth,0);
    var firstdaynext = new Date(currentyear,currentmonth+1,1);
    
    const p = firstDay.getDay() === 0 ? days[days.length-1] : days[firstDay.getDay()-1]; // first day of month
    var nextdaysofmonth =  firstdaynext.getDate();;
    var sum = 1;
    
    for(let i=0;i<days.length-1;i++){
        for(let j=0;j<days.length;j++){
            if(i===0){ // first row of the calendar
                if(days.indexOf(p)===j) {
                   
                    if(firstDay.getDate()===date.getDate() && currentmonth==date.getMonth()
                    &&currentyear==date.getFullYear()) {
                        dates.innerHTML+=`<li class="current-month-day today">${firstDay.getDate()}</li>`;
                        
                    }
                    else{
                        dates.innerHTML+=`<li class="current-month-day">${firstDay.getDate()}</li>`;
                    }
                   
                    sum=firstDay.getDate();
                }
                else if(days.indexOf(p)<j){
                    
                    if(sum===date.getDate() && currentmonth==date.getMonth()
                    &&currentyear==date.getFullYear()) {
                       
                        dates.innerHTML+=`<li class="current-month-day today">${sum}</li>`;
                    }
                    else{
                        dates.innerHTML+=`<li class="current-month-day">${sum}</li>`;
                    }
                    
                }
                else{
                    const prev = lastdayprev.getDate()-days.indexOf(p)+1+j;
                  
                    dates.innerHTML+=`<li class="previous">${prev}</li>`;
                    
                }
            }else{
                if(sum>lastDay.getDate()){
                    const prev = lastdayprev.getDate()-days.indexOf(p)+1+j;
                  
                    dates.innerHTML+=`<li class="next">${nextdaysofmonth}</li>`;
                    nextdaysofmonth+=1;
                    
                }else{
                    if(sum===date.getDate() && currentmonth==date.getMonth()
                    &&currentyear==date.getFullYear()){
                 
                        dates.innerHTML+=`<li class="current-month-day today">${sum}</li>`;
                    }else{
                     
                        
                        dates.innerHTML+=`<li class="current-month-day">${sum}</li>`;
                    }
                    
                }
            }
            
            sum+=1;
        }
        // dates.innerHTML+=`<br>`;
    }
    activedays();
    
}

const changedates = () =>{ // the function for the dates change using arrows
    
    arrow_next.addEventListener('click',()=>{
        if(currentmonth===11) {
            currentyear+=1;
            currentmonth=0;
        }else{
            currentmonth+=1;
        }
        
        
        current_month.innerText = months[currentmonth];
        current_year.innerText = currentyear;
        dates.innerHTML=``;
        todoevents.innerHTML='';
        makedates(currentmonth,currentyear);
        fetchevents(months[currentmonth],currentyear);
    });
    arrow_prev.addEventListener('click',()=>{
        if(currentmonth===0) {
            currentyear-=1;
            currentmonth=11;
        }else{
            currentmonth-=1;
        }
        current_month.innerText = months[currentmonth];
        current_year.innerText = currentyear;
        dates.innerHTML=``;
        todoevents.innerHTML='';
        makedates(currentmonth,currentyear);
        fetchevents(months[currentmonth],currentyear);
    });
}
const apply = ()=>{ // the function for a specific date selection
    btnapplydate.addEventListener('click',()=>{
        currentmonth = months.indexOf(selectedmonth); // selected month is string and currentmonth is number
        currentyear = parseInt(selectedyear); // currentmonth and currentyear are the global var that we use for dates
        current_month.innerText = selectedmonth;
        current_year.innerText = parseInt(selectedyear);
        dates.innerHTML=``;
        todoevents.innerHTML='';
        makedates(currentmonth,selectedyear);
        fetchevents(selectedmonth,selectedyear);
        
    });
}
const activedays = ()=>{ // function for the dates that are clicked 
    
    const alldays = document.querySelectorAll('.dates li');
    const addevents = document.querySelector('.add-events li');
    const month = document.querySelector('.current-month');
    const year = document.querySelector('.current-year');

    

    alldays.forEach((day)=>{
        
        day.addEventListener('click',()=>{
            alldays.forEach((otherdays)=>{
                const newclassname = otherdays.className.replace('active','').trim();
                otherdays.className = newclassname;
            });
            todoevents.innerHTML='';
            if(day.className!='previous' && day.className!='next'){
                day.className+=' active';
                // console.log(day.className);
                addevents.innerText = `${day.innerText}-${month.innerText}-${year.innerText}`;
                fetchfunc(day.innerText,month.innerText,year.innerText);
                
            }
            
        });
    });
}
monthonchange = ()=>{ //function for the dropdown menu, selected month
    selectedmonth=month_dropdown.value;
    
};
yearonchange = ()=>{
    selectedyear = year_dropdown.value; //function for the dropdown menu, selected year
   
}
const selectmonth = ()=>{
    month_dropdown.innerHTML+=`<option >select month</option>`;
    months.forEach((month)=>{
        month_dropdown.innerHTML+=`<option value="${month}">${month}</option>`;
    });
    
}
const selectyear = ()=>{
    year_dropdown.innerHTML+= `<option>select year</option>`;
    for(let i=1970;i<2030;i++){
        year_dropdown.innerHTML+=`<option value="${i}">${i}</option>`
    }
}

selectmonth();
selectyear();
makedates(currentmonth,currentyear);
changedates();
apply();
fetchevents(current_month.innerText,current_year.innerText);





