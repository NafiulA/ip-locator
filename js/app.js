const getClientIP = () => {
    document.getElementById("loading-img").classList.toggle("d-none");
    fetch("https://ipwhois.app/json/")
        .then(res => res.json())
        .then(data => displayDetails(data));
}

const getSpecificIP = () => {
    document.getElementById("loading-img").classList.toggle("d-none");
    document.getElementById("content").classList.add("d-none");
    const inputField = document.getElementById("input-value");
    const inputValue = inputField.value;
    const url = `https://ipwhois.app/json/${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}

const displayDetails = data => {
    const rowDiv = document.querySelector("#content");
    rowDiv.textContent = "";
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "card", "p-0", "border-0");
    if (data.success == false) {

        card.innerHTML = `
        <p class= "py-5 text-center fw-bold">${data.message}</p>
        `;
        rowDiv.appendChild(card);
    }
    else {
        card.innerHTML = `
        <img src="${data.country_flag ? data.country_flag : "./images/flag-placeholder.png"}" class="card-img-top border-bottom" alt="">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold">Details</h5>
                        <p>IP: ${data.ip}</p>
                        <p>Type: ${data.type}</p>
                        <p>Continent: ${data.continent}</p>
                        <p>Country: ${data.country}</p>
                        <p>Region: ${data.region}</p>
                        <p>City: ${data.city}</p>
                        <p>Org: ${data.org}</p>
                        <p>ISP: ${data.isp}</p>
        `
        rowDiv.appendChild(card);
        const inputField = document.getElementById("input-value");
        inputField.value = data.ip;
    }
    document.getElementById("loading-img").classList.toggle("d-none");
    rowDiv.classList.remove("d-none");


}