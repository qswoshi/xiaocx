const request = require('../../utils/request');

Page({
  data: {
    mainCategories: [],
    subCategories: [],
    currentCategoryId: null,
  },

  onLoad: async function () {
    await this.loadMainCategories();
  },

  selectMainCategory: async function (e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ currentCategoryId: categoryId });
    await this.loadSubCategories(categoryId);
  },

  loadMainCategories: async function () {
    try {
      const mainCategories = await request('/api/categories/main');
      this.setData({ mainCategories });

      if (mainCategories.length) {
        const firstCategoryId = mainCategories[0].id;
        this.setData({ currentCategoryId: firstCategoryId });
        await this.loadSubCategories(firstCategoryId);
      }
    } catch (error) {
      console.error('加载主分类失败', error);
    }
  },

  loadSubCategories: async function (categoryId) {
    try {
      const subCategories = await request(`/api/categories/${categoryId}/sub`);
      this.setData({ subCategories });
    } catch (error) {
      console.error('加载子分类失败', error);
    }
  },
});
