import { describe, it } from 'mocha';
import { expect } from 'chai';

import Pagination from '../../src/pagination/Pagination';

describe('Navigation', () => {
  it('current page should not change if no action is peformed', () => {
    const pagination = new Pagination();
    pagination.init({
      currentPage: 3,
    });

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(3);
  });

  it('first page should not change when navigating backwards', () => {
    const pagination = new Pagination();
    pagination.init({
      currentPage: 1,
    });

    pagination.prevPage();

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(1);
  });

  it('last page should not change when navigating forward', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 3,
      items: [1, 2, 3, 4, 5],
      currentPage: 2,
    });

    pagination.nextPage();

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(2);
  });

  it('should navigate one page forward', () => {
    const pagination = new Pagination();
    pagination.init({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      itemsPerPage: 13,
      currentPage: 1,
    });
    pagination.nextPage();

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(2);
  });

  it('should navigate one page backwards', () => {
    const pagination = new Pagination();
    pagination.init({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemsPerPage: 3,
      currentPage: 2,
    });
    pagination.prevPage();

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(1);
  });

  it('should get the last page', () => {
    const pagination = new Pagination();
    pagination.init({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemsPerPage: 3,
      currentPage: 2,
    });
    const lastPage = pagination.getLastPage();
    expect(lastPage).to.equal(3);
  });

  if('should select current page when click a page', () => {
    const pagination = new Pagination();
    pagination.init({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemsPerPage: 3,
      currentPage: 1,
    });
    pagination.clickPage(1);

    const currentPage = pagination.getCurrentPage();
    expect(currentPage).to.equal(1);
  });
});

describe('Items pagination', () => {
  it('should get all items when they fit on a single page', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 5,
      items: [1, 2, 3, 4, 5],
      currentPage: 1,
    });

    const items = pagination.getItems();
    expect(items).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('should get all items from the first page', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 5,
      items: [1, 2, 3, 4, 5, 6],
      currentPage: 1,
    });

    const items = pagination.getItems();
    expect(items).to.deep.equal([1, 2, 3, 4, 5]);
  });

  it('should get all items from the second page', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 5,
      items: [1, 2, 3, 4, 5, 6, 7],
      currentPage: 2,
    });

    const items = pagination.getItems();
    expect(items).to.deep.equal([6, 7]);
  });

  it('should get items from the first page and then, after changing the page, items from the second page', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 5,
      items: [1, 2, 3, 4, 5, 6, 7],
      currentPage: 1,
    });

    let items = pagination.getItems();

    expect(items).to.deep.equal([1, 2, 3, 4, 5]);

    pagination.nextPage();
    items = pagination.getItems();
    expect(items).to.deep.equal([6, 7]);
  });
});

describe('Visiblle page buttons', () => {
  it('should show one visible page when all items are on the same page', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 5,
      items: ['a', 'b', 'c', 'd', 'e'],
      visiblePages: 3,
      currentPage: 1,
    });

    const buttons = pagination.getVisiblePages();
    expect(buttons).to.deep.equal([1]);
  });

  it('should show all visible pages when available pages match visible pages', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 3,
      items: ['a', 'b', 'c', 'd', 'e'],
      visiblePages: 2,
      currentPage: 1,
    });

    const buttons = pagination.getVisiblePages();
    expect(buttons).to.deep.equal([1, 2]);
  });

  it('should show all available pages when visible pages exceed available pages', () => {
    const pagination = new Pagination();
    pagination.init({
      itemsPerPage: 2,
      items: ['a', 'a', 'b', 'c', 'd'],
      visiblePages: 100,
      currentPage: 3,
    });

    const buttons = pagination.getVisiblePages();
    expect(buttons).to.deep.equal([1, 2, 3]);
  });

  it('should show current page in middle of visible pages', () => {
    const pagination = new Pagination();
    pagination.init({
      currentPage: 3,
      itemsPerPage: 1,
      items: ['a', 'b', 'c', 'd', 'e'],
      visiblePages: 3,
    });

    const buttons = pagination.getVisiblePages();
    expect(buttons).to.deep.equal([2, 3, 4]);
  });

  it('should show current page in middle of visible pages', () => {
    const pagination = new Pagination();
    pagination.init({
      currentPage: 1,
      itemsPerPage: 1,
      items: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
      visiblePages: 5,
    });

    const buttons = pagination.getVisiblePages();
    expect(buttons).to.deep.equal([1, 2, 3, 4, 5]);
  });
});
