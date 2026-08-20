/**
 * Admin Services Component - Stub
 */


export function AdminServices() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <a href="/admin/services/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Service
        </a>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Services list will be displayed here.</p>
        <p className="text-sm text-gray-500 mt-2">This component will consume the /api/services endpoint.</p>
      </div>
    </div>
  );
}

export function AdminServiceEdit() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Service edit form will be displayed here.</p>
      </div>
    </div>
  );
}
