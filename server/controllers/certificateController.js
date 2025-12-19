import Certificate from '../models/Certificate.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Public
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Public
export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Public
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Public
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
