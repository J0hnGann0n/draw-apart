import { mount } from "@vue/test-utils"
import createRoom from '@/components/createRoom.vue'


describe('createRoom.vue', () => {
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
})