const { Router } = require('express');
const UserService = require('../services/userService');

const router = new Router();
const userService = new UserService();

router.get('/', async (req, res) => {
  const result = await userService.getAll();
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await userService.getById(req.params.id);
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await userService.createUser(req.body);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.json(result);
});

module.exports = router;
