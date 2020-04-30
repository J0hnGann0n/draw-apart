import { mount } from "@vue/test-utils"
import CombinationNameInput from '@/components/CombinationNameInput.vue'
//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Vue from 'vue'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCheck)


describe('CombinationNameInput.vue', () => {
  it('dispatches updatePlayerState with "voting" string', async () => {
    const mockStore = {
      dispatch: jest.fn(),
      state: {
        combination: {
          image: ""
        }
      },
      getters: {
        getCountDownFinished: () => true
      }
    }
    const wrapper = mount(CombinationNameInput, {
      mocks: {
        $store: mockStore
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "updatePlayerState", "voting")

  })
})