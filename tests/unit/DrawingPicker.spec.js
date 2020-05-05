import { mount, createLocalVue } from "@vue/test-utils"
import DrawingPicker from '@/components/DrawingPicker.vue'
//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faArrowLeft, faArrowRight)
const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('DrawingPicker.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }
    wrapper = mount(DrawingPicker, {
      localVue,
      computed: {
        game() {
          return {
            combinations: {
              'a': { image: "" },
              'b': { image: "" }
            }
          }
        },
        player() {
          return { name: 'testUser' };
        },
        timeOver() {
          return false;
        }
      },
      mocks: {
        $store: mockStore
      }
    })

  })

  it('increments/decrements currentChoosen when pressing slide buttons', async () => {
    expect(wrapper.vm.currentChoosen).toBe(0)
    const slideBack = wrapper.find('.slide-back')
    const slideForward = wrapper.find('.slide-forward')

    await slideBack.trigger('click')
    expect(wrapper.vm.currentChoosen).toBe(0)

    await slideForward.trigger('click')
    expect(wrapper.vm.currentChoosen).toBe(1)
  })
  it('dispatches the correct event when pressing submitVote ', async () => {
    const submitVote = wrapper.find('button')
    await submitVote.trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith("updatePlayerState", "winner")
  })
})