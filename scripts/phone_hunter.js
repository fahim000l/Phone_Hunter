

let loadPhones = async (searchResult, itemNumber) => {

    let phoneUrl = `https://openapi.programming-hero.com/api/phones?search=${searchResult}`;
    let res = await fetch(phoneUrl);
    let data = await res.json();
    displayPhone(data.data, itemNumber);
}

let displayPhone = (phones, itemNumber) => {
    let phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    // console.log(phones);

    if (itemNumber && phones.length > 10) {
        phones = phones.slice(0, 10);
        document.getElementById('seeall-btn').classList.remove('d-none');

    }
    else {

        document.getElementById('seeall-btn').classList.add('d-none');

    }

    if (phones.length == 0) {

        displySpinner(false);
        document.getElementById('not-found').classList.remove('d-none');

    }
    else {

        document.getElementById('not-found').classList.add('d-none');

    }

    displySpinner(false);
    phones.forEach(phone => {

        let phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
                <div class="card card p-2 rounded-3 bg-secondary bg-gradient text-white w-100">
                    <img class="rounded-3" src="${phone.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h1 class="card-title">${phone.phone_name}</h1>
                        <h2 class="card-title">${phone.brand}</h2>                  
                        <p class="card-title">${phone.slug}</p>
                    </div>
                </div>
            `;
        phoneDiv.classList.add('col');
        phoneContainer.appendChild(phoneDiv);




    })
}


let searchProcess = (itemNumber) => {

    displySpinner(true);
    let searchIn = document.getElementById('search-in')
    let searchText = searchIn.value;

    loadPhones(searchText, itemNumber);
    searchIn.value = '';
}


document.getElementById('search-btn').addEventListener('click', function () {

    searchProcess(10);

})




let displySpinner = (state) => {

    let spinner = document.getElementById('spinner');
    if (state == true) {

        spinner.classList.remove('d-none');

    }
    else {
        spinner.classList.add('d-none');
    }
}

document.getElementById('seeall-btn').addEventListener('click', function () {

    // displySpinner(true);
    searchProcess();

});
