import React, { useEffect, useState } from 'react';
import { fetchPosts } from './api';



function getMediaType(url) {
  if (!url) return 'unknown';
  const ext = url.split('.').pop().toLowerCase();
  if (["mp4", "webm", "ogg"].includes(ext)) return 'video';
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(ext)) return 'image';
  return 'unknown';
}


// Flat media canvas UI

const MEDIA_BASE_URL = 'http://localhost:4002/api';

function getFullMediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return MEDIA_BASE_URL + url;
}

export default function MediaRoom() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'radial-gradient(ellipse at center, #222 0%, #111 100%)', padding: '32px 0', position: 'relative' }}>
      {error && <div style={{ position: 'absolute', top: 20, left: 20, color: 'red', zIndex: 10 }}>{error}</div>}
      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(20,20,30,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.4s' }} onClick={() => setSelected(null)}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          `}</style>
          <div style={{ background: '#222', borderRadius: 0, padding: 0, boxShadow: 'none', minWidth: 480, maxWidth: 900, width: '80vw', maxHeight: '90vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }} onClick={e => e.stopPropagation()}>
            {/* Top bar: username, close button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 0 24px' }}>
              <div style={{ color: '#fff', fontSize: 15, fontWeight: 500, background: 'rgba(0,0,0,0.45)', padding: '2px 10px', borderRadius: 4 }}>{selected.userId || 'user'}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#00ffe7', fontWeight: 600, fontSize: 18, cursor: 'pointer', padding: '4px 12px' }}>✕</button>
            </div>
            {/* Media large and centered */}
            <div style={{ width: '100%', flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0', padding: '24px 0 0 0', position: 'relative' }}>
              {getMediaType(selected.imageUrl) === 'image' && (
                <img src={getFullMediaUrl(selected.imageUrl)} alt={selected.caption} style={{ maxWidth: '90%', maxHeight: '60vh', objectFit: 'contain', background: '#181c22', border: 'none', margin: 0, padding: 0 }} />
              )}
              {getMediaType(selected.imageUrl) === 'video' && (
                <video src={getFullMediaUrl(selected.imageUrl)} controls style={{ maxWidth: '90%', maxHeight: '60vh', objectFit: 'contain', background: '#181c22', border: 'none', margin: 0, padding: 0 }} />
              )}
              {/* Like and bookmark icons overlay, right side */}
              <div style={{ position: 'absolute', right: 38, bottom: 38, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', zIndex: 2 }}>
                <span title="Like" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', borderRadius: '50%', cursor: 'pointer' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff0055"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </span>
                <span title="Save" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', borderRadius: '50%', cursor: 'pointer' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffd700"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </span>
              </div>
            </div>
            {/* Caption and date below media */}
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 18, textShadow: '0 0 8px #00ffe7', background: 'rgba(0,0,0,0.35)', borderRadius: 0, padding: '8px 18px', margin: '0 24px', marginTop: 18, maxWidth: '90%' }}>
              {selected.caption}
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 2 }}>{selected.createdAt && new Date(selected.createdAt).toLocaleString()}</div>
            </div>
            {/* Comment input and display area */}
            <div style={{ margin: '24px 24px 18px 24px', background: 'rgba(0,0,0,0.25)', borderRadius: 0, padding: '12px 18px', maxWidth: '90%' }}>
              <div style={{ color: '#00ffe7', fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Comments</div>
              {/* Comments list placeholder */}
              <div style={{ marginBottom: 12, minHeight: 32, color: '#fff', fontSize: 14, opacity: 0.7 }}>[No comments yet]</div>
              <form style={{ display: 'flex', gap: 8 }} onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Add a comment..." style={{ flex: 1, padding: '8px 12px', border: 'none', borderRadius: 0, background: '#181c22', color: '#fff', fontSize: 14 }} />
                <button type="submit" style={{ background: '#00ffe7', color: '#222', border: 'none', borderRadius: 0, fontWeight: 600, padding: '8px 16px', cursor: 'pointer' }}>Post</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {posts.map((post, i) => {
          const mediaType = getMediaType(post.imageUrl);
          return (
            <div
              key={post._id || i}
              style={{ position: 'relative', background: '#181c22', border: 'none', cursor: 'pointer', overflow: 'hidden', minHeight: 220, minWidth: 220, aspectRatio: '3/4', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
              onClick={() => setSelected(post)}
            >
              {/* Media fills card */}
              {mediaType === 'image' && post.imageUrl && (
                <img src={getFullMediaUrl(post.imageUrl)} alt={post.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none', margin: 0, padding: 0 }} />
              )}
              {mediaType === 'video' && post.imageUrl && (
                <video src={getFullMediaUrl(post.imageUrl)} controls style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none', margin: 0, padding: 0 }} />
              )}
              {/* Username top-left */}
              <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 13, fontWeight: 500, borderRadius: 0, padding: '2px 8px', zIndex: 2, letterSpacing: 0.2 }}>{post.userId || 'user'}</div>
              {/* Icons bottom-right vertical stack */}
              <div style={{ position: 'absolute', bottom: 12, right: 10, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', zIndex: 2 }}>
                <span title="Like" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', borderRadius: '50%', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0055"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </span>
                <span title="Comment" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', borderRadius: '50%', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00ffe7"><path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v9A2.5 2.5 0 0 0 5.5 18H6v3l3-3h9.5A2.5 2.5 0 0 0 21 15.5v-9z"/></svg>
                </span>
                <span title="Save" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', borderRadius: '50%', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd700"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </span>
              </div>
              {/* Caption and date overlay (bottom left) */}
              <div style={{ position: 'absolute', left: 10, bottom: 12, color: '#fff', fontWeight: 600, fontSize: 16, textShadow: '0 0 8px #00ffe7', background: 'rgba(0,0,0,0.35)', borderRadius: 0, padding: '4px 10px', maxWidth: '70%', zIndex: 2 }}>
                {post.caption}
                <div style={{ color: '#aaa', fontSize: 11, marginTop: 2 }}>{post.createdAt && new Date(post.createdAt).toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
