<template>
    <div v-if="editor" style="padding-top: 10px;">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatBoldPath"></svg-icon>
        </div>
      </button>
  
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatItalicPath"></svg-icon>
        </div>
      </button>
  
      <button @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatStrikethroughVariantPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiCodeTagsPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatParagraphPath"></svg-icon>
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
      <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        <div class="flex-container svg-icon-size">
          <img src="../assets/img/heading-h4.svg">
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
          <svg-icon type="mdi" :path="mdiFormatListBulletedPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatListCheckboxPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatListNumberedPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFileCodeOutlinePath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiFormatQuoteOpenPath"></svg-icon>
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
          <svg-icon type="mdi" :path="mdiArrowULeftTopPath"></svg-icon>
        </div>
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        <div class="flex-container">
          <svg-icon type="mdi" :path="mdiArrowURightTopPath"></svg-icon>
        </div>
      </button>
    </div>
    <editor-content :editor="editor" />
  </template>
  
  <script>
  import StarterKit from '@tiptap/starter-kit'
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import TaskItem from '@tiptap/extension-task-item'
  import TaskList from '@tiptap/extension-task-list'
  
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiFormatBold, mdiFormatItalic, mdiFormatStrikethroughVariant, mdiCodeTags,  mdiFormatParagraph,
    mdiFormatListBulleted, mdiFormatQuoteOpen, mdiFormatListCheckbox, mdiFormatListNumbered,
    mdiFileCodeOutline, mdiArrowULeftTop, mdiArrowURightTop   } from '@mdi/js';
  
  export default {
    components: {
      EditorContent,
      SvgIcon
    },
  
    data() {
      return {
        editor: null,
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
  
    mounted() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          TaskList,
          TaskItem.configure({
            nested: true,
          }),
        ],
        content: "",
        placeholder: "Add some remark here"
      })
    },
  
    beforeUnmount() {
      this.editor.destroy()
    },
  }
  </script>
  
  <style lang="scss">

.ProseMirror:focus {
    outline: none;
  }
  
  button {
    border: none;
    border-radius: 5px;
    background-color: #FFF;
    margin: 0 10px;
  }
  
  button.is-active {
    background-color: #f8e2ff;
  }
  
  .flex-container {
    display: flex;
  }
  
  .svg-icon-size {
    img {
      width: 24px;
      height: 24px;
    }
  }
  
  .tiptap {
    // padding: 0 30px;
    color: #0D0D0D;
  
    > * + * {
      margin-top: 0.75em;
    }
  
    ul[data-type="taskList"] {
      list-style: none;
      padding-inline-start: 10px;
      
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
    }
  
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }
  
    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  
    pre {
      background: #0D0D0D;
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