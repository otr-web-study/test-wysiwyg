import ArrowLeft from '@/components/icons/ArrowLeft.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import HeaderIcon from '@/components/icons/HeaderIcon.vue';
import ImageIcon from '@/components/icons/ImageIcon.vue';
import ParagraphIcon from '@/components/icons/ParagraphIcon.vue';

export const useToolbar = () => {
  const buttons = [
    { name: 'undo', icon: ArrowLeft, handler: () => {} },
    { name: 'redo', icon: ArrowRight, handler: () => {} },
    { name: 'header', icon: HeaderIcon, handler: () => {} },
    { name: 'paragraph', icon: ParagraphIcon, handler: () => {} },
    { name: 'image', icon: ImageIcon, handler: () => {} },
    { name: 'copy', text: 'Скопировать HTML', handler: () => {} },
  ];

  return { buttons };
};
