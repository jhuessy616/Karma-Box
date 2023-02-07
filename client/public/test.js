const popup = `<div class="karmabox-popup-container">
    <div class="kb-tabs">
        <button id="kb-tab-kba" class="kb-tab-button kb-tab-button-select">Karma Box account</button>
        <button id="kb-tab-card" class="kb-tab-button">Card</button>
    </div>
    <!-- karma box acount tab -->
    <div class="kb-body-container-kba">
        <div class="kb-body-wrapper-kba">
            <h2 id="kb-slogan">Start Earning Good Karma Today</h2>
            <h3 id="kb-charity"> Donate to Mermaids Against Plastic</h3>
            <div class="kba-amount-select-container">
                <button id="kba-amount-1" class="kba-amount-select kba-amount-selected">$5</button>
                <button id="kba-amount-2" class="kba-amount-select">$10</button>
                <button id="kba-amount-3" class="kba-amount-select">$20</button>
            </div>
            <h3 class="kba-or">or</h3>
            <label class="kba-custom-amount">Enter a custom amount</label>
            <div>
                <label>$</label>
                <input value="5" id="kba-custom-amount">
            </div>
            <button id="karmabox-popup-kba-submit" type="submit">Donate Now</button>
        </div>
    </div>
    <!-- card tab -->
    <div class="kb-body-container-card kb-display-none">
        <form class="karmabox-popup-card-container">
            <label class="kba-custom-amount">Enter a custom amount</label>
            <div>
                <label>$</label>
                <input value="5" class="kba-custom-amount-input">
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
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background-color: #86e5ff;
    /* background-image: url("http://localhost:3000/assets/logo3.png%22); */
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    cursor: pointer;
}

.karmabox-image-image {
    filter: invert(33%) sepia(47%) saturate(4640%) hue-rotate(181deg) brightness(93%) contrast(102%);
    border: none;
    width: 50px;
    height: 50px;
}

.karmabox-popup-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --kb-tab-height: 35px;
    --kb-body-height: calc(550px var(--kb-tab-height));
    --kb-height: 500px;
    --primary: #0081c9;
    --secondary: #5bc0f8;
    --tertiary: #86e5ff;
    --yellow: #ffc93c;
    --yellow-plus: #fdbc02;
    height: 460px;
    /* var(--kb-body-height); */
    width: 250px;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 72px;
   /* 20 */
    margin-bottom: 86px;
    /* 90 */
    padding: 0px 20px 20px 20px;
    background-color: #d3f5ff;
    border-radius: 8px;
    color: var(--primary);
    box-shadow: 0 40px 70px 20px rgb(50 50 93 / 25%),
    0 30px 60px -30px rgb(0 0 0 / 30%);
   
}
#kb-charity{
    font-size: 16.2px;
}
#kb-slogan{
    font-size: 17px; 
    margin-bottom: -15px;
    margin-top: 30px;
}
.kb-body-wrapper-kba{
    margin-top:10px;
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
    margin-right: -20px;
    margin-left: -20px;
   
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
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.kb-tab-button:hover {
    background-color: var(--tertiary);
}

.kb-tab-button-select {
    background-color: #d3f5ff;
    color: var(--primary);
}

.kb-tab-button-select:hover {
    background-color: #d3f5ff;
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
       border-color: var(--yellow);
    margin: 10px;
    height: 40px; 
    padding: 8px 10px 10px 10px;
    font-size: 1.2em;
    border-radius: 2px;
}
#karmabox-popup-submit:hover {
    background-color: var(--yellow-plus);
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

/* karma box acount tab */

.kba-amount-select-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.kba-amount-select {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background-color: var(--secondary);
    border: none;
    margin: 10px;
}
.kba-custom-amount{
    font-size: 16px;
    font-weight: 550;
}

.kba-custom-amount-input {
    width: 78px;
    height: 20px;
    margin: 10px;
}

.kba-amount-select:hover {
    background-color: var(--tertiary);
}
.kba-amount-selected {
    background-color: var(--yellow);
    font-weight: 600;
    height: 55px;
    width: 55px;
}
.kba-amount-selected:hover {
    background-color: var(--yellow-plus);
    
}

.kb-body-wrapper-kba {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.kb-body-wrapper-kba > div > input {
    height: 25px;
    width: 78px;
    margin-right: 14px;
}
.kb-body-wrapper-kba > label {
    margin: 10px;
}

#karmabox-popup-kba-submit {
    background-color: var(--yellow);
    border-color: var(--yellow);
    margin: 10px;
    height: 40px; 
    padding: 8px 10px 10px 10px;
    font-size: 1.2em;
    border-radius: 2px;
    margin-top: 20px;
}
#karmabox-popup-kba-submit:hover {
    background-color: var(--yellow-plus);
}
.kba-or {
    margin: 0;
}

/* Julia's ideas 
  box-shadow: 0 40px 70px 20px rgb(50 50 93 / 25%),
    0 30px 60px -30px rgb(0 0 0 / 30%);
    background-color: b9f0ff
    font color  */
`;
const html = `<div class="karmabox-button-container">
<div class="karmabox-button-button ">
    <input type="image" src="http://localhost:3000/assets/logo3.png" class="karmabox-image-image"/>
    <!-- <div type="button" class="karmabox-button-button"><img src="../assets/logo3.png" /></div> -->
</div>
</div>
`;
KARMABOX_IS_OPEN = false;

