const FIELD_RULES = {
    fullName: ["full name", "legal name", "name"],
    email: ["email", "e-mail"],
    phone: ["phone", "mobile", "telephone"],
    address: ["address", "street address"],
  };
  
  function getLabelText(field) {
    if (!field.id) return "";
    const label = document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    return label ? label.innerText : "";
  }
  
  function getFieldText(field) {
    return [
      field.name,
      field.id,
      field.placeholder,
      field.autocomplete,
      field.getAttribute("aria-label"),
      getLabelText(field),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }
  
  function setFieldValue(field, value) {
    if (!value || field.value) return;
  
    field.focus();
    field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
  
  function findProfileKey(field) {
    const text = getFieldText(field);
  
    for (const [profileKey, keywords] of Object.entries(FIELD_RULES)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        return profileKey;
      }
    }
  
    return null;
  }
  
  function fillForm(profile) {
    const fields = document.querySelectorAll(
      'input:not([type="hidden"]):not([type="file"]), textarea'
    );
  
    fields.forEach((field) => {
      if (field.disabled || field.readOnly) return;
  
      const profileKey = findProfileKey(field);
      if (!profileKey) return;
  
      setFieldValue(field, profile[profileKey]);
    });
  }
  
  chrome.storage.local.get("profile", ({ profile }) => {
    if (!profile) return;
    fillForm(profile);
  });