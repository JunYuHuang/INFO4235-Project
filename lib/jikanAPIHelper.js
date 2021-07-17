import axios from "axios";
import localSearchData from "../assets/localSearchData.json";
import localAnimeTitle from "../assets/localAnimeDetailData.json";

const CORS_PROXY_URL = "https://cors-anywhere-jyhuang.herokuapp.com/";
const API_URL_ROOT = "https://api.jikan.moe/v3";

export async function getAllCurrentSeasonalAnime() {
  try {
    const { data } = await axios.get(`${API_URL_ROOT}/season/`);
    return data.anime;
  } catch (err) {
    console.log(err);
  }
}

export async function findAllAnimeBySearchTerm(searchTerm, page = 1) {
  try {
    const { data } = await axios.get(
      encodeURI(`${API_URL_ROOT}/search/anime?q=${searchTerm}&page=${page}`)
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
}

export async function findAnimeByID(mal_id) {
  try {
    const { data } = await axios.get(`${API_URL_ROOT}/anime/${mal_id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export function getTextFromGenresArray(array) {
  let text = "";
  array.forEach(({ name }, index) => {
    const lastItemIndex = array.length - 1;
    if (index !== lastItemIndex) {
      text += `${name}, `;
    } else {
      text += name;
    }
  });
  return text;
}

export function getLocalSearchResults() {
  const { results } = localSearchData;
  return results;
}

export function getLocalAnimeDetail() {
  return localAnimeTitle;
}

export function getObjectQuantitySuffix(array) {
  return array.length === 0 || array.length > 1 ? "s" : "";
}
