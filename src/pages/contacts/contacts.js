import React, { useState, useEffect } from 'react';
import { FaFilter, FaFileImport, FaFileExport } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import './contact.css';

function Contact() {

  const [contacts, setContacts] = useState([]);
  const [sortBy, setSortBy] = useState('Last Updated'); // State to manage sorting option
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newSegment, setNewSegment] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://whatsappbotserver.azurewebsites.net/get-contacts/');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        // Map over the data and extract phone number and name
        const extractedContacts = data.map(([phoneNumber, , name]) => ({ phoneNumber, name }));
        setContacts(extractedContacts || []); // Ensure contacts array is set, even if empty
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Handle error (e.g., display error message to user)
      }
    };
  
    fetchContacts();
  }, []);
  

  const handleAddContact = () => {
    // Add logic here to handle adding a contact
    console.log("Add contact button clicked");
  };
  const handleSortChange = (option) => {
    setSortBy(option);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Add logic here to handle search
    console.log("Search submitted:", searchQuery);
  };

  const handleFilterButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleAddSegment = () => {
    // Add logic here to handle adding new segment
    console.log("Add new segment clicked");
  };

  const handleImport = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (evt) => {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Handle the imported Excel data, you can process it or update state
        console.log('Imported Excel data:', excelData);
      };

      reader.readAsBinaryString(file);
    };

    fileInput.click();
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Basic Info', 'Contact Attributes', 'Created Date', 'Broadcast', 'SMS', 'Edit/Delete'],
      ...contacts.map((contact) => [
        contact.basicInfo,
        contact.contactAttributes,
        contact.createdDate,
        '', // Broadcast
        '', // SMS
        '', // Edit/Delete
      ]),
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    XLSX.writeFile(workbook, 'contacts.xlsx');
  };
  



  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Contacts</h2>
          <button className="add-contact-btn" onClick={handleAddContact}>+ Add Contact</button>
        </div>
        <p>Contact list stores the list of numbers that you've interacted with. You can even manually export or import contacts.</p>
      </div>
      <div className="sorting-section">
        <label htmlFor="sort">Sorted by:</label>
        <select id="sort" value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="Last Updated">Last Updated</option>
          <option value="Name">Name</option>
          <option value="Created Date">Created Date</option>
        </select>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <button className="filter-button" onClick={handleFilterButtonClick}><FaFilter /></button>
        {isFormOpen && (
          <form className="segment-form">
            <input
              type="text"
              placeholder="Add new segment..."
              value={newSegment}
              onChange={(e) => setNewSegment(e.target.value)}
            />
            <button onClick={handleAddSegment}>+ Add New Segment</button>
            <button onClick={handleFormClose}>Close</button>
          </form>
        )}
        <div className="import-export">
        <button className="import-btn" onClick={handleImport}><FaFileImport /> Import</button>
          {/* Export button */}
          <button className="export-btn" onClick={handleExport}><FaFileExport /> Export</button>
          </div>
      </div>
      <div className="table-container">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Basic Info</th>
              <th>Contact Attributes</th>
              <th>Created Date</th>
              <th>Broadcast</th>
              <th>SMS</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>Phone Number: {contact.phoneNumber}</td>
                <td>{contact.createdDate}</td>
                <td>{/* Display Broadcast */}</td>
                <td>{/* Display SMS */}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contact;
