const fetch = require("node-fetch");
// generators provides Iterator and Iterable
async function* makeCharactersPagintor() {
  let result, data;
  let nextUrl = "https://rickandmortyapi.com/api/character";
  do {
    result = await fetch(nextUrl);
    data = await result.json();
    nextUrl = data.info.next;
    // using yield that is capable to know previous step done
    yield data;
  } while (nextUrl);
}
let currentPage = 0;
const main = async () => {
  const characters = makeCharactersPagintor();
  for await (const page of characters) {
    for (const character of page.results) {
      console.log(character.name);
    }
    currentPage++;
    console.log(`Page ${currentPage}/` + page.info.pages);
  }
};
main();
