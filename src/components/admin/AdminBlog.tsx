/**
 * Admin Blog Component - Stub
 */

export function AdminBlog() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <a href="/admin/blog/new" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Create New Post
        </a>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Blog posts list will be displayed here.</p>
        <p className="text-sm text-gray-500 mt-2">This component will consume the /api/blog/posts endpoint.</p>
      </div>
    </div>
  );
}

export function AdminBlogEdit() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Blog post editor with Tiptap WYSIWYG will be displayed here.</p>
      </div>
    </div>
  );
}
