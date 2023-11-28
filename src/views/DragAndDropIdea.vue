<template>
    <table>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">
          <div>
            <span>{{ cell.value }}</span>
          </div>
          <div>
            <div
              v-if="cell.text !== null"
              :draggable="cell.draggable"
              @dragstart="startDrag(cell, rowIndex, cellIndex)"
              @dragover="dragOver"
              @dragenter="dragEnter"
              @dragleave="dragLeave"
              @drop="drop(cell, rowIndex, cellIndex)"
            >
              <span
                style="background-color: pink;"
                :class="{ 'drag-over': cell.dragOver }"
              >
                {{ cell.text }}
              </span>
            </div>
            <div v-else>
              <span></span>
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
        tableData: [
          [
            { value: '1', text: null, draggable: false, dragOver: false },
            { value: '2', text: 'Text 1', draggable: true, dragOver: false },
            { value: '3', text: null, draggable: false, dragOver: false }
          ],
          [
            { value: '4', text: 'Text 2', draggable: true, dragOver: false },
            { value: '5', text: null, draggable: true, dragOver: false },
            { value: '6', text: null, draggable: true, dragOver: false }
          ],
          [
            { value: '7', text: null, draggable: false, dragOver: false },
            { value: '8', text: null, draggable: true, dragOver: false },
            { value: '9', text: 'Text 3', draggable: true, dragOver: false }
          ]
        ],
        draggedCell: null
      };
    },
    methods: {
      startDrag(cell, rowIndex, cellIndex) {
        this.draggedCell = { cell, rowIndex, cellIndex };
        cell.draggable = true;
      },
      dragOver(event) {
        event.preventDefault();
      },
      dragEnter(cell) {
        cell.dragOver = true;
      },
      dragLeave(cell) {
        cell.dragOver = false;
      },
      drop(cell, rowIndex, cellIndex) {
        if (this.draggedCell) {
          const { cell: draggedCell, rowIndex: fromRow, cellIndex: fromCell } =
            this.draggedCell;
          const fromCellData = this.tableData[fromRow][fromCell];
          const toCellData = this.tableData[rowIndex][cellIndex];
  
          // Swap the dragged cell with the dropped cell
          this.$set(this.tableData[fromRow], fromCell, toCellData);
          this.$set(this.tableData[rowIndex], cellIndex, fromCellData);
  
          this.draggedCell = null;
          draggedCell.draggable = false;
          cell.dragOver = false;
        }
      }
    }
  };
  </script>
  
  <style>
  .drag-over {
    border: 2px dashed black;
  }
  </style>
