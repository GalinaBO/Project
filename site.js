async function getAll(){
    let body=await (await(fetch("/api/info"))).json();
    let strOption=``;
    let strTable=`
    <tr>
        <th>name</th>
        <th>population</th>
        <th>counter</th>
    </tr>
    `;

    for(let country of body){
        strOption+=`<option>${country.name}</option>`;
        strTable+=`
        <tr>
            <td>${country.name}</td>
            <td>${country.population}</td>
            <td>${country.counter}</td>
        </tr>
        `;
    }
    document.getElementById("info").innerHTML=strTable;  
    document.getElementById("countries").innerHTML=strOption; 
       
}


async function updateServer(){

    let countryName=document.getElementById("countries").value;
    let countryCounter=document.getElementById("counter").value;

    let initParam= { 
        "method":"PUT",
         headers: {"Content-Type": "application/json"},
         body:`{"counter": ${countryCounter}}`
    };

    let res=await (await (fetch(`/api/edit/${countryName}`,initParam))).json();
    alert(res.message);

}

onload=()=>{
    getAll();
    setInterval(getAll, 5000);
}

