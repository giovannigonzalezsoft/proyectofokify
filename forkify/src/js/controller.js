import * as model from './model';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView';
import PaginationView from './views/PaginationView';
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //Cargar Receta
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    //if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();