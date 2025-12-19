import express from 'express';
import {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';

const router = express.Router();

router.route('/')
  .get(getCertificates)
  .post(createCertificate);

router.route('/:id')
  .get(getCertificateById)
  .put(updateCertificate)
  .delete(deleteCertificate);

export default router;
