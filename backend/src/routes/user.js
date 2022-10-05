import { Router } from 'express';
import UserService from '../services/userService';

const router = new Router();
const userService = new UserService()

router.get("/", async (req, res) => {
  const result = await userService.findAll();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await userService.findById(req.params.id);
  res.json(result);
});

router.post("/", async (req, res) => {
  const result = await userService.createUser(req.body);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const result = await userService.update(req.params.id, req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await userService.remove(req.params.id);
  res.json(result);
});

export default router;