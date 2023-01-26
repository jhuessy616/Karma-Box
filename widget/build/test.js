const popup = `<div class="karmabox-popup-container">
    <h1>hello world</h1>
    <form class="karmabox-popup-card-container">
        <div>
            <label>Name</label>
            <input class="karmabox-popup-input">
        </div>
        <div>
            <label>Card</label>
            <div class="karmabox-popup-input card-element"></div>
        </div>
    </form>

</div>
`;
const style = `.karmabox-button-container {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 75px;
    margin-bottom: 75px;
}
.karmabox-button-button {
    border: none;
    width: 75px;
    height: 75px;
    border-radius: 50px;
    background-color: red;
}

.karmabox-popup-container {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 150px;
    margin-bottom: 150px;
    background-color: gray;
}

.karmabox-popup-input {
    padding: 10px;
    border: 1px solid #ccc;
}

`;
const html = `<div class="karmabox-button-container">
    <button type="button" class="karmabox-button-button"></button>
</div>
`;
KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style)

//var stripe = Stripe('pk_test_51MQga9HZaHQFHCjUSOT26iFGIFfVSnMYsYtde7PlTXpmNuhjUOruqYNJ0uIqBnNqQ7QrjvXgmAZcmqiV0uBqP1UD00OafLCg5T');

let baseURL = "http://127.0.0.1:4000";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDE3YjMyMjc0MWEyZjQ2ZTU1ZTUwYiIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiIiwiaWF0IjoxNjc0NjcyOTQ2LCJleHAiOjI1Mzg2NzI5NDZ9.Xt5QAOkgZhA9rxWEp_bm81fZ9CCzyN5lnyrPNhO0SBs"

// console.log("clientSecret", getClientSecret());
// console.log("PublishableKey", getPublishableKey());



async function testing() {

    let url = `${baseURL}/api/config`;

    headers = new Headers();
    headers.append("Authorization", token);

    let result = await fetch(url, {
        headers: headers,
        method: "GET",
    });
    let publishableKey = await result.json();
    console.log(publishableKey.publishableKey)

    var stripe = Stripe(publishableKey.publishableKey);
    let clientSecret = await getClientSecret();
    let elements = stripe.elements({
        clientSecret: clientSecret,
    });

    let cardElement = elements.create('card');
    let cardContainer = document.getElementsByClassName("card-element")[0];
    console.log(cardContainer)
    cardElement.mount(cardContainer);
}



async function getPublishableKey() {
    let url = `${baseURL}/api/config`;

    headers = new Headers();
    headers.append("Authorization", token);

    fetch(url, {
        headers: headers,
        method: "GET",
    }).then(async result => {
        const publishableKey = await result.json();
        console.log(publishableKey);
        return publishableKey.publishableKey;
    });
}


async function getClientSecret() {

    let url = `${baseURL}/api/create-payment-intent`;
    headers = new Headers();
    headers.append("Authorization", token);

    fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({}),
    }).then(async (result) => {
        const { clientSecret } = await result.json();
        // console.log(clientSecret)
        return clientSecret;
    });

}

/// injects the widget button into the body element and adds event listeners for opening
/// and closing the popup.
function inject(html, css, stripe) {
    let new_element = document.createElement("div");
    new_element.innerHTML = "<style>" + css + "</style>" + html;

    let body = document.getElementsByTagName("body")[0];
    console.log(body)
    body.appendChild(new_element);

    // setting up upening and closing of the popup
    document.querySelector(".karmabox-button-button").addEventListener("click", e => {
        e.stopPropagation();
        if (!KARMABOX_IS_OPEN) {
            let new_element = document.createElement("div");
            new_element.innerHTML = popup;
            new_element.id = "karmabox-body-child";
            document.getElementsByTagName("body")[0].appendChild(new_element);
            new_element.addEventListener("click", e => e.stopPropagation());
            KARMABOX_IS_OPEN = true;
        } else {
            let child = document.getElementById("karmabox-body-child");
            document.getElementsByTagName("body")[0].removeChild(child)[0];
            KARMABOX_IS_OPEN = false;
        }
        testing();
    });

    document.getElementsByTagName("body")[0].addEventListener("click", e => {
        if (KARMABOX_IS_OPEN) {
            let child = document.getElementById("karmabox-body-child");
            document.getElementsByTagName("body")[0].removeChild(child)[0];
            KARMABOX_IS_OPEN = false;
        }
    });

    let script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    document.getElementsByTagName("body")[0].appendChild(script);

}

