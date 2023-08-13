const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const catagories = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  });
  // find all categories
  // be sure to include its associated Products
  res.json(catagories)
});

router.get('/:id', async (req, res) => {
  const categorieId = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  });
  // find one category by its `id` value
  // be sure to include its associated Products
  res.json(categorieId)
});

router.post('/', async (req, res) => {
  const newCategory = await Category.create({
    // this could also be req.body.category_name or just req.body since all the params line up with the model
    ...req.body
  });
  // create a new category
  res.status(200).json(newCategory)
});

router.put('/:id', async (req, res) => {
  //this is working just not sure how to show updated cat on front end
  const updateCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      },
    });
  // update a category by its `id` value

  // how to I res.json(the updated category?)
  res.json(updateCategory);

});

router.delete('/:id', async (req, res) => {
  const destroyCategory = await Category.destroy({
    where: {
      id: req.params.id
    },
  });
  // delete a category by its `id` value
  res.json(destroyCategory)
});

module.exports = router;


/*
these are the test objects passed into insomnia for video
{
  category_name: "Bracelet"
}
{
  category_name: "Necklace"
}
*/