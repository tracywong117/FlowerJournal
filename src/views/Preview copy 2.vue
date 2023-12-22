<template>
  <!-- <el-popover :visible="trialOutsideVisible">
    <template #reference>
      <el-button @click.stop="handleButtonClick1">Click me1</el-button>
    </template>
    <div v-click-out-side="handleTrialClickOutside1" >
      Some content.
      <el-popover :visible="trialInsideVisible">
        <template #reference>
          <el-button @click.stop="handleButtonClick2">Click me2</el-button>
        </template>
        <div v-click-out-side="handleTrialClickOutside2" @click.stop>
          Some content.
          <el-button>Click me3</el-button>
        </div>
      </el-popover>
    </div>
  </el-popover> -->

  <!-- <el-popover trigger="click">
    <template #reference>
      <el-button @click.stop>Click me1</el-button>
    </template>
    <div @click.stop>
      Some content.
      <el-popover trigger="click">
        <template #reference>
          <el-button @click.stop>Click me2</el-button>
        </template>
        <div @click.prevent>
          Some content.
          <el-button @click.stop>Click me3</el-button>
        </div>
      </el-popover>
    </div>
  </el-popover> -->

  <div>
    <div v-for="item in items" style="display: inline;">
      <el-button :ref="getItemRefName(item)" @click="showPopover(item.id)">Show Popover</el-button>
      <el-popover :visible="popoverVisible" :virtual-ref="virtualRef" virtual-triggering>
        <div class="first-container" v-click-out-side="handleClickOutsideFirst">
          <p>This is popover content</p>
          <span>Some content</span>
          <el-button :ref="getBtnRefName(item)" @click="toggleNestedPopover(item.id)">Click me</el-button>
          <el-popover :visible="popoverVisible1" :virtual-ref="btnRef" virtual-triggering placement="bottom">
            <div v-click-out-side="handleClickOutsideSecond">
              <span>Nested</span>
              <el-button>Click me</el-button>
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

const delay = 20;

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
      popoverVisible: false,
      popoverVisible1: false,
      trialOutsideVisible: false,
      trialInsideVisible: false,
      virtualRef: null,
      btnRef: null,
    };
  },
  methods: {
    getItemRefName(item) {
      // This will generate a ref name based on the item's id
      return `item-${item.id}`;
    },
    getBtnRefName(item) {
      // This will generate a ref name based on the item's id
      return `btn-${item.id}`;
    },
    showPopover(itemId) {
      // Find the element in refs that corresponds to the item ID
      // const triggeringElement = this.$refs.refs.find((el) => el.id === itemId);
      setTimeout(() => {
        const triggeringElement = this.$refs[`item-${itemId}`][0];
        if (triggeringElement) {
          console.log(triggeringElement);
          this.virtualRef = triggeringElement;
          this.popoverVisible = true;
        }
      }, 20);
    },
    // togglePopover() {
    //   console.log(this.buttonRef);
    //   setTimeout(() => {
    //     this.popoverVisible = !this.popoverVisible;
    //   }, delay);
    // },
    toggleNestedPopover(itemId) {
      setTimeout(() => {
        const triggeringElement = this.$refs[`btn-${itemId}`][0];
        if (triggeringElement) {
          console.log(triggeringElement);
          this.btnRef = triggeringElement;
          this.popoverVisible = true;

          this.popoverVisible1 = !this.popoverVisible1;
        }
      }, 20);
    },
    handleClickOutsideFirst() {
      console.log('handleClickOutsideFirst');
      setTimeout(() => {
        if (this.popoverVisible && !this.popoverVisible1) {
          this.popoverVisible = false;
        }
      }, 10);
    },
    handleClickOutsideSecond() {
      if (this.popoverVisible1) {
        this.popoverVisible1 = false;
      }
    },
    handleButtonClick1() {
      if (this.trialOutsideVisible) {
        this.trialInsideVisible = false;
        this.trialOutsideVisible = false;
      } else {
        this.trialOutsideVisible = true;
      }

    },
    handleButtonClick2() {
      if (this.trialInsideVisible) {
        this.trialInsideVisible = false;
      } else {
        this.trialInsideVisible = true;
      }
    },
    handleTrialClickOutside1() {
      console.log("Clicked otuside 1");
      if (this.trialOutsideVisible) {
        this.trialOutsideVisible = false;
      }
    },
    handleTrialClickOutside2() {
      console.log("Clicked otuside 2");
      if (this.trialInsideVisible) {
        this.trialInsideVisible = false;
      }
    },
  },
};
</script>