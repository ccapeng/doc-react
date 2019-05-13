async function fetchDoc() {
  const response = fetch("/asset/doc.json");
  return response.json();
}
const Doc = fetchDoc(); 

export default Doc;