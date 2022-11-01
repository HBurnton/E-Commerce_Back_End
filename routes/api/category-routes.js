const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

//CATEGORIES GET ALL ROUTE
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

//CATEGORIES GET ONE ROUTE
router.get('/:id', async (req, res) => {
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

//CATEGORIES POST ROUTE
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
});

//CATEGORIES UPDATE ROUTE
router.put('/:id', async (req, res) => {
  try{
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
        id: req.params.id,
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

//CATEGORIES DELETE ROUTE
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
});

module.exports = router;
