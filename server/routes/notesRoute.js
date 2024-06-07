import { Router } from "express";
import noteController from "../controllers/noteController.js";

const router = Router();

// Note Routes
router.get("/allNotes", noteController.get_all_notes);
router.post("/addNote", noteController.add_note);
router.get("/noteDetails/:id", noteController.get_one_note);
router.patch("/updateNote/:id", noteController.update_note);
router.delete("/deleteNote/:id", noteController.delete_note);

export default router;
