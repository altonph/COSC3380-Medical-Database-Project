import React, { useState } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ViewStaff = () => {
  // Sample staff data
  const [staffData, setStaffData] = useState([
    {
      staffId: '101',
      officeId: '001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      dateOfBirth: '1990-01-01',
      address: '123 Main St, City, Country',
      position: 'Dentist',
      startDate: '2022-01-01',
      endDate: '',
      isActive: true,
      salary: '$60,000',
      username: 'john_doe',
      password: 'johndoe123'
    },
    {
      staffId: '102',
      officeId: '002',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '123-456-7890',
      dateOfBirth: '1990-01-01',
      address: '123 Main St, City, Country',
      position: 'Hygienist',
      startDate: '2022-01-01',
      endDate: '',
      isActive: false,
      salary: '$55,000',
      username: 'jane_doe',
      password: 'janedoe123'
    },
    // Add more staff data as needed
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedStaff, setEditedStaff] = useState(null);

  const handleEditClick = (staffId) => {
    const staffToEdit = staffData.find(staff => staff.staffId === staffId);
    setEditedStaff(staffToEdit);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStaff({
      ...editedStaff,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    const index = staffData.findIndex(staff => staff.staffId === editedStaff.staffId);
    const updatedStaffData = [...staffData];
    updatedStaffData[index] = editedStaff;
    setStaffData(updatedStaffData);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex h-screen flex-col">
        <nav>
          <Header />
        </nav>

        <div className="flex flex-1">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                <li><a href="/admin/staff" className="block py-2 text-center font-bold underline">Staff</a></li>
                <li><a href="/admin/data-reports" className="block py-2 text-center text-gray-600 hover:text-black">Data Reports</a></li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4">View Staff</h1>
            {staffData.map(staff => (
              <div key={staff.staffId} className="bg-gray-100 p-6 rounded-lg mb-4">
                {isEditing && editedStaff && editedStaff.staffId === staff.staffId ? (
                  <>
                    <label className="block mb-2">Staff ID:</label>
                    <input
                      type="text"
                      name="staffId"
                      value={editedStaff.staffId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Office ID:</label>
                    <input
                      type="text"
                      name="officeId"
                      value={editedStaff.officeId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editedStaff.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editedStaff.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editedStaff.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Phone Number:</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editedStaff.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Date of Birth:</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editedStaff.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={editedStaff.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Position:</label>
                    <select
                      name="position"
                      value={editedStaff.position}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    >
                      <option value="Dentist">Dentist</option>
                      <option value="Hygienist">Hygienist</option>
                      <option value="Receptionist">Receptionist</option>
                    </select>

                    <label className="block mb-2">Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      value={editedStaff.startDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      value={editedStaff.endDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Is Active:</label>
                    <select
                      name="isActive"
                      value={editedStaff.isActive}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>

                    <label className="block mb-2">Salary:</label>
                    <input
                      type="text"
                      name="salary"
                      value={editedStaff.salary}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={editedStaff.username}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <label className="block mb-2">Password:</label>
                    <input
                      type="text"
                      name="password"
                      value={editedStaff.password}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-2"
                    />

                    <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2 mt-4">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mt-4">Cancel</button>
                  </>
                ) : (
                  <>
                    <p><span className="font-semibold">Office ID:</span> {staff.officeId}</p>
                    <p><span className="font-semibold">First Name:</span> {staff.firstName}</p>
                    <p><span className="font-semibold">Last Name:</span> {staff.lastName}</p>
                    <p><span className="font-semibold">Email:</span> {staff.email}</p>
                    <p><span className="font-semibold">Phone number:</span> {staff.phoneNumber}</p>
                    <p><span className="font-semibold">Date of birth:</span> {staff.dateOfBirth}</p>
                    <p><span className="font-semibold">Address:</span> {staff.address}</p>
                    <p><span className="font-semibold">Position:</span> {staff.position}</p>
                    <p><span className="font-semibold">Start date:</span> {staff.startDate}</p>
                    <p><span className="font-semibold">End date:</span> {staff.endDate}</p>
                    <p><span className="font-semibold">Is active:</span> {staff.isActive}</p>
                    <p><span className="font-semibold">Salary:</span> {staff.salary}</p>
                    <p><span className="font-semibold">Username:</span> {staff.username}</p>

                    <div>
                      <button onClick={() => handleEditClick(staff.staffId)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2 mt-4">Edit</button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4">Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </main>
        </div>

        <nav>
          <Footer/>
        </nav>
      </div>
    </>
  );
};

export default ViewStaff;
