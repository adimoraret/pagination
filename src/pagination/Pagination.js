const consecutiveArray = (size, start) => Array.from(new Array(size), (x, i) => (i + start));

export default class Pagination {
  init(configuration) {
    const {
      visiblePages, itemsPerPage, currentPage, items,
    } = configuration;

    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.items = items || [];

    this.itemsNumber = this.items.length;
    this.totalPages = Math.ceil(this.itemsNumber / itemsPerPage);
    this.visiblePages = Math.min(visiblePages, this.totalPages);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getLastPage() {
    return this.totalPages;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  clickPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  getItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + Math.min(this.itemsPerPage, this.itemsNumber - start));
  }

  getVisiblePages() {
    if (this.currentPage <= Math.floor(this.visiblePages / 2) + 1) {
      return consecutiveArray(this.visiblePages, 1);
    }
    if (this.currentPage >= this.totalPages - Math.floor(this.visiblePages / 2)) {
      return consecutiveArray(this.visiblePages, this.totalPages - this.visiblePages + 1);
    }
    return consecutiveArray(this.visiblePages,
      this.currentPage - Math.floor(this.visiblePages / 2));
  }
}
