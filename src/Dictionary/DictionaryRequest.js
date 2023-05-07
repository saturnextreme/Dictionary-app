

const DictionaryRequest = async (url, word) => {
    let xurl = `${url}${word}`;
    let response = "";
    response = await fetch(xurl)?.then((response) => response.json());
    return response;

}
export default DictionaryRequest;