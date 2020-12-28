import { Schema } from 'prosemirror-model';

export const simpleRichTextSchema = new Schema({
  nodes: {
    doc: {
      content: 'paragraph+',
    },
    paragraph: {
      content: 'inline*',
      inline: false,
      parseDOM: [{ tag: 'p' }],
      toDOM: (node) => ['p', 0],
    },
    image: {
      group: 'inline',
      inline: true,
      attrs: {
        src: { default: '' },
      },
      parseDOM: [
        { tag: 'img[src]', getAttrs: dom => ({ src: dom.src || '' }) },
      ],
      toDOM: (node) => ['img', { src: node.attrs.src }],
    },
    text: {
      group: 'inline',
      inline: true,
    },
  },
  marks: {
    bold: {
      parseDOM: [
        { tag: 'b' },
        { tag: 'strong' },
        { style: 'font-weight=700' },
        { style: 'font-weight=800' },
        { style: 'font-weight=900' },
        { style: 'font-weight=bold' },
      ],
      toDOM: () => ['b', 0],
    },
    italic: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM: () => ['i', 0],
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM: () => ['u', 0],
    },
  },
});