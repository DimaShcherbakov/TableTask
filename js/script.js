const apiKey = "3f2ce985956d4b9eaa5b215dc66bdbbf";
const apiUrl = "https://api.nytimes.com/svc/topstories/v2/health.json"
const resultUrl = apiUrl + "?api-key="+ apiKey;

let resultArray = [];
let copyResultArray = [];
let ARR = [];
let sectionArray = [];
let item = {};

let Request = async (url)=>{ 
    const info = await fetch(`${url}`);
    const data = await info.json();
    resultArray = data.results;
    ARR = [...resultArray];
    copyResultArray = [...resultArray];
    return resultArray,copyResultArray;
}
const dataTr = Request(resultUrl)
.then(res => { 
    resultArray = res;
    createUI(resultArray);
    });

let createSelect = (array)=>{
    document.getElementById("user-choice").innerHTML = "";
    for(let k = 0; k < array.length; k++){
        let option = document.createElement("option");
        let text = document.createTextNode(array[k]);
        option.appendChild(text);
        document.getElementById("user-choice").appendChild(option);
    }
}

let createUI = (array) => {
    document.getElementById("bodyTable").innerHTML = "";
    for(let i = 0; i < array.length; i++){
        sectionArray.push(array[i].section);
        let tr = document.createElement("tr");
        tr.id = "Table-row" + i;

        let td_1 = document.createElement("td");
        td_1.className = "text-center center-block table-primary";
        let td_2 = document.createElement("td");
        td_2.className = "text-center center-block table-info";
        let td_3 = document.createElement("td");
        td_3.className = "text-center center-block table-info";
        let td_4 = document.createElement("td");
        td_4.className = "text-center center-block table-info";

        let textTd_1 = document.createTextNode(array[i].section);
        td_1.appendChild(textTd_1);
        let textTd_2 = document.createTextNode(array[i].title);
        td_2.appendChild(textTd_2);
        let textTd_3 = document.createTextNode(array[i].byline);
        td_3.appendChild(textTd_3);
        let textTd_4 = document.createTextNode(array[i].created_date);
        td_4.appendChild(textTd_4);
        
        document.getElementById("bodyTable").appendChild(tr);
        document.getElementById("Table-row" + i).appendChild(td_1);
        document.getElementById("Table-row" + i).appendChild(td_2);
        document.getElementById("Table-row" + i).appendChild(td_3);
        document.getElementById("Table-row" + i).appendChild(td_4);
    }
    sectionArray = sectionArray.filter((item, pos, self) => self.indexOf(item) == pos); 
    createSelect(sectionArray);
}

let sorting = (sortType)=>{
    switch(sortType){
        case 0:
            document.getElementById("bodyTable").innerHTML = "";
            document.getElementById("user-choice").value = "Select filter";
            createUI(ARR);
            break;
        case 1: 
            document.getElementById("bodyTable").innerHTML = "";
            document.getElementById("user-choice").value = "Select filter"
            let ascArray = copyResultArray.sort((a, b)=> {
                if (a.section > b.section) {
                return 1;
                }
                if (a.section < b.section) {
                return -1;
                }
                return 0;
            });
            createUI(ascArray);
            break;
        case 2: 
            document.getElementById("bodyTable").innerHTML = "";
            document.getElementById("user-choice").value = "Select filter";
            let descArray = copyResultArray.sort((a, b)=> {
                if (a.section < b.section) {
                return 1;
                }
                if (a.section > b.section) {
                return -1;
                }
                return 0;
            });
            createUI(descArray);
            break;
    }
}
let filter = ()=>{
    if(document.getElementById("user-choice").value !="Select filter"){
        clearArray = copyResultArray.filter(item => item.section === document.getElementById("user-choice").value);
        createUI(clearArray);
    }
}

let addElement = ()=>{
    item = {
        section: document.getElementById("input_section").value,
        title: document.getElementById("input_title").value,
        byline: document.getElementById("input_authors").value,
        created_date: document.getElementById("input_created_date").value
    }
    copyResultArray.push(item);
    createUI(copyResultArray);
}






     