const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product, through: ProductTag, as: 'Products'}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'Products'}]
    });

  }catch(error){
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
        category_id: req.params.id,
      },
    }
  )
    res.status(200).json(updatedCategory);
  }catch(err){
    res.status(500).json(err)
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const deletedCategory = await Category.destroy({
    where:{
      id: req.params.id,
    },
  });
  res.status(200).json(deletedCategory)
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