// setting up popup, widget, etc..
inject(html, style);

let karmabox_url = "http://localhost:3000";
let baseURL = "http://127.0.0.1:4000"; // url to karmabox backend
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJlNThhYWM5NzZhNTQ2YzI0MGEwYyIsImlzQWRtaW4iOmZhbHNlLCJpc0NoYXJpdHkiOmZhbHNlLCJjdXN0b21lcklkIjoiY3VzX05IZjFDTjhJbTB0a0I4IiwiaWF0IjoxNjc1MzU1NTY2LCJleHAiOjI1MzkzNTU1NjZ9.oVAW_AKl4Up6yVTV3lFzCPi_G3F2A2Fsrf2N6uuYdAU"


async function karmabox_acount_tab() {

    // karma box acount tab
    function amountSelect(e) {
        e.stopPropagation();
        e.target.parentElement.childNodes.forEach((element) => {
            if (element.id && element.id != e.target.id) {
                element.className = "kba-amount-select";
            } else if (element.id == e.target.id) {
                element.className = "kba-amount-select kba-amount-selected";
                document.getElementById("kba-custom-amount").value = element.innerText.slice(1, element.innerText.length);
            }
        })
    }
    document.getElementById("kba-amount-1").addEventListener("click", amountSelect);
    document.getElementById("kba-amount-2").addEventListener("click", amountSelect);
    document.getElementById("kba-amount-3").addEventListener("click", amountSelect);


    document.getElementById("karmabox-popup-kba-submit").addEventListener("click", async (e) => {
        let amount = document.getElementById("kba-custom-amount").value;
        if (amount == atob("dGVzdA==")) {
            document.getElementById("kb-charity").innerText = atob(
                "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2pvbmFzLWJyZWVuLTQ4MWIyMjI1OC8="
            );
        } else {
            window.location.href = `${karmabox_url}/paymentRedirect/?f=${window.location}&a=${amount}`;
        }
    });
}
async function cardTab() {
    url = `${baseURL}/api/create-payment-intent-guest`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    body = JSON.stringify({
        amount: 500,
    });

    const res = await fetch(url, {
        method: "POST",
        headers,
        body
    });
    const cs_result = await res.json();

    url = `${baseURL}/api/config`;
    const res2 = await fetch(url, {
        method: "GET",
    });
    const publishableKey = await res2.json();
    console.log(cs_result)


    let stripe = Stripe(publishableKey.publishableKey);
    let elements = stripe.elements({
        clientSecret: cs_result.clientSecret,
    });


    let cardElement = elements.create("payment");
    let cardContainer = document.getElementsByClassName("payment-element")[0];
    cardElement.mount(cardContainer);

    document.getElementById("karmabox-popup-submit").addEventListener("click", e => {
        e.preventDefault();
        cardElement.clear();
        
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


// injects the widget button into the body element and adds event listeners for opening
// and closing the popup.
function inject(html, css) {
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
            karmabox_acount_tab();
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

  document.getElementsByTagName("body")[0].addEventListener("click", (e) => {
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
  document.getElementById("kb-tab-kba").addEventListener("click", (e) => {
    e.target.className = "kb-tab-button kb-tab-button-select";
    e.target.nextElementSibling.className = "kb-tab-button";
    document.getElementsByClassName("kb-body-container-card")[0].className =
      "kb-body-container-card kb-display-none";
    document.getElementsByClassName("kb-body-container-kba")[0].className =
      "kb-body-container-kba";
  });
  document.getElementById("kb-tab-card").addEventListener("click", (e) => {
    e.target.className = "kb-tab-button kb-tab-button-select";
    e.target.previousElementSibling.className = "kb-tab-button";
    document.getElementsByClassName("kb-body-container-kba")[0].className =
      "kb-body-container-kba kb-display-none";
    document.getElementsByClassName("kb-body-container-card")[0].className =
      "kb-body-container-card";
    cardTab();
  });
}
