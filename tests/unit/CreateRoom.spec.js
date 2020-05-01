import { mount } from "@vue/test-utils"
import CreateRoom from '@/components/CreateRoom.vue'


describe('CreateRoom.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }

    wrapper = mount(CreateRoom, {
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