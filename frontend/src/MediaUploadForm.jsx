import React, { useState } from 'react';
import { apiRequest } from './api';

export default function MediaUploadForm({ onUpload }) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', caption);
      // Adjust endpoint as needed for your backend
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4002'}/api/posts/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      setSuccess('Upload successful!');
      setCaption('');
      setFile(null);
      if (onUpload) onUpload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '2rem 0', padding: 16, background: '#222', borderRadius: 12, color: '#fff', maxWidth: 400 }}>
      <h2 style={{ marginBottom: 12 }}>Upload Test Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: 12 }}
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: 'none' }}
      />
      <button type="submit" disabled={loading} style={{ padding: 10, background: '#00ffe7', color: '#222', fontWeight: 600, borderRadius: 6 }}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: 'lime', marginTop: 10 }}>{success}</div>}
    </form>
  );
}
