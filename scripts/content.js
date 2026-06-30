chrome.storage.local.get("profile",({profile}) => {
    if(!profile) return;
    // 1. find all input and textarea fields
    const label = document.querySelector(`label[for="${input.id}"]`);
    
    // 2. inspect each field's name/id/placeholder/label
    
    // 3. if it looks like name/email/phone/address, fill it
});