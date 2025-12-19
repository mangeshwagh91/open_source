import Contact from '../models/Contact.js';

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Public
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single contact message
// @route   GET /api/contacts/:id
// @access  Public
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ 
      message: 'Contact message sent successfully',
      data: contact 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contacts/:id
// @access  Public
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Public
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
