import { mount } from "@vue/test-utils"
import CombinationNameInput from '@/components/CombinationNameInput.vue'
//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
//Import vue
import Vue from 'vue'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCheck)


describe('CombinationNameInput.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
      getters: {
        getCountDownFinished: () => true,
        getCombinationImage: () => ""
      }
    }
    wrapper = mount(CombinationNameInput, {
      mocks: {
        $store: mockStore
      }
    })
  })

  it('dispatches updatePlayerState with "voting" string', async () => {
    const button = wrapper.find('button')
    button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "updatePlayerState", "voting")

  })

  it('dispatches submitCombination with the this.name', async () => {
    wrapper.setData({ name: 'name' })
    const button = wrapper.find('button')
    button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "submitCombination", 'name')
  })
})