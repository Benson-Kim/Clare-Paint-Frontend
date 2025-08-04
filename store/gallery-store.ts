import { create } from 'zustand';
import { GalleryProject } from '@/types/gallery';

interface GalleryStore {
  isSubmissionModalOpen: boolean;
  isProjectDetailModalOpen: boolean;
  selectedProject: GalleryProject | null;
  openSubmissionModal: () => void;
  closeSubmissionModal: () => void;
  openProjectDetailModal: (project: GalleryProject) => void;
  closeProjectDetailModal: () => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  isSubmissionModalOpen: false,
  isProjectDetailModalOpen: false,
  selectedProject: null,
  openSubmissionModal: () => set({ isSubmissionModalOpen: true }),
  closeSubmissionModal: () => set({ isSubmissionModalOpen: false }),
  openProjectDetailModal: (project) => set({ isProjectDetailModalOpen: true, selectedProject: project }),
  closeProjectDetailModal: () => set({ isProjectDetailModalOpen: false, selectedProject: null }),
}));
