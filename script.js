const apiKey = "3f2ce985956d4b9eaa5b215dc66bdbbf";
const apiUrl = "https://api.nytimes.com/svc/topstories/v2/health.json"
const resultUrl = apiUrl + "?api-key="+ apiKey;

let resultArray = [];
let copyResultArray = [];
let sectionArray = [];

let Request = async (url)=>{ 
    const info = await fetch(`${url}`);
    const data = await info.json();
    resultArray = data.results;
    for(let g = 0; g < resultArray.length; g++){
        copyResultArray.push(resultArray[g])
    }
    return resultArray,copyResultArray;
}
const dataTr = Request(resultUrl)
.then(res => { 
    resultArray = res;
    createTable(resultArray);
    });

let createSelect = (array)=>{
    for(let k = 0; k < array.length; k++){
        let option = document.createElement("option");
        let text = document.createTextNode(array[k]);
        option.appendChild(text);
        document.getElementById("user-choice").appendChild(option);
    }
}

let createTable = (array) => {
    document.getElementById("bodyTable").innerHTML = "";
    for(let i = 0; i < array.length; i++){
        sectionArray.push(array[i].section);
        let tr = document.createElement("tr");
        tr.id = "Table-row" + i;

        let td_1 = document.createElement("td");
        let td_2 = document.createElement("td");
        let td_3 = document.createElement("td");
        let td_4 = document.createElement("td");

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
        // case 0:
        //     document.getElementById("bodyTable").innerHTML = "";
        //     document.getElementById("user-choice").value = "Select filter";
        //     console.log(copyResultArray)
        //     createTable(copyResultArray);
        //     break;
        case 1: 
            document.getElementById("bodyTable").innerHTML = "";
            document.getElementById("user-choice").value = "Select filter"
            let ascArray = resultArray.sort((a, b)=> {
                if (a.section > b.section) {
                return 1;
                }
                if (a.section < b.section) {
                return -1;
                }
                return 0;
            });
            createTable(ascArray);
            break;
        case 2: 
            document.getElementById("bodyTable").innerHTML = "";
            document.getElementById("user-choice").value = "Select filter";
            let descArray = resultArray.sort((a, b)=> {
                if (a.section < b.section) {
                return 1;
                }
                if (a.section > b.section) {
                return -1;
                }
                return 0;
            });
            createTable(descArray);
            break;
    }
}
let filter = ()=>{
    if(document.getElementById("user-choice").value !="Select filter"){
        clearArray = resultArray.filter(item => item.section === document.getElementById("user-choice").value);
        createTable(clearArray);
    }
}







     