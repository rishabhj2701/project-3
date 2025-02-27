import React, { useState } from 'react';
import FileLibrary from './FileLibrary';
import ResourceRequests from './ResourceRequests';

interface Event {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  location: string;
  startDate: string;
  description: string;
  assignedTeams: string[];
}

const mockEvents: Event[] = [
  {
    id: "EV-001",
    title: "Downtown Flooding",
    type: "Natural Disaster",
    status: "Active",
    priority: "Critical",
    location: "Downtown, Main Street Area",
    startDate: "2024-01-18 06:30:00",
    description: "Flooding in downtown area affecting 3 city blocks. Multiple businesses and residences impacted.",
    assignedTeams: ["Fire Department", "Police Department", "Public Works"]
  },
  {
    id: "EV-002",
    title: "Highway 101 Traffic Accident",
    type: "Traffic Incident",
    status: "Active",
    priority: "High",
    location: "Highway 101, Mile Marker 35",
    startDate: "2024-01-20 14:15:00",
    description: "Multi-vehicle collision on Highway 101. Two lanes blocked, emergency services on scene.",
    assignedTeams: ["Police Department", "Emergency Medical Services"]
  },
  {
    id: "EV-003",
    title: "Community Center Power Outage",
    type: "Infrastructure",
    status: "Resolved",
    priority: "Medium",
    location: "Westside Community Center",
    startDate: "2024-01-17 10:00:00",
    description: "Power outage affecting community center and surrounding buildings. Backup generators activated.",
    assignedTeams: ["Utility Company", "Facilities Management"]
  }
];

export default function EventsDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Event | null>(null);
  const [newEventData, setNewEventData] = useState<Event>({
    id: `EV-00${events.length + 1}`,
    title: "",
    type: "",
    status: "Active",
    priority: "Medium",
    location: "",
    startDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
    description: "",
    assignedTeams: []
  });
  const [newTeamInput, setNewTeamInput] = useState("");

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setEditFormData({...event});
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = () => {
    if (editFormData && selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? editFormData : event
      );
      setEvents(updatedEvents);
      setIsEditModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleNewEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewEventData({
      ...newEventData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTeam = () => {
    if (newTeamInput.trim() !== "") {
      setNewEventData({
        ...newEventData,
        assignedTeams: [...newEventData.assignedTeams, newTeamInput.trim()]
      });
      setNewTeamInput("");
    }
  };

  const handleRemoveTeam = (teamToRemove: string) => {
    setNewEventData({
      ...newEventData,
      assignedTeams: newEventData.assignedTeams.filter(team => team !== teamToRemove)
    });
  };

  const handleCreateEvent = () => {
    setEvents([...events, newEventData]);
    setIsNewEventModalOpen(false);
    // Reset form for next time
    setNewEventData({
      id: `EV-00${events.length + 2}`, // Increment for next potential event
      title: "",
      type: "",
      status: "Active",
      priority: "Medium",
      location: "",
      startDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      description: "",
      assignedTeams: []
    });
  };

  const handleCloseEvent = (eventId: string) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? {...event, status: 'Resolved'} : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Significant Events Dashboard</h1>
        </div>
      </header>
      
      <nav className="bg-blue-800 text-white">
        <div className="container mx-auto">
          <ul className="flex">
            <li>
              <button 
                className={`px-4 py-3 ${activeTab === 'events' ? 'bg-blue-600' : ''} hover:bg-blue-600`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
            </li>
            <li>
              <button 
                className={`px-4 py-3 ${activeTab === 'resources' ? 'bg-blue-600' : ''} hover:bg-blue-600`}
                onClick={() => setActiveTab('resources')}
              >
                Resource Requests
              </button>
            </li>
            <li>
              <button 
                className={`px-4 py-3 ${activeTab === 'files' ? 'bg-blue-600' : ''} hover:bg-blue-600`}
                onClick={() => setActiveTab('files')}
              >
                File Library
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <main className="container mx-auto py-6">
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow">
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
              <h2 className="text-xl font-semibold">Active Events</h2>
              <button 
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
                onClick={() => setIsNewEventModalOpen(true)}
              >
                New Event
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid gap-4">
                {events.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">Event ID: {event.id}</p>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          event.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                          event.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          event.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p>{event.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p>{event.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p>{event.startDate}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Assigned Teams</p>
                      <div className="flex flex-wrap gap-2">
                        {event.assignedTeams.map((team, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            {team}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleViewEvent(event)}
                      >
                        View Details
                      </button>
                      <button 
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </button>
                      {event.status === 'Active' && (
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => handleCloseEvent(event.id)}
                        >
                          Close Event
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'resources' && <ResourceRequests />}
        {activeTab === 'files' && <FileLibrary />}
      </main>
      
      {/* View Event Modal */}
      {isViewModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Event Details</h2>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsViewModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Event ID</p>
                  <p className="font-semibold">{selectedEvent.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-semibold ${
                    selectedEvent.status === 'Active' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {selectedEvent.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-semibold">{selectedEvent.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p>{selectedEvent.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="font-semibold">{selectedEvent.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p>{selectedEvent.startDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Location</p>
                  <p>{selectedEvent.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Description</p>
                  <p>{selectedEvent.description}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Assigned Teams</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedEvent.assignedTeams.map((team, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditEvent(selectedEvent);
                  }}
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Event Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Event</h2>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsEditModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Event ID</label>
                  <input 
                    type="text" 
                    name="id" 
                    value={editFormData.id} 
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Status</label>
                  <select 
                    name="status" 
                    value={editFormData.status} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={editFormData.title} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Type</label>
                  <input 
                    type="text" 
                    name="type" 
                    value={editFormData.type} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Priority</label>
                  <select 
                    name="priority" 
                    value={editFormData.priority} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input 
                    type="text" 
                    name="startDate" 
                    value={editFormData.startDate} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={editFormData.location} 
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={editFormData.description} 
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleUpdateEvent}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {isNewEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New Event</h2>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsNewEventModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Event ID</label>
                  <input 
                    type="text" 
                    name="id" 
                    value={newEventData.id} 
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Status</label>
                  <select 
                    name="status" 
                    value={newEventData.status} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={newEventData.title} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Type</label>
                  <input 
                    type="text" 
                    name="type" 
                    value={newEventData.type} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Priority</label>
                  <select 
                    name="priority" 
                    value={newEventData.priority} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input 
                    type="text" 
                    name="startDate" 
                    value={newEventData.startDate} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={newEventData.location} 
                    onChange={handleNewEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={newEventData.description} 
                    onChange={handleNewEventInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Assigned Teams</label>
                  <div className="flex mb-2">
                    <input 
                      type="text" 
                      value={newTeamInput} 
                      onChange={(e) => setNewTeamInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l"
                      placeholder="Add a team"
                    />
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                      onClick={handleAddTeam}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newEventData.assignedTeams.map((team, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center">
                        {team}
                        <button 
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveTeam(team)}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsNewEventModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleCreateEvent}
                  disabled={!newEventData.title || !newEventData.type || !newEventData.location}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}