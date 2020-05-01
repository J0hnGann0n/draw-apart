import { mount, createLocalVue } from "@vue/test-utils"
import ShowWinner from '@/components/ShowWinner.vue'

describe('ShowWinner.vue', () => {
  const localVue = createLocalVue();
  let mixin = {
    // change hook to "later" one to  make it work
    created() {
      return true
    }
  }

  localVue.mixin(mixin);
  let mockStore;
  let wrapper;
  beforeEach(() => {
    let methods = {
      unsubscribeGameObject: jest.fn()
    }
    mockStore = {
      dispatch: jest.fn()
    }
    wrapper = mount(ShowWinner, {
      localVue,
      methods,
      propsData: {
        game: {
          winner: {
            player: "TestUser",
            name: "test",
            imageData: ""
          }
        },
      },
      mocks: {
        $store: mockStore
      }
    })

  })

  it('has an img element', async () => {
    expect(wrapper.contains('img')).toBe(true)
  })
  it('dispatches playAgain event when playAgain is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mockStore.dispatch).toHaveBeenCalledWith("playAgain")
  })
})