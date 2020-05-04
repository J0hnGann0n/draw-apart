import { mount, createLocalVue } from "@vue/test-utils"
import DrawingPanel from '@/components/DrawingPanel.vue'
import Vue2TouchEvents from "vue2-touch-events";
import { canvasMock } from './common/canvas'
//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faUndo, faTrash)
const localVue = createLocalVue();
localVue.use(Vue2TouchEvents);
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('DrawingPanel.vue', () => {
  let mockStore;
  let wrapper;
  let methods = {
    getCanvasDOM: () => canvasMock
  }
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }
    wrapper = mount(DrawingPanel, {
      localVue,
      methods,
      computed: {
        timeOver() {
          return false
        }
      },
      mocks: {
        $store: mockStore
      }
    })

  })

  it('has a div element', async () => {
    expect(wrapper.contains('div')).toBe(true)
  })
  it('increments drawingCount, adds a drawing and submits drawings when clicking submit', async () => {
    expect(wrapper.vm.drawingCount).toBe(0)

    const submitDrawingButton = wrapper.find('.submit-drawing')
    await submitDrawingButton.trigger('click')

    expect(wrapper.vm.drawingCount).toBe(1)
    expect(wrapper.vm.drawings.length).toBe(1)

    wrapper.setData({ drawingCount: 4 })
    await submitDrawingButton.trigger('click')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, "submitDrawings", wrapper.vm.drawings)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, "updatePlayerState", "combination")
  })
  it('removes an element from canvas history when clicking undo', async () => {
    wrapper.setData({ canvasHistory: [1] })
    const undoButton = wrapper.find('.undo')
    await undoButton.trigger('click')

    expect(wrapper.vm.canvasHistory.length).toBe(0)
  })
})