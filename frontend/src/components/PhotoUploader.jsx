import React, { useState, useRef } from 'react';

export function PhotoUploader({
  photos = [],
  onUploadFiles,
  onRemovePhoto,
  onReorderPhotos,
  onUpdateCaption,
  uploading = false,
  uploadError = null
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  const validateAndProcess = (fileList) => {
    const validFiles = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (validTypes.includes(file.type)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      onUploadFiles(validFiles);
    }
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;
    const reordered = [...photos];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    onReorderPhotos(reordered);
  };

  return (
    <div className="photo-uploader-2-container">
      {/* Drop Zone */}
      <div
        className={`photo-drop-zone ${isDragOver ? 'drag-over' : ''} ${uploading ? 'uploading-state' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload photos by drag and drop or clicking"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
          disabled={uploading}
        />

        <div className="drop-zone-content">
          <div className="drop-zone-icon">
            {uploading ? <span className="upload-spinner-icon">⏳</span> : '📸'}
          </div>
          <p className="drop-zone-title">
            {uploading ? 'Uploading memories to secure cloud...' : 'Drag & drop photos or click to browse'}
          </p>
          <span className="drop-zone-sub">Supports JPG, PNG, and WebP (up to 10MB each)</span>
        </div>
      </div>

      {uploadError && (
        <div className="upload-error-alert" role="alert">
          <span>⚠️ {uploadError}</span>
        </div>
      )}

      {/* Thumbnails list with Reorder, Captions, Delete */}
      {photos.length > 0 && (
        <div className="photos-managed-list">
          <div className="photos-list-header">
            <span className="photos-count-badge">
              📸 {photos.length} {photos.length === 1 ? 'Memory' : 'Memories'} Added
            </span>
            <span className="photos-drag-hint">Arrange in order of appearance</span>
          </div>

          <div className="photos-grid-editor">
            {photos.map((photo, idx) => {
              const url = typeof photo === 'string' ? photo : photo.url;
              const status = typeof photo === 'object' ? photo.status : 'ready';
              const caption = typeof photo === 'object' ? photo.caption || '' : '';

              return (
                <div key={idx} className="photo-card-editor">
                  <div className="photo-thumb-wrapper">
                    <img src={url} alt={`Memory ${idx + 1}`} className="photo-thumb-img" />

                    <span className="photo-order-tag">#{idx + 1}</span>

                    {/* Status Badge */}
                    {status === 'uploading' && (
                      <div className="thumb-status-overlay uploading">
                        <span className="mini-spin">⏳</span> Uploading
                      </div>
                    )}
                    {status === 'ready' && (
                      <div className="thumb-status-overlay ready">
                        ✓ Ready
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="thumb-status-overlay error">
                        ⚠️ Failed
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="photo-overlay-actions">
                      <button
                        type="button"
                        className="photo-action-btn"
                        onClick={(e) => { e.stopPropagation(); handleMove(idx, -1); }}
                        disabled={idx === 0}
                        title="Move left / earlier"
                        aria-label="Move photo earlier"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        className="photo-action-btn"
                        onClick={(e) => { e.stopPropagation(); handleMove(idx, 1); }}
                        disabled={idx === photos.length - 1}
                        title="Move right / later"
                        aria-label="Move photo later"
                      >
                        →
                      </button>
                      <button
                        type="button"
                        className="photo-action-btn delete"
                        onClick={(e) => { e.stopPropagation(); onRemovePhoto(idx); }}
                        title="Remove photo"
                        aria-label="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Optional Caption Field */}
                  <div className="photo-caption-input-wrap">
                    <input
                      type="text"
                      className="form-input form-input-xs photo-caption-input"
                      placeholder="Add a memory caption..."
                      value={caption}
                      maxLength={80}
                      onChange={(e) => onUpdateCaption(idx, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoUploader;
