import React from 'react';

interface ResourceRequest {
  id: string;
  requestType: string;
  status: string;
  priority: string;
  requestedBy: string;
  department: string;
  dateRequested: string;
  items: string[];
  notes: string;
}

const mockRequests: ResourceRequest[] = [
  {
    id: "RR-001",
    requestType: "Emergency Supplies",
    status: "Pending",
    priority: "High",
    requestedBy: "John Smith",
    department: "Fire Department",
    dateRequested: "2024-01-20 08:30:00",
    items: ["Water bottles (100 cases)", "Emergency blankets (50)", "First aid kits (20)"],
    notes: "Needed for evacuation center setup"
  },
  {
    id: "RR-002",
    requestType: "Personnel",
    status: "Approved",
    priority: "Critical",
    requestedBy: "Sarah Johnson",
    department: "Police Department",
    dateRequested: "2024-01-19 15:45:00",
    items: ["Emergency response team (5 members)", "K-9 unit (2 teams)"],
    notes: "Required for search and rescue operation"
  }
];

export default function ResourceRequests() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-semibold">Resource Requests</h2>
          <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
            New Request
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid gap-4">
            {mockRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{request.requestType}</h3>
                    <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                      request.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Requested By</p>
                    <p>{request.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p>{request.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date Requested</p>
                    <p>{request.dateRequested}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Requested Items</p>
                  <ul className="list-disc list-inside">
                    {request.items.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}