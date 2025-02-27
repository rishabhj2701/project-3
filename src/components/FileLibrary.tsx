import React, { useState } from 'react';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
  tags: string[];
}

const mockFiles: File[] = [
  {
    id: "DOC-001",
    name: "Emergency Response Plan 2024.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Admin Team",
    uploadDate: "2024-01-15",
    category: "Plans & Procedures",
    tags: ["emergency", "response", "protocol"]
  },
  {
    id: "DOC-002",
    name: "Evacuation Routes Map.jpg",
    type: "Image",
    size: "1.8 MB",
    uploadedBy: "Planning Team",
    uploadDate: "2024-01-18",
    category: "Maps",
    tags: ["evacuation", "routes", "map"]
  },
  {
    id: "DOC-003",
    name: "Incident Report Template.docx",
    type: "Document",
    size: "156 KB",
    uploadedBy: "Operations",
    uploadDate: "2024-01-19",
    category: "Templates",
    tags: ["incident", "report", "template"]
  }
];

export default function FileLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(mockFiles.map(file => file.category))];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-semibold">File Library</h2>
          <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
            Upload File
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search files..."
                className="w-full px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4">
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {file.type === 'PDF' ? '📄' :
                       file.type === 'Image' ? '🖼️' :
                       file.type === 'Document' ? '📝' : '📁'}
                    </span>
                    <div>
                      <h3 className="font-semibold">{file.name}</h3>
                      <p className="text-sm text-gray-600">
                        {file.size} • Uploaded on {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">
                      Download
                    </button>
                    <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">
                      Share
                    </button>
                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}