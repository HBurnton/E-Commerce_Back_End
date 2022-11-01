const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// FINDS AND RETURNS ALL TAGS ALONG WITH ASSOCIATED PRODUCT DATA
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
      }
    });
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err);
  }
});

// RETURN A SINGLE TAG BY ITS ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]
    })

    if (tag) {
      res.status(200).json(tag);
      return;
    }
    res.status(404).json('Tag with specified ID not found.')

  } catch (err) {
    res.status(500).json(err)

  }
});

// CREATE A NEW TAG ROUTE
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag)

  } catch (err) {
    res.status(500).json(err)
  }
});

// UPDATES A TAG'S NAME
router.put('/:id', async (req, res) => {
  try {
    let updatedTagName = await Tag.update({
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: req.params.id
      }
    })

    if (updatedTagName) {
      res.status(200).json(updatedTagName);
      return;
    }
    res.status(404).json('No tag with that id exists.')
  }
  catch (err) {
    res.status(500).json(err)
  }

});

// DELETE TAG BY ITS ID
router.delete('/:id', (req, res) => {
  try{
    const deletedTag = Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    if(deletedTag){
      res.status(200).json(deletedTag);
      return;
    }
    res.status(404).json('No Tag with that id exists')

  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
