import React from 'react';

/**
 * Top Editor Toolbar for Anniversary Template 3
 */
export function EditorControlBar({
  isEditMode,
  onToggleEditMode,
  onOpenAddSection,
  onOpenReorder,
  onResetDefault,
  onSaveDraft,
  saveSuccess
}) {
  return (
    <aside className="tpl3-editor-control-bar" aria-label="Template customization controls">
      <div className="editor-bar-inner">
        {/* Mode Switcher Pill */}
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${!isEditMode ? 'active' : ''}`}
            onClick={() => onToggleEditMode(false)}
            title="Preview how your recipient will experience the page"
          >
            👁️ Preview Mode
          </button>
          <button
            type="button"
            className={`mode-btn ${isEditMode ? 'active' : ''}`}
            onClick={() => onToggleEditMode(true)}
            title="Edit all text, photos, reorder, delete or add sections"
          >
            ✏️ Editor Mode
          </button>
        </div>

        {/* Action Controls when in Edit Mode */}
        {isEditMode && (
          <div className="editor-actions-group">
            <button
              type="button"
              className="btn-editor-action btn-add-sec"
              onClick={onOpenAddSection}
            >
              + Add Section
            </button>

            <button
              type="button"
              className="btn-editor-action"
              onClick={onOpenReorder}
              title="Drag or reorder your anniversary chapters"
            >
              🔀 Reorder
            </button>

            <button
              type="button"
              className="btn-editor-action"
              onClick={onResetDefault}
              title="Reset all sections to starting template defaults"
            >
              ↺ Reset
            </button>

            <button
              type="button"
              className="btn-editor-action btn-save-primary"
              onClick={onSaveDraft}
            >
              {saveSuccess ? "Saved! ✨" : "💾 Save"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default EditorControlBar;
