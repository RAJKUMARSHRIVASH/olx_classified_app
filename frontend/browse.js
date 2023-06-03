// const baseURL = "http://localhost:8080";
const baseURL = "https://olx-classified-app.onrender.com";

browseData();

async function browseData(){
    try {
        const fetchedData = await fetch(`${baseURL}/api/browseads/getall`);
        const data = await fetchedData.json();
        showData(data?.data);

    } catch (error) {
        alert("Something went wrong while loading data "+error);
    }
}

function showData(data){
    console.log(data)
    document.querySelector(".cardcontainer").innerHTML = "";
    data?.map((el,i)=>{

        let div = document.createElement("div");
        let name = document.createElement("h2");
        name.innerText = el.name;

        let image = document.createElement("img");
        image.src = el.image;

        let description = document.createElement("p");
        description.innerText = el.description;

        let category = document.createElement("p");
        category.innerText ="Category: "+ el.category;

        let location = document.createElement("p");
        location.innerText ="📌 "+ el.location;

        let date = document.createElement("p");
        date.innerText ="Posted at "+ el.date;

        let price = document.createElement("h3");
        price.innerText ="Price (USD) "+ el.price;

        let div2 = document.createElement("div");
        
        let edit = document.createElement("button");
        edit.innerText = "Edit";

        let deletes = document.createElement("button");
        deletes.innerText = "Delete"
        div2.append(edit,deletes);

        div.append(image,name,category,description,location,date,price,div2);

        document.querySelector(".cardcontainer").append(div);

    })

}