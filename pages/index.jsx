import React from 'react'
import { Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import styles from './index.module.css';

const simpleRichTextSchema = new Schema({
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

export class ImageView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.dom = document.createElement('img');
    this.dom.setAttribute('src', node.attrs.src);
    this.dom.addEventListener('click', this.handleClick);
  }

  destroy() {
    this.dom.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const src = prompt('Image url: ');
    if (!src) return;

    this.view.dispatch(
      this.view.state.tr.setNodeMarkup(this.getPos(), undefined, { src })
    );
    this.view.focus();
  };
}

export default function EditorExample() {
  const editorRef = React.useRef();
  const viewRef = React.useRef();
  const [state] = React.useState(
    EditorState.create({
      schema: simpleRichTextSchema,
      plugins: [
        history(),
        keymap({
          'Mod-z': undo,
          'Mod-shift-z': redo,
          'Mod-b': toggleMark(simpleRichTextSchema.marks.bold),
          'Mod-B': toggleMark(simpleRichTextSchema.marks.bold),
          'Mod-i': toggleMark(simpleRichTextSchema.marks.italic),
          'Mod-I': toggleMark(simpleRichTextSchema.marks.italic),
          'Mod-u': toggleMark(simpleRichTextSchema.marks.underline),
          'Mod-U': toggleMark(simpleRichTextSchema.marks.underline),
        }),
        keymap(baseKeymap),
      ]
    })
  );

  React.useEffect(() => {
    if (!editorRef.current) return;
    const view = new EditorView(editorRef.current, {
      state,
      nodeViews: {
        image: (node, view, getPos) => new ImageView(node, view, getPos),
      }
    });
    viewRef.current = view;
    return () => view.destroy()
  }, [state])

  const handleClickAddImage = React.useCallback(() => {
    const view = viewRef.current;
    if (!view) return;

    const src = prompt('Image url: ');
    if (!src) return;

    view.dispatch(
      view.state.tr.replaceSelectionWith(
        simpleRichTextSchema.nodes.image.create({ src })
      )
    );
    view.focus();
  }, [viewRef])

  return (
    <>
      <div className={styles.container} ref={editorRef} />
      <div>
        <button onClick={handleClickAddImage}>Add Image</button>
      </div>
    </>
  )
}
