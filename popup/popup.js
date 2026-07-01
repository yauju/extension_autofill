
document.getElementById("save").addEventListener("click",  () => {
        const profile= {
            fullName : document.getElementById("fullName").value,
            email : document.getElementById("email").value,
            phone : document.getElementById("phone").value,
            address : document.getElementById("address").value,
        };
    
        chrome.storage.local.set({profile});
        
});

chrome.storage.local.get("profile", ({ profile }) => {
    if (!profile) return;
  
    document.getElementById("fullName").value = profile.fullName || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("phone").value = profile.phone || "";
    document.getElementById("address").value = profile.address || "";
  });