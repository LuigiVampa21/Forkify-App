import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import View from './views/view.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';
import recipeView from './views/recipeView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1 Loading Recipe
    await model.loadRecipe(id);

    // 2 Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1 Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    // 2 Load Research
    await model.loadSearchResults(query);
    // 3 Render Results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
