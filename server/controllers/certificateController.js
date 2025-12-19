import Certificate from '../models/Certificate.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all certificates with pagination, filtering, sorting
// @route   GET /api/certificates
// @access  Public
export const getCertificates = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || '-createdAt';
  const { type, search } = req.query;

  let query = {};

  if (type) query.type = type;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { recipient: { $regex: search, $options: 'i' } }
    ];
  }

  const certificates = await Certificate.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Certificate.countDocuments(query);

  res.json({
    certificates,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalCertificates: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public
export const getCertificateById = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }

  res.json(certificate);
});

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Private (Admin only)
export const createCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json(certificate);
});

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin only)
export const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }

  res.json(certificate);
});

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin only)
export const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);

  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }

  res.json({ message: 'Certificate deleted successfully' });
});
