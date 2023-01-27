const popup = `<div class="karmabox-popup-container">
    <div class="kb-tabs">
        <button id="kb-tab-kba" class="kb-tab-button kb-tab-button-select">Karma Box account</button>
        <button id="kb-tab-card" class="kb-tab-button">Card</button>
    </div>
    <!-- karma box acount tab -->
    <div class="kb-body-container-kba">
        <form class="karmabox-popup-card-container">
            <label>Enter a custom amount</label>
            <div class="kb-amount-container">
                <div>
                    <input class="karmabox-popup-input">
                </div>
                <button class="kb-amount-button">up</button>
                <button class="kb-amount-button">down</button>
            </div>
            <button id="karmabox-popup-submit" type="submit">Donate Now</button>
        </form>
    </div>
    <!-- card tab -->
    <div class="kb-body-container-card kb-display-none">
        <form class="karmabox-popup-card-container">
            <label>Enter a custom amount</label>
            <div class="kb-amount-container">
                <div>
                    <input class="karmabox-popup-input">
                </div>
                <button class="kb-amount-button">up</button>
                <button class="kb-amount-button">down</button>
            </div>
            <div>
                <div class="karmabox-popup-input payment-element"></div>
            </div>
            <button id="karmabox-popup-submit" type="submit">Donate Now</button>
        </form>
    </div>
</div>
`;
const style = `


.karmabox-button-container {
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
    --kb-tab-height: 35px;
    --kb-body-height: calc(500px var(--kb-tab-height));
    --kb-height: 500px;
    --primary: #0081c9;
    --secondary: #5bc0f8;
    --tertiary: #86e5ff;
    --yellow: #ffc93c;
    --yellow-plus: #fdbc02;
    height: var(--kb-body-height);
    width: 315px;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 150px;
    margin-bottom: 150px;
    padding: 0px 20px 20px 20px;
    background-color: var(--primary);
    border-radius: 10px;

    color: white;
}

/* form */
.karmabox-popup-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* primary #0081c9
 * secondary #5bc0f8
 * tertiary #86e5ff
 * yellow #ffc93c
*/

.karmabox-popup-input {
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #e7faff;
    border-radius: 10px;
}


.kb-tabs {
    display: flex;
    justify-content: space-between;
    height: var(--kb-tab-height);
}

.kb-tab-button {
    width: 50%;
    height: 100%;
    border: none;
    background-color: var(--secondary);
    color: black;
}

.kb-tab-button:hover {
    background-color: var(--tertiary);
}

.kb-tab-button-select {
    background-color: var(--primary);
    color: white;
}

.kb-tab-button-select:hover {
    background-color: var(--primary);
}

/* card tab container */
.kb-body-container-card{
    height: var(--kb-body-height);
    overflow-y: scroll;
}
/* karma box acount tab container */
.kb-body-container-kba{
    height: var(--kb-body-height);
    overflow-y: scroll;
}
.kb-display-none {
    display: none;
}


#karmabox-popup-submit {
    background-color: var(--yellow);
    border: none;
    margin: 10px;
    height: 40px; 
    padding: 10px;
    font-size: 1.2em;
    border-radius: 5px;
}
#karmabox-popup-submit:hover {
    background-color: var(--yellow-plus);
    border: none;
    margin: 10px;
    height: 40px; 
    padding: 10px;
    font-size: 1.2em;
}

.kb-amount-container {
    display: flex;
    justify-content: flex-start;
    margin: 20px;
    width: 100%;
}

.kb-amount-button {
    justify-self: flex-end;
    width: 50px;
}

`;
const html = `<div class="karmabox-button-container">
    <button type="button" class="karmabox-button-button"></button>
</div>
`;
KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style)


let baseURL = "http://127.0.0.1:4000";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDJmYzRmZjc1ZTgwOTNmMWJlZDk2NiIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiIiwiaWF0IjoxNjc0NzcxNzQyLCJleHAiOjI1Mzg3NzE3NDJ9.fjNSK-zZabg6QGwZkrsWaB8r0r_2gQFj_o7HNCDhedY"


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



    // getting clientSecret
    url = `${baseURL}/api/create-payment-intent`;
    headers = new Headers();
    headers.append("Authorization", token);
    const res = await fetch(url, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({}),
    });
    const {clientSecret} = await res.json();

    let stripe = Stripe(publishableKey.publishableKey);
    let elements = stripe.elements({
        clientSecret: clientSecret,
    });

    let cardElement = elements.create("payment");
    let cardContainer = document.getElementsByClassName("payment-element")[0];
    console.log(cardContainer)
    cardElement.mount(cardContainer);

    
    document.getElementById("karmabox-popup-submit").addEventListener("click", e => {
        e.preventDefault();
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://127.0.0.1:5500/capstone/Karma-Box/widget/test/index.html?",
            },
            redirect: "if_required",
        }).then(result => {
            if (result.error) {
                console.log("payment error");
            }
        });
    });



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
        console.log(clientSecret)
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
            addEvents();
            testing();
        } else {
            let child = document.getElementById("karmabox-body-child");
            document.getElementsByTagName("body")[0].removeChild(child)[0];
            KARMABOX_IS_OPEN = false;
        }
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

function addEvents() {
    document.getElementById("kb-tab-kba").addEventListener("click", e => {
        e.target.className = "kb-tab-button kb-tab-button-select"
        e.target.nextElementSibling.className = "kb-tab-button"
        document.getElementsByClassName("kb-body-container-card")[0]
            .className = "kb-body-container-card kb-display-none";
        document.getElementsByClassName("kb-body-container-kba")[0]
            .className = "kb-body-container-kba";
    });
    document.getElementById("kb-tab-card").addEventListener("click", e => {
        e.target.className = "kb-tab-button kb-tab-button-select"
        e.target.previousElementSibling.className = "kb-tab-button"
        document.getElementsByClassName("kb-body-container-kba")[0]
            .className = "kb-body-container-kba kb-display-none";
        document.getElementsByClassName("kb-body-container-card")[0]
            .className = "kb-body-container-card";
    });
}
