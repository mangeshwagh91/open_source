import Contact from '../models/Contact.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private (Admin only)
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// @desc    Get single contact message
// @route   GET /api/contacts/:id
// @access  Private (Admin only)
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact message not found' });
  }

  res.json(contact);
});

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    message: 'Contact message sent successfully',
    data: contact
  });
});

// @desc    Update contact message status
// @route   PUT /api/contacts/:id
// @access  Private (Admin only)
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({ message: 'Contact message not found' });
  }

  res.json(contact);
});

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private (Admin only)
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact message not found' });
  }

  res.json({ message: 'Contact message deleted successfully' });
});
