const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
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
      include: [{model: Product}]
    });
    if(categoryData){
      res.status(200).json(categoryData);
      return;
    }
    res.status(404).json('Category not found.')

  }catch(err){
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
  if(updatedCategory){
    res.status(200).json(updatedCategory);
    return;
  }
  res.status(404).json('Category id not found.')
  }catch(err){
    res.status(500).json(err)
  }

});

router.delete('/:id', async (req, res) => {
try{
  const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
  });
  if(category){
    await category.destroy();
    res.status(200).json(category);
    return;
  }
  res.status(404).json('Category with id not found.')
}catch(err){
  res.status(500).json(err)
}

 /*
  // delete a category by its `id` value
  try{
  const deletedCategory = await Category.destroy({
    where:{
      id: req.params.id,
    },
  });
  if(deletedCategory){
    res.status(200).json(deletedCategory);
    return;
  }
  res.status(404).json('Category with this id does not exist;')
  }catch(err){
    res.status(500).json(err)
  }*/
});

module.exports = router;
