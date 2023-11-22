<template>
  <table>
    <tr v-for="rowIndex in 3" :key="rowIndex">
      <td v-for="cellIndex in 3" :key="cellIndex">
        <div @dragover="allowDrop" @dragenter="dragEnter((rowIndex - 1) * 3 + cellIndex)"
          @drop="drop((rowIndex - 1) * 3 + cellIndex)"
          :class="{ 'hovered': hoveredField === (rowIndex - 1) * 3 + cellIndex }"
          style="margin: 5px; border: 1px solid black; min-height: 230px;">
          <div>
            {{ (rowIndex - 1) * 3 + cellIndex }}
          </div>
          <div v-for="item in getFilteredData((rowIndex - 1) * 3 + cellIndex)" :key="item.index" :draggable="true"
            @dragstart="startDrag(item, $event)" :style="{
              'background-color': 'pink',
              'margin-bottom': '5px',
              'padding': '5px',
              'opacity': item === draggedItem ? '0.5' : '1',
              'transition': 'opacity 0.3s'
            }">
            {{ item.text }}
          </div>
          <div class="placeholder" v-if="draggedItem && hoveredField === (rowIndex - 1) * 3 + cellIndex">
            {{ draggedItem.text }}
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      myData: [
        { index: 1, text: 'a' },
        { index: 1, text: 'b' },
        { index: 2, text: 'c' },
        { index: 8, text: 'd' }
      ],
      draggedItem: null,
      hoveredField: null
    };
  },
  computed: {
    getFilteredData() {
      return (index) => {
        return this.myData.filter((item) => item.index === index);
      };
    }
  },
  methods: {
    startDrag(item, event) {
      this.draggedItem = item;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", ""); // Necessary for Firefox
    },
    allowDrop(event) {
      event.preventDefault();
    },
    dragEnter(newIndex) {
      console.log(`Item first touched index: ${newIndex}`);
      if (this.draggedItem) {
        this.hoveredField = newIndex;
      }
    },
    drop(newIndex) {
      if (this.draggedItem) {
        if (this.draggedItem.index !== newIndex) {
          console.log(`Item moved to index: ${newIndex}`);
        }
        this.draggedItem.index = newIndex;
        this.draggedItem = null;
        this.hoveredField = null;
      }
    }
  }
};
</script>

<style>
.hovered {
  background-color: rgb(233, 244, 248);
}
.placeholder {
  background-color: pink;
  margin-bottom: 5px;
  padding: 5px;
  transition: background-color 2s ease-in;
}
</style>