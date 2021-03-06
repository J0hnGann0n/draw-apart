import { mount, createLocalVue } from "@vue/test-utils"
import { canvasMock } from './common/canvas'
import CombinationPicker from '@/components/CombinationPicker.vue'

//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const localVue = createLocalVue();
library.add(faCheck, faArrowLeft, faArrowRight)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('CombinationPicker.vue', () => {
  let mockStore;
  let wrapper;
  let methods = {
    getCanvasDOM: () => canvasMock
  }
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }
    wrapper = mount(CombinationPicker, {
      localVue,
      methods,
      data() {
        return {
          bodyParts: ["head", "body", "legs", "feet"],
          combination: {
            head: 0,
            body: 0,
            legs: 0,
            feet: 0
          }
        }
      },
      computed: {
        countDownFinished() {
          return false
        },
        combinationPicked() {
          return false
        },
        drawings() {
          return {
            head: [{ imageData: '' }, { imageData: '' }],
            body: [{ imageData: '' }, { imageData: '' }],
            legs: [{ imageData: '' }, { imageData: '' }],
            feet: [{ imageData: '' }, { imageData: '' }],
          }
        }
      },
      mocks: {
        $store: mockStore
      }
    })

  })

  it('changes combination[bodypart] to next one up (+1) when more than one combination for bodypart and slides back again', async () => {
    const headElement = wrapper.find({ ref: 'bodypart-slider-0' })
    const slideForward = headElement.find('.slideForward')
    const oldPickedHeadCombination = wrapper.vm.combination['head']
    await slideForward.trigger("click")
    expect(wrapper.vm.combination['head']).toBe(oldPickedHeadCombination + 1)

    const slideBack = headElement.find('.slideBack')
    await slideBack.trigger("click")
    expect(wrapper.vm.combination['head']).toBe(oldPickedHeadCombination)

  })

  it('dispatches addCombination to the store when submitButton is clicked', async () => {
    const submitButton = wrapper.find('button');
    await submitButton.trigger('click');

    //dispatch addCombination
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "addCombination", {})

  })

})