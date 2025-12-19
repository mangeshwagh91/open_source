import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { contactSchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getContacts)
  .post(validate(contactSchema), createContact);

router.route('/:id')
  .get(protect, authorize('admin'), validate(contactSchema), getContactById)
  .put(protect, authorize('admin'), validate(contactSchema), updateContact)
  .delete(protect, authorize('admin'), validate(contactSchema), deleteContact);

export default router;
