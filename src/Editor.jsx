import React from 'react'
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { simpleRichTextSchema } from './schema';
import { ImageView } from './nodeView';
import { plugins } from './plugin';
import styles from './Editor.module.css';

export default function EditorExample() {
  const editorRef = React.useRef();
  const viewRef = React.useRef();
  const [state] = React.useState(
    EditorState.create({ schema: simpleRichTextSchema, plugins })
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
