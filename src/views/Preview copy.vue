<template>
  <div>
    <el-button ref="buttonRef" @click="togglePopover">Click me</el-button>
    <el-popover :visible="popoverVisible" :virtual-ref="buttonRef" virtual-triggering>
      <div class="first-container" v-click-out-side="handleClickOutsideFirst">
        <span>Some content</span>
        <el-button ref="buttonRef1" @click="toggleNestedPopover">Click me</el-button>
        <el-popover :visible="popoverVisible1" :virtual-ref="buttonRef1" virtual-triggering>
          <div v-click-out-side="handleClickOutsideSecond">
            <span>Nested</span>
            <el-button>Click me</el-button>
          </div>
        </el-popover>
      </div>
    </el-popover>
  </div>
</template>
    
<script>
import { ElPopover, ElButton } from 'element-plus';
import clickOutSide from "@mahdikhashan/vue3-click-outside";

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
      popoverVisible: false,
      popoverVisible1: false,

    };
  },
  mounted() {
    this.buttonRef = this.$refs.buttonRef;
    this.buttonRef1 = this.$refs.buttonRef1;
  },
  methods: {
    togglePopover() {
      console.log(this.buttonRef);
      setTimeout(() => {
        this.popoverVisible = !this.popoverVisible;
      }, delay);
    },
    toggleNestedPopover() {
      setTimeout(() => {
        this.popoverVisible1 = !this.popoverVisible1;
      }, delay);
    },
    handleClickOutsideFirst() {
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
    }
  }
}

</script>