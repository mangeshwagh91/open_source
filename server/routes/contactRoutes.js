import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

export default router;
