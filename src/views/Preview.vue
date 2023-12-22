<template>
  <div>
    <div v-for="item in items" style="display: inline;">
      <el-button :ref="getItemRefName(item)" @click.stop="toggleOutsidePopover(item.id)">Click me 1</el-button>
      <el-popover :visible="popoverVisible1" :virtual-ref="btnRef1.ref" virtual-triggering placement="bottom">
        <div v-click-out-side="handleClickOutsideFirst" @click.stop>
          <p>This is popover content</p>
          <span>Some content</span>
          <el-button :ref="getBtnRefName(item)" @click.stop="toggleNestedPopover(item.id)">Click me 2</el-button>
          <el-popover :visible="popoverVisible2" :virtual-ref="btnRef2.ref" virtual-triggering placement="bottom">
            <div v-click-out-side="handleClickOutsideSecond" @click.stop>
              <span>Nested</span>
              <el-button @click.stop>Click me 3</el-button>
            </div>
          </el-popover>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import clickOutSide from "@mahdikhashan/vue3-click-outside";
import { ElPopover, ElButton } from 'element-plus';

export default {
  directives: {
    clickOutSide,
  },
  components: {
    ElPopover,
    ElButton,

  },
  data() {
    return {
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' },
        { id: 5, text: 'Item 5' },
        { id: 6, text: 'Item 6' },
        { id: 7, text: 'Item 7' },
        { id: 8, text: 'Item 8' },
        // ... more items
      ],
      popoverVisible1: false,
      popoverVisible2: false,
      // trialOutsideVisible: false,
      // trialInsideVisible: false,
      btnRef1: {
        ref: null,
        id: null,
      },
      btnRef2: {
        ref: null,
        id: null,
      },
    };
  },
  methods: {
    getItemRefName(item) {
      return `item-${item.id}`;
    },
    getBtnRefName(item) {
      return `btn-${item.id}`;
    },
    toggleOutsidePopover(itemId) {
      const triggeringElement = this.$refs[`item-${itemId}`][0];
      if (triggeringElement) {
        // console.log(triggeringElement);
        if ((this.btnRef1.id ?? null) !== itemId) {
          if (this.popoverVisible1) {
            this.popoverVisible1 = false;
            this.popoverVisible2 = false;
          }
        }
        this.btnRef1.ref = triggeringElement;
        this.btnRef1.id = itemId;
        if (this.popoverVisible1) {
          this.popoverVisible1 = false;
          this.popoverVisible2 = false;
        } else {
          this.popoverVisible1 = true;
        }
      }

    },
    toggleNestedPopover(itemId) {
      const triggeringElement = this.$refs[`btn-${itemId}`][0];
      if (triggeringElement) {
        this.btnRef2.ref = triggeringElement;
        this.btnRef2.id = itemId;
        if (this.popoverVisible2) {
          this.popoverVisible2 = false;
        } else {
          this.popoverVisible2 = true;
        }
      }

    },
    handleClickOutsideFirst() {
      console.log("Clicked otuside 1");
      if (this.popoverVisible1) {
        this.popoverVisible1 = false;
      }

    },
    handleClickOutsideSecond() {
      console.log("Clicked outside 2");
      if (this.popoverVisible2) {
        this.popoverVisible2 = false;
      }
    },

  },
};
</script>