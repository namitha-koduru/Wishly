import React, { useState, useEffect } from 'react';
import DEFAULT_DATA, { DEFAULT_PAGES } from './data/defaultData.js';
import AmbientBackground from './components/AmbientBackground.jsx';
import AudioAmbiance from './components/AudioAmbiance.jsx';
import {
  Page1Hero,
  Page2Began,
  Page3GettingToKnow,
  Page4FallingInLove,
  Page5OurLove,
  Page6OurLittleLife,
  Page7WhatYouMean,
  Page8OurForever,
  Page9Final
} from './components/PageViews.jsx';
import {
  LoveLetterSection,
  PhotoGallerySection,
  TimelineSection,
  ReasonsLoveSection,
  QuoteSection,
  CustomSection
} from './components/CustomSectionTypes.jsx';
import ChapterNav from './components/ChapterNav.jsx';
import SectionActionBar from './components/SectionActionBar.jsx';
import SectionEditorDrawer from './components/SectionEditorDrawer.jsx';
import AddSectionModal from './components/AddSectionModal.jsx';
import DeleteConfirmModal from './components/DeleteConfirmModal.jsx';
import ReorderSectionsModal from './components/ReorderSectionsModal.jsx';
import EditorControlBar from './components/EditorControlBar.jsx';
import './AnniversaryTemplate3.css';

const LOCAL_STORAGE_KEY = 'wishly_anniversary_template3_9pages';

/**
 * Normalizes incoming data into structured 9 pages
 */
function normalizeData(data = {}) {
  const customData = data.customData || {};

  // If custom pages already provided
  if (Array.isArray(data.pages) && data.pages.length > 0) {
    return { ...DEFAULT_DATA, ...data, ...customData, pages: data.pages };
  }
  if (Array.isArray(customData.pages) && customData.pages.length > 0) {
    return { ...DEFAULT_DATA, ...data, ...customData, pages: customData.pages };
  }

  // Otherwise check local storage saved customized data
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.pages) && parsed.pages.length > 0) {
        return { ...DEFAULT_DATA, ...data, ...parsed };
      }
    }
  } catch (e) {
    console.warn("Storage load error:", e);
  }

  const recipientName = data.recipientName || customData.recipientName || DEFAULT_DATA.recipientName;
  const anniversaryDate = data.date || data.anniversaryDate || customData.date || DEFAULT_DATA.anniversaryDate;
  const yearsTogether = data.years || data.yearsTogether || customData.years || DEFAULT_DATA.yearsTogether;

  const initialPages = DEFAULT_PAGES.map((page) => {
    if (page.type === 'page1_hero') {
      return {
        ...page,
        coupleName: recipientName,
        datePill: `${anniversaryDate} • ${yearsTogether}`
      };
    }
    if (page.type === 'page9_final') {
      return {
        ...page,
        monogramDate: anniversaryDate
      };
    }
    return page;
  });

  return {
    ...DEFAULT_DATA,
    ...customData,
    recipientName,
    anniversaryDate,
    yearsTogether,
    pages: initialPages
  };
}

/**
 * AnniversaryTemplate3 — "Arranged to Soulmates"
 * 9 PAGES • 100% USER EDITABLE • EVERY PAGE REMOVABLE & REORDERABLE
 */
