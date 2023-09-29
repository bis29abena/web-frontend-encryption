const text = document.getElementById("inputString");
const output_string = document.getElementById("outputString");
const mode = document.getElementById("mode");
const secretkey = document.getElementById("secretkey");
const encrypt_button = document.getElementById("encryptButton");
const iv = document.getElementById("encryptivinput");
const Base64 = document.getElementById("Base64");
const Hex = document.getElementById("Hex");

const dtext = document.getElementById("dinputString");
const doutput_string = document.getElementById("doutputString");
const dmode = document.getElementById("dmode");
const dsecretkey = document.getElementById("dsecretkey");
const div = document.getElementById("decryptivinput");
const dBase64 = document.getElementById("dBase64");
const dHex = document.getElementById("dHex");
const decrypt_button = document.getElementById("decrypButton");
const type = document.getElementById("typeSelected")

const toaster = document.getElementById("toaster");
const closeToasterButton = document.getElementById("closeToaster");
const toasterMessage = document.getElementById("toasterMessage");

encrypt_button.addEventListener("click", async () => {
  var selected_output = null;

  if (Base64.checked) {
    selected_output = Base64.value;
  } else {
    selected_output = Hex.value;
  }

  if (mode.value === "CBC") {
    if (iv.value == null) {
      toasterMessage.textContent =
        "Once CBC is selected kindly type your IV value";
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds

      return;
    }
  }

  const encryptRequest = {
    text: text.value,
    mode: mode.value,
    secret_key: secretkey.value,
    output_text: selected_output,
    iv: iv.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encryptRequest),
  };

  try {
    const res = await fetch("https://intense-sea-62758-2f287799f2ad.herokuapp.com/encrypt", options);

    if (!res.ok) {
      toasterMessage.textContent = "An error Occured!!!";
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds

      return;
    }

    const data = await res.json();

    if (data.success) {
      console.log(data);
      output_string.value = data.response;
    } else {
      toasterMessage.textContent = data.message;
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds
    }
  } catch (error) {
    toasterMessage.textContent = "An error Occured!!!";
    toaster.classList.remove("hidden");
    setTimeout(() => {
      toaster.classList.add("hidden");
    }, 3000); // Close the toaster after 3 seconds

    return;
  }
});

decrypt_button.addEventListener("click", async () => {
  var selected_output = null;

  if (dBase64.checked) {
    selected_output = dBase64.value;
    type.textContent = `(${dBase64.value})`
  } else {
    selected_output = dHex.value;
    type.textContent = `(${dHex.value})`
  }

  if (dmode.value === "CBC") {
    if (div.value == null) {
      toasterMessage.textContent =
        "Once CBC is selected kindly type your IV value";
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds

      return;
    }
  }

  const decryptRequest = {
    text: dtext.value,
    mode: dmode.value,
    secret_key: dsecretkey.value,
    input_text: selected_output,
    iv: div.value,
  };

  console.log(decryptRequest)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decryptRequest),
  };

  try {
    const res = await fetch("https://intense-sea-62758-2f287799f2ad.herokuapp.com/decrypt", options);

    if (!res.ok) {
      toasterMessage.textContent = "An error Occured!!!";
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds

      return;
    }

    const data = await res.json();

    if (data.success) {
      doutput_string.value = data.response;
    } else {
      toasterMessage.textContent = data.message;
      toaster.classList.remove("hidden");
      setTimeout(() => {
        toaster.classList.add("hidden");
      }, 3000); // Close the toaster after 3 seconds
    }
  } catch (error) {
    toasterMessage.textContent = "An error Occured!!!";
    toaster.classList.remove("hidden");
    setTimeout(() => {
      toaster.classList.add("hidden");
    }, 3000); // Close the toaster after 3 seconds

    return;
  }
});

closeToasterButton.addEventListener("click", () => {
  toaster.classList.add("hidden");
});
