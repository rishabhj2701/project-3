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
  const [files, setFiles] = useState(mockFiles);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  const [uploadFormData, setUploadFormData] = useState({
    name: '',
    type: 'Document',
    category: 'General',
    tags: ''
  });

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(files.map(file => file.category))];

  const handleDownload = (file: File) => {
    // In a real app, this would trigger a file download
    alert(`Downloading ${file.name}...`);
  };

  const handleShare = (file: File) => {
    setSelectedFile(file);
    setIsShareModalOpen(true);
  };

  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };

  const handleShareSubmit = () => {
    if (shareEmail && selectedFile) {
      // In a real app, this would send a sharing invitation
      alert(`Shared ${selectedFile.name} with ${shareEmail}`);
      setIsShareModalOpen(false);
      setShareEmail('');
    }
  };

  const handleUploadInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUploadFormData({
      ...uploadFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleUploadSubmit = () => {
    // Create a new file object
    const newFile: File = {
      id: `DOC-00${files.length + 1}`,
      name: uploadFormData.name,
      type: uploadFormData.type,
      size: "1.2 MB", // Mock size
      uploadedBy: "Current User",
      uploadDate: new Date().toISOString().slice(0, 10),
      category: uploadFormData.category,
      tags: uploadFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    setFiles([...files, newFile]);
    setIsUploadModalOpen(false);
    
    // Reset form
    setUploadFormData({
      name: '',
      type: 'Document',
      category: 'General',
      tags: ''
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-xl font-semibold">File Library</h2>
          <button 
            className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
            onClick={() => setIsUploadModalOpen(true)}
          >
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
                    <button 
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      onClick={() => handleDownload(file)}
                    >
                      Download
                    </button>
                    <button 
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      onClick={() => handleShare(file)}
                    >
                      Share
                    </button>
                    <button 
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                      onClick={() => handleDelete(file.id)}
                    >
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

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upload File</h2>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsUploadModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">File Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={uploadFormData.name} 
                  onChange={handleUploadInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">File Type</label>
                <select 
                  name="type" 
                  value={uploadFormData.type} 
                  onChange={handleUploadInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="Document">Document</option>
                  <option value="PDF">PDF</option>
                  <option value="Image">Image</option>
                  <option value="Spreadsheet">Spreadsheet</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select 
                  name="category" 
                  value={uploadFormData.category} 
                  onChange={handleUploadInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="General">General</option>
                  <option value="Plans & Procedures">Plans & Procedures</option>
                  <option value="Maps">Maps</option>
                  <option value="Templates">Templates</option>
                  <option value="Reports">Reports</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={uploadFormData.tags} 
                  onChange={handleUploadInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="emergency, response, etc."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">Drag and drop a file here, or click to select</p>
                  <button className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                    Select File
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleUploadSubmit}
                  disabled={!uploadFormData.name}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share File Modal */}
      {isShareModalOpen && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">Share File</h2>
              <button 
                className="text-white hover:text-gray-200"
                onClick={() => setIsShareModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">File</p>
                <p className="font-semibold">{selectedFile.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Share with (email)</label>
                <input 
                  type="email" 
                  value={shareEmail} 
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleShareSubmit}
                  disabled={!shareEmail}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}