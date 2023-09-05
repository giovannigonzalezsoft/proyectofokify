import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';
const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
};
async function loadRecipe(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`); // Utiliza la función getJSON
        state.recipe = data.data.recipe;
        state.recipe = {
            id: state.recipe .id,
            title: state.recipe .title,
            publisher: state.recipe .publisher,
            sourceUrl: state.recipe .source_url,
            image: state.recipe .image_url,
            servings: state.recipe .servings,
            cookTime: state.recipe .cooking_time,
            ingredients: state.recipe .ingredients,
        };
        console.log('Respuesta:', state.recipe);    
    } catch (err) {
        console.log(`${err} 💥💥💥💥`);
        throw err;
    }
}
async function loadSearchResults(query) {
    try {
        state.search.query = query;
        let data = await getJSON(`${API_URL}/?search=${query}`);
        state.search.results = data.data.recipes.map((rec) => ({
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
        }));
    } catch (err) {
        console.log(`${err} 💥💥💥💥`);
        return err;
    }
}
  
function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
 
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  // Retorna una porción de los resultados según la página actual
  return state.search.results.slice(start, end);
}
export { state, loadRecipe, loadSearchResults, getSearchResultsPage };