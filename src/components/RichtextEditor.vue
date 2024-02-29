<template>
  <div v-if="editor" style="padding-top: 10px;">
    <button @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/bold.svg">
      </div>
    </button>

    <button @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/italic.svg">
      </div>
    </button>

    <button @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/strike.svg">
      </div>
    </button>
    <button @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiCodeTagsPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      <div class="flex-container svg-icon-size">
        <svg-icon type="mdi" :path="mdiFormatParagraphPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/heading-h1.svg">
      </div>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/heading-h2.svg">
      </div>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/heading-h3.svg">
      </div>
    </button>
    <!-- <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button> -->
    <button @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiFormatListBulletedPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiFormatListCheckboxPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiFormatListNumberedPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiFileCodeOutlinePath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiFormatQuoteOpenPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      <div class="flex-container svg-icon-size">
        <img src="../assets/img/format-separator.svg">
      </div>
    </button>
    <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiArrowULeftTopPath" width="20" height="20"></svg-icon>
      </div>
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      <div class="flex-container">
        <svg-icon type="mdi" :path="mdiArrowURightTopPath" width="20" height="20"></svg-icon>
      </div>
    </button>
  </div>
  <editor-content :editor="editor" />
</template>
  
<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiFormatBold, mdiFormatItalic, mdiFormatStrikethroughVariant, mdiCodeTags, mdiFormatParagraph,
  mdiFormatListBulleted, mdiFormatQuoteOpen, mdiFormatListCheckbox, mdiFormatListNumbered,
  mdiFileCodeOutline, mdiArrowULeftTop, mdiArrowURightTop
} from '@mdi/js';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

export default {
  components: {
    EditorContent,
    SvgIcon
  },

  data() {
    return {
      editor: null,
      editorContent: '',
      mdiFormatBoldPath: mdiFormatBold,
      mdiFormatItalicPath: mdiFormatItalic,
      mdiFormatStrikethroughVariantPath: mdiFormatStrikethroughVariant,
      mdiCodeTagsPath: mdiCodeTags,
      mdiFormatParagraphPath: mdiFormatParagraph,
      mdiFormatListBulletedPath: mdiFormatListBulleted,
      mdiFormatQuoteOpenPath: mdiFormatQuoteOpen,
      mdiFormatListNumberedPath: mdiFormatListNumbered,
      mdiFormatListCheckboxPath: mdiFormatListCheckbox,
      mdiFileCodeOutlinePath: mdiFileCodeOutline,
      mdiArrowULeftTopPath: mdiArrowULeftTop,
      mdiArrowURightTopPath: mdiArrowURightTop,

    }
  },

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  watch: {
    modelValue(newValue) {
      this.editorContent = newValue;
    },
  },

  mounted() {
    // this.editorContent = this.modelValue;
    // console.log("modelvalue", this.modelValue);
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          codeBlock: false
        }),
        // BulletList, 
        // ListItem,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Placeholder.configure({
          placeholder: 'Write something …',
        }),
        CodeBlockLowlight.configure({
          lowlight: createLowlight(common)
        }),
      ],
      content: this.modelValue,
      onUpdate: ({ editor }) => {
        this.$emit('update:modelValue', editor.getHTML());
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    updateContent() {
      console.log(this.editorContent);
      this.$emit('update:modelValue', this.editorContent);
    },
  },
}
</script>
  
<style lang="scss">
@import "../assets/css/dracula.css";

.ProseMirror:focus {
  outline: none;
}

button {
  border: 1px solid rgb(105, 60, 221);
  border: none;
  border-radius: 5px;
  background-color: var(--primary-background-color-1);
  margin: 0 4px;
  padding: 1px;
}

button.is-active {
  background-color: rgb(209, 206, 255);
}

.flex-container {
  display: flex;
}

.svg-icon-size {
  img {
    width: 20px;
    height: 20px;
  }
}

.tiptap {
  color: #0D0D0D;
  font-size: 16px;
  line-height: 1rem;

  >*+* {
    margin-top: 0.75em;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  ul li {
    list-style: none;
  }

  ul li:before {
    content: "";
    position: absolute;
    left: 16px;
    background: #bdbecc;
    margin-top: 8px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding-left: 10px;

    p {
      margin: 0;

    }

    li {
      display: flex;
      margin-top: 0.75rem;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >input[type=checkbox] {
        opacity: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      >div {
        flex: 1 1 auto;
      }

      ul li,
      ol li {
        display: list-item;
      }

      ul[data-type="taskList"]>li {
        display: flex;

      }
    }

    li:before {
      content: none;
    }

  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    color: rgb(159 121 156);
  }


  h2 {
    color: rgb(178 173 206)
  }

  strong {
    font-weight: 700;
    background-color: rgb(218, 203, 235);
    color:#951474
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: rgb(35, 47, 47);
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  p {
    line-height: 1.5rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
</style>