export function AnniversaryTemplate3({ data = {}, isEditor = false }) {
  const [templateState, setTemplateState] = useState(() => normalizeData(data));
  const [isEditMode, setIsEditMode] = useState(isEditor);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modals & Drawers
  const [editingSection, setEditingSection] = useState(null);
  const [deletingSection, setDeletingSection] = useState(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);

  const activePages = (templateState.pages || []).filter((p) => p.enabled !== false);
  const currentPage = activePages[currentPageIndex] || activePages[0];

  // Sync with incoming data prop if changed externally
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setTemplateState(normalizeData(data));
    }
  }, [data]);

  // Save changes to localStorage
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(templateState));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.warn("Draft save error:", err);
    }
  };

  // Reset to default 9 pages
  const handleResetDefault = () => {
    if (window.confirm("Reset all 9 pages and messages back to template defaults?")) {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {}
      setTemplateState({
        ...DEFAULT_DATA,
        pages: DEFAULT_PAGES
      });
      setCurrentPageIndex(0);
    }
  };

  // Transition between pages
  const transitionToPageId = (pageId) => {
    const idx = activePages.findIndex((p) => p.id === pageId);
    if (idx !== -1) {
      setCurrentPageIndex(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < activePages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reordering
  const handleMoveUp = (index) => {
    if (index === 0) return;
    setTemplateState((prev) => {
      const pages = [...prev.pages];
      const temp = pages[index - 1];
      pages[index - 1] = pages[index];
      pages[index] = temp;
      return { ...prev, pages };
    });
  };

  const handleMoveDown = (index) => {
    setTemplateState((prev) => {
      const pages = [...prev.pages];
      if (index >= pages.length - 1) return prev;
      const temp = pages[index + 1];
      pages[index + 1] = pages[index];
      pages[index] = temp;
      return { ...prev, pages };
    });
  };

  // Page Deletion
  const handleDeleteConfirm = (pageId) => {
    setTemplateState((prev) => {
      const pages = prev.pages.filter((p) => p.id !== pageId);
      return { ...prev, pages };
    });
    setDeletingSection(null);
    setCurrentPageIndex((prev) => Math.max(0, Math.min(prev, activePages.length - 2)));
  };

  // Page Duplication
  const handleDuplicate = (pageId) => {
    setTemplateState((prev) => {
      const idx = prev.pages.findIndex((p) => p.id === pageId);
      if (idx === -1) return prev;
      const original = prev.pages[idx];
      const clone = {
        ...JSON.parse(JSON.stringify(original)),
        id: `page-${Date.now()}`,
        pageLabel: `${original.pageLabel || original.title || 'Page'} (Copy)`
      };
      const pages = [...prev.pages];
      pages.splice(idx + 1, 0, clone);
      return { ...prev, pages };
    });
  };

  // Save Edited Page
  const handleSaveEditedSection = (updatedPage) => {
    setTemplateState((prev) => {
      const pages = prev.pages.map((p) =>
        p.id === updatedPage.id ? updatedPage : p
      );
      return { ...prev, pages };
    });
    setEditingSection(null);
  };

  // Add Section / Page
  const handleAddSection = (newPage) => {
    setTemplateState((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    setCurrentPageIndex(activePages.length);
  };

  // Page Renderer
  const renderPageComponent = (page, isLast) => {
    const onNext = isLast ? null : handleNextPage;

    switch (page.type) {
      case 'page1_hero':
      case 'hero':
        return <Page1Hero page={page} onNext={handleNextPage} />;

      case 'page2_began':
      case 'arranged':
        return <Page2Began page={page} onNext={onNext} />;

      case 'page3_getting_to_know':
      case 'gettingToKnow':
        return <Page3GettingToKnow page={page} onNext={onNext} />;

      case 'page4_falling_in_love':
      case 'fallingInLove':
        return <Page4FallingInLove page={page} onNext={onNext} />;

      case 'page5_our_love':
      case 'loveWeBuilt':
        return <Page5OurLove page={page} onNext={onNext} />;

      case 'page6_our_little_life':
      case 'ourLittleLife':
        return <Page6OurLittleLife page={page} onNext={onNext} />;

      case 'page7_what_you_mean':
      case 'interactiveUs':
        return <Page7WhatYouMean page={page} onNext={onNext} />;

      case 'page8_our_forever':
      case 'celebration':
        return (
          <Page8OurForever
            page={page}
            onCelebrationToggle={setCelebrationActive}
            onNext={onNext}
          />
        );

      case 'page9_final':
      case 'final':
        return (
          <Page9Final
            page={page}
            recipientName={templateState.recipientName}
            onReplay={() => transitionToPageId(activePages[0]?.id)}
          />
        );

      case 'loveLetter':
        return <LoveLetterSection data={page} onNext={onNext} />;

      case 'photoGallery':
        return <PhotoGallerySection data={page} onNext={onNext} />;

      case 'timeline':
        return <TimelineSection data={page} onNext={onNext} />;

      case 'reasonsLove':
        return <ReasonsLoveSection data={page} onNext={onNext} />;

      case 'quote':
        return <QuoteSection data={page} onNext={onNext} />;

      case 'customSection':
      default:
        return <CustomSection data={page} onNext={onNext} />;
    }
  };

  const isCurrentLovePage = currentPage?.type === 'page5_our_love' || currentPage?.type === 'loveWeBuilt';

  return (
    <div className={`tpl-root tpl-arranged-to-soulmates stage-active-${currentPage?.type || 'hero'} ${isCurrentLovePage ? 'stage-active-loveWeBuilt' : ''}`}>
      {/* Linen Paper Texture & Ambient Petal Canvas */}
      <div className="tpl3-warm-linen-texture" />
      <AmbientBackground
        stage={currentPage?.type || 'hero'}
        celebrationActive={celebrationActive}
        key={currentPage?.id || 0}
      />

      {/* Romantic Melody Synth */}
      <AudioAmbiance />

      {/* Top Editor Control Toolbar */}
      <EditorControlBar
        isEditMode={isEditMode}
        onToggleEditMode={setIsEditMode}
        onOpenAddSection={() => setIsAddSectionOpen(true)}
        onOpenReorder={() => setIsReorderOpen(true)}
        onResetDefault={handleResetDefault}
        onSaveDraft={handleSaveDraft}
        saveSuccess={saveSuccess}
      />

      {/* Main Viewport Container */}
      <main className="tpl3-main-container" key={currentPage?.id || currentPageIndex}>
        {/* Editor Action Bar (Edit ✏️ | Duplicate ⎘ | Move ↑ | Move ↓ | Delete 🗑️) */}
        {isEditMode && currentPage && (
          <SectionActionBar
            section={currentPage}
            index={currentPageIndex}
            totalSections={activePages.length}
            onEdit={setEditingSection}
            onDuplicate={handleDuplicate}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={setDeletingSection}
          />
        )}

        {/* Dynamic Page Render */}
        {currentPage ? (
          renderPageComponent(
            currentPage,
            currentPageIndex === activePages.length - 1
          )
        ) : (
          <div className="empty-sections-placeholder">
            <h3>No pages available</h3>
            <p>You can add a page anytime to rebuild your anniversary story.</p>
            <button
              type="button"
              className="btn-story-primary"
              onClick={() => setIsAddSectionOpen(true)}
            >
              + Add Page
            </button>
          </div>
        )}
      </main>

      {/* Dynamic 9-Page Navigator at bottom */}
      {activePages.length > 1 && (
        <ChapterNav
          sections={activePages}
          currentSectionId={currentPage?.id}
          onSectionSelect={transitionToPageId}
        />
      )}

      {/* Editor Modals & Drawers */}
      {editingSection && (
        <SectionEditorDrawer
          section={editingSection}
          onSave={handleSaveEditedSection}
          onClose={() => setEditingSection(null)}
        />
      )}

      {deletingSection && (
        <DeleteConfirmModal
          section={deletingSection}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingSection(null)}
        />
      )}

      {isAddSectionOpen && (
        <AddSectionModal
          isOpen={isAddSectionOpen}
          onClose={() => setIsAddSectionOpen(false)}
          onAddSection={handleAddSection}
        />
      )}

      {isReorderOpen && (
        <ReorderSectionsModal
          isOpen={isReorderOpen}
          onClose={() => setIsReorderOpen(false)}
          sections={activePages}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={setDeletingSection}
        />
      )}
    </div>
  );
}

export const ForeverAlwaysTemplate = AnniversaryTemplate3;
export const ArrangedToSoulmatesTemplate = AnniversaryTemplate3;
export default AnniversaryTemplate3;
