document.getElementById("save").addEventListener("click", () => {
    const profile= {
        fullName : document.getElementById("fullName").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        address : document.getElementById("address").value,
    };

    chrome.storage.local.set({profile});

});