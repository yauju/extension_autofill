document.getElementById("save").addEventListener("click", () => {
    const profile = {
      firstNameChi: document.getElementById("firstNameChi").value,
      lastNameChi: document.getElementById("lastNameChi").value,
      firstNameEng: document.getElementById("firstNameEng").value,
      lastNameEng: document.getElementById("lastNameEng").value,
      fullNameChi: document.getElementById("fullNameChi").value,
      fullNameEng: document.getElementById("fullNameEng").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      expectedSalary: document.getElementById("expectedSalary").value,
      currentSalary: document.getElementById("currentSalary").value,
    };
  
    chrome.storage.local.set({ profile });
  });
  
document.getElementById("clearAll").addEventListener("click", async () => {
  const[tab]= await chrome.tabs.query({
    active:true,
    currentWindow:true
  });

  chrome.tabs.sendMessage(tab.id , {
    type: "CLEAR_PAGE_FIELDS",
  });

});
chrome.storage.local.get("profile", (result) => {
    const profile = result.profile;
  
    if (!profile) return;
  
    document.getElementById("firstNameChi").value = profile.firstNameChi || "";
    document.getElementById("lastNameChi").value = profile.lastNameChi || "";
    document.getElementById("firstNameEng").value = profile.firstNameEng || "";
    document.getElementById("lastNameEng").value = profile.lastNameEng || "";
    document.getElementById("fullNameChi").value = profile.fullNameChi || "";
    document.getElementById("fullNameEng").value = profile.fullNameEng || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("phone").value = profile.phone || "";
    document.getElementById("address").value = profile.address || "";
    document.getElementById("expectedSalary").value = profile.expectedSalary || "";
    document.getElementById("currentSalary").value = profile.currentSalary || "";
  });

