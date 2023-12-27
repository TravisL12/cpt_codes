const root = document.getElementById("root");

const listCodes = async () => {
  const codes = await fetchCodes();
  root.innerHTML = `<ul>${codes
    .map((code) => {
      return `<li>${code["ICD Code"]} - ${code["Description"]}</li>`;
    })
    .join("")}</ul>`;
};

const fetchCodes = async () => {
  const codesJson = await fetch("http://0.0.0.0:3000/codes");
  const resp = await codesJson.json();
  return resp;
};

listCodes();
