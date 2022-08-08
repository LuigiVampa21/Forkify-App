import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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
    // 0 Update resultsView to mark selected searchResults
    resultView.update(model.getSearchResultsPage());

    // 1 Updating Bookmark view
    bookmarksView.update(model.state.bookmarks);

    // 2 Loading Recipe
    await model.loadRecipe(id);

    // 3 Rendering Recipe
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

    //render pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // 1 render New results
  resultView.render(model.getSearchResultsPage(goToPage));
  // 2 render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1 Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2 Update recipeView
  recipeView.update(model.state.recipe);

  // 3 Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);

  // Upload New Recipe data
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
