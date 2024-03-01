<template>
    <div class="table">
        <div class="row" v-for="colIndex in 7">
            <div class="cell" v-for="rowIndex in 4">
                <div>
                    Content {{ rowIndex }} {{ colIndex }}
                </div>
                <div v-for="div in getDiv(rowIndex, colIndex )" :id="'resizableDiv' + div.id"
                    :style="{ width: div.width + 'px', }"
                    style="background-color: var(--primary-light-color-1); margin-top: 5px; padding-left: 10px; box-sizing: border-box; position: relative; border-radius: 5px; ">
                    <span class="unselectable">{{ div.text }}</span>
                    <div class="resizable-bar left" @mousedown="startLeftResize($event, div.id, div.row, div.col)"></div>
                    <div class="resizable-bar right" @mousedown="startRightResize($event, div.id, div.row, div.col)"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            text: 'New Event',
            resizableDivs: [
                { id: 0, row: 1, col: 1, width: 380, text: 'Event 0' },
                { id: 1, row: 4, col: 6, width: 180, text: 'Event 1' },
                { id: 2, row: 4, col: 6, width: 180, text: 'Event 1' },
                { id: 3, row: 4, col: 5, width: 180, text: 'Event 1' },
            ],
            resizingIndex: -1,
            updateLoc: null,
            moveRightFunction: null,
            moveLeftFunction: null,

        }
    },
    methods: {
        getDiv(row, col) {
            console.log(row, col)
            if (this.resizableDivs.filter(div => div.row === row && div.col === col).length > 0) {
                console.log('found');
            }
            return this.resizableDivs.filter(div => div.row === row && div.col === col);
        },
        startRightResize(e, id, row, col) {
            e.preventDefault()
            this.resizingIndex = id
            this.moveRightFunction = event => this.moveRight(event, row, col)
            document.addEventListener('mousemove', this.moveRightFunction)
            document.addEventListener('mouseup', event => this.stopRightResize(event))
        },
        moveRight(e, row, col) {
            e.preventDefault()
            if (this.resizingIndex === -1) return // If no div is being resized, do nothing

            const div = document.getElementById('resizableDiv' + this.resizingIndex); 
            const columnWidth = 100
            let maxColumn = 7 - col + 1
            let minWidth = columnWidth
            let maxWidth = maxColumn * columnWidth
            
            let width = e.clientX - div.offsetLeft
            let nearestMultiple = Math.round(width / columnWidth)
            // console.log(nearestMultiple)

            
            width = nearestMultiple * columnWidth
            if (width < minWidth) {
                width = minWidth
            } else if (width > maxWidth) {
                width = maxWidth
            }
            
            this.resizableDivs[this.resizingIndex].width = width - 5; 

            let height = e.clientY - div.offsetHeight
            let nearestMultipleHeight = Math.round(height / 120)
            console.log(nearestMultipleHeight)
            
            if (nearestMultipleHeight > 1) {
                nearestMultipleHeight = 1
            }
        },
        stopRightResize() {
            this.resizingIndex = -1
            document.removeEventListener('mousemove', this.moveRightFunction)
            document.removeEventListener('mouseup', this.stopRightResize)
        },
        startLeftResize(e, id, row, col) {
            e.preventDefault()
            this.resizingIndex = id 
            this.moveLeftFunction = event => this.moveLeft(event, row, col)
            document.addEventListener('mousemove', this.moveLeftFunction)
            document.addEventListener('mouseup', event => this.stopLeftResize(event))

        },
        moveLeft(e, row, col) {
            e.preventDefault()
            if (this.resizingIndex === -1) return // If no div is being resized, do nothing

            const div = document.getElementById('resizableDiv' + this.resizingIndex); 
            const columnWidth = 100
            let maxColumn = col - 1

            let width = e.clientX - div.offsetLeft
            let nearestMultiple = Math.round(width / columnWidth)
            // console.log(nearestMultiple)
            nearestMultiple = -nearestMultiple

            let currentWidth = Math.round(this.resizableDivs[this.resizingIndex].width / columnWidth)

            if (currentWidth + nearestMultiple < 1) {
                nearestMultiple = 0
            } else if (maxColumn < nearestMultiple) {
                nearestMultiple = maxColumn
            }

            this.resizableDivs[this.resizingIndex].col -= nearestMultiple;
            this.resizableDivs[this.resizingIndex].width += nearestMultiple * columnWidth; 
        },
        stopLeftResize() {
            this.resizingIndex = -1
            document.removeEventListener('mousemove', this.moveLeftFunction)
            document.removeEventListener('mouseup', this.stopLeftResize)
        },

    },
}
</script>
  
<style scoped>
.table {
    display: grid;
    grid-template-columns: repeat(7, 200px);
    grid-auto-rows: 120px;
    gap: 0px;
}

.cell {
    border: 1px solid black;
    height: 100%;
    padding: 10px;
}

.resizable-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    cursor: col-resize;
}

.resizable-bar.left {
    left: 0;
}

.resizable-bar.right {
    right: 0;
}
</style>