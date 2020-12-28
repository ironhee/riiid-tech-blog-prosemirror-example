import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { simpleRichTextSchema } from './schema';

export const plugins = [
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