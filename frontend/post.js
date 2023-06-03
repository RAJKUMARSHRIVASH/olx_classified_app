// const baseURL = "http://localhost:8080";
const baseURL = "https://olx-classified-app.onrender.com";


async function postAds(event) {
    event.preventDefault();
    const payload = {
        name: event.target.name.value,
        description: event.target.description.value,
        category: event.target.category.value,
        image: event.target.image.value,
        location: event.target.location.value,
        price: event.target.price.value,

    }

    const fetchData = await fetch(`${baseURL}/api/postads/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || null,
        },
        body: JSON.stringify(payload),
    });
    const data = await fetchData.json();
    alert(data.msg);

}