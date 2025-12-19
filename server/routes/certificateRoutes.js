import express from 'express';
import {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { certificateSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(validate(querySchema), getCertificates)
  .post(protect, authorize('admin'), validate(certificateSchema), createCertificate);

router.route('/:id')
  .get(validate(certificateSchema), getCertificateById)
  .put(protect, authorize('admin'), validate(certificateSchema), updateCertificate)
  .delete(protect, authorize('admin'), validate(certificateSchema), deleteCertificate);

export default router;
