const FIELD_RULES = {
    // Chinese name
    firstNameChi: [
      "中文名",
      "名字",
      "名",
      "first name chinese",
      "chinese first name",
      "chineseGivenName",
      "given name chinese",
      "chinese given name",
    ],
  
    lastNameChi: [
      "中文姓氏",
      "姓氏",
      "姓",
      "last name chinese",
      "chinese last name",
      "surname chinese",
      "chinese surname",
      "chineseSurname",
      "family name chinese",
      "chinese family name",
    ],
  
    fullNameChi: [
      "中文姓名",
      "中文全名",
      "姓名中文",
      "全名中文",
      "chinese full name",
      "full name chinese",
      "legal name chinese",
    ],
  
    // English name
    firstNameEng: [
      "first name",
      "given name",
      "english first name",
      "first name english",
      "given name english",
      "english given name",
      "forename",
    ],
  
    lastNameEng: [
      "last name",
      "surname",
      "family name",
      "english last name",
      "last name english",
      "english surname",
      "surname english",
      "family name english",
    ],
  
    fullNameEng: [
      "full name",
      "legal name",
      "english full name",
      "full name english",
      "english name",
      "applicant name",
      "candidate name",
    ],
  
    // Contact
    email: [
      "email",
      "e-mail",
      "email address",
      "mail",
    ],
  
    phone: [
      "phone",
      "mobile",
      "cellPhone",
      "telephone",
      "phone number",
      "mobile number",
      "contact number",
      "tel",
    ],
  
    phoneCountryCode: [
      "country code",
      "phone country code",
      "mobile country code",
      "dialing code",
      "area code",
    ],
  
    // Address
    address: [
      "address",
      "residential address",
      "home address",
      "correspondence address",
      "current address",
      "permanent address",
    ],
  
    street: [
      "street",
      "street address",
      "address line 1",
      "address 1",
      "building",
      "block",
      "estate",
      "road",
      "flat",
      "floor",
      "room",
    ],
  
    city: [
      "city",
      "town",
      "district",
      "region",
      "state",
      "province",
    ],
  
    postalCode: [
      "postal code",
      "postcode",
      "post code",
      "zip",
      "zip code",
    ],
  
    country: [
      "country",
      "country/region",
      "region/country",
      "nationality country",
    ],
  
    // Salary
    expectedSalary: [
      "expected salary",
      "expected monthly salary",
      "expected wage",
      "salary expectation",
      "expected compensation",
      "expected pay",
      "expected remuneration",
    ],
  
    currentSalary: [
      "current salary",
      "current monthly salary",
      "present salary",
      "existing salary",
      "current compensation",
      "current pay",
      "current remuneration",
    ],
  
    // Work experience
    workingExperience: [
      "working experience",
      "work experience",
      "years of experience",
      "total experience",
      "relevant experience",
      "professional experience",
      "employment history",
      "career history",
    ],
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
  // return first if found , so should arrange small item first 
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

chrome.runtime.onMessage.addListener((message) => {
  if (message.type==="CLEAR_PAGE_FIELDS") {
    clearPageFields();
  }

});

function clearPageFields(){
  const fields = document.querySelectorAll(
    'input:not([type="hidden"]):not([type="button"]):not([type="submit"]), textarea , select'
  );

  fields.forEach((field) => {

    if (field.type ==="checkbox" || field.type === "radio"){
      field.check=false;
    } else if (field.tagName === "SELECT") {
      field.selectedIndex = 0;
    } else {
      field.value="";
    }

    field.dispatchEvent(new Event("input",{bubbles:true}));
    field.dispatchEvent(new Event ("change",{bubbles : true}));

  });

}
  