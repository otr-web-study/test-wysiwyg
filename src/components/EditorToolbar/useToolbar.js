import { storeToRefs } from 'pinia';
import ArrowLeft from '@/components/icons/ArrowLeft.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import HeaderIcon from '@/components/icons/HeaderIcon.vue';
import ImageIcon from '@/components/icons/ImageIcon.vue';
import ParagraphIcon from '@/components/icons/ParagraphIcon.vue';
import { useEditorStore } from '@/stores/editor';

export const useToolbar = () => {
  const store = useEditorStore();
  const { activeElement, content } = storeToRefs(store);
  const { prevHistoryItem, nextHistoryItem, addHistoryItem } = store;

  const addTextElement = (type) => {
    if (!activeElement.value) return;
    const [startSelection, endSelection] = [
      activeElement.value.element.selectionStart,
      activeElement.value.element.selectionEnd,
    ];

    const newContent = content.value.reduce((acc, item, i) => {
      if (i !== activeElement.value.idx) {
        acc.push(item);
        return acc;
      }

      if (startSelection) {
        acc.push({
          ...item,
          children: item.children.substring(0, startSelection - 1),
          id: crypto.randomUUID(),
        });
      }

      acc.push({
        type,
        children: item.children.substring(startSelection, endSelection),
        props: {},
        id: crypto.randomUUID(),
      });

      if (item.children.length > endSelection) {
        acc.push({
          ...item,
          children: item.children.substring(endSelection + 1),
          id: crypto.randomUUID(),
        });
      }

      return acc;
    }, []);

    addHistoryItem(newContent);
  };

  const addImage = () => {
    if (!activeElement.value) return;

    const src = prompt('Введите ссылку на изображение...');

    if (!src) return;

    if (!/^(http(s):\/\/).*/.test(src)) {
      alert('Введенн некорректный URL.');
      return;
    }

    const startSelection = activeElement.value.element.selectionStart;

    const newContent = content.value.reduce((acc, item, i) => {
      if (i !== activeElement.value.idx) {
        acc.push(item);
        return acc;
      }

      if (startSelection) {
        acc.push({
          ...item,
          children: item.children.substring(0, startSelection - 1),
          id: crypto.randomUUID(),
        });
      }

      acc.push({
        type: 'img',
        props: { src, alt: src },
        id: crypto.randomUUID(),
      });

      if (item.children.length > startSelection) {
        acc.push({
          ...item,
          children: item.children.substring(startSelection + 1),
          id: crypto.randomUUID(),
        });
      }

      return acc;
    }, []);

    addHistoryItem(newContent);
  };

  const generateHTML = () =>
    content.value
      .map((item) => {
        const props = Object.entries(item.props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
        const closeTag = item.type === 'img' ? ' />' : `>${item.children}</${item.type}>`;
        return `<${item.type} ${props}${closeTag}`;
      })
      .join(' ');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateHTML()).then(() => {
      alert('HTML документ скопирован в буфер обмена.');
    });
  };

  const buttons = [
    { name: 'undo', icon: ArrowLeft, handler: prevHistoryItem },
    { name: 'redo', icon: ArrowRight, handler: nextHistoryItem },
    { name: 'header', icon: HeaderIcon, handler: () => addTextElement('h2') },
    { name: 'paragraph', icon: ParagraphIcon, handler: () => addTextElement('p') },
    { name: 'image', icon: ImageIcon, handler: addImage },
    { name: 'copy', text: 'Скопировать HTML', handler: () => copyToClipboard() },
  ];

  return { buttons };
};
