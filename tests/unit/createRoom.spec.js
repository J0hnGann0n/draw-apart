import { mount } from "@vue/test-utils"
import createRoom from '@/components/CreateRoom.vue'


describe('CreateRoom.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }

    wrapper = mount(createRoom, {
      computed: {
        player() {
          return { name: 'playerName' }
        }
      },
      mocks: {
        $store: mockStore
      }
    })
  })

  it('dispatches createGame with player name from store state', async () => {

    const button = wrapper.find('button')
    button.trigger('click')

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "toggleSpinner")
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "createGame", "playerName")

  })

  it('tries to create a game but no username is permitted so an error shows up and createGame is not dispatched to the store', async () => {

    wrapper = mount(createRoom, {
      computed: {
        player() {
          return { name: '' }
        }
      },
      mocks: {
        $store: mockStore
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.find('.error').exists()).toBeTruthy()
    expect(wrapper.find('.error').text()).toBe('Choose a name first')

  })
})