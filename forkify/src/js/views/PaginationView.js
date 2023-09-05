import View from "./View";
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
  
    _generateMarkup() {
      const curPage = this._data.page;
      const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
  
      // Estando en la página 1 y existen más páginas
      if (curPage === 1 && numPages > 1) {
        return `
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }
  
      // Estando en la última página
      if (curPage === numPages && numPages > 1) {
        return `
          <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        `;
      }
  
      // Estando en cualquier página diferente a la página 1 y diferente a la última página
      if (curPage < numPages) {
        return `
          <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
      }
  
      // Estando en la página 1 y no existen más páginas
      return '';
    }

    addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--inline');
        if (!btn) return;
  
        const goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
    }
}
  
export default new PaginationView();