import { mount } from "@vue/test-utils"
import createRoom from '@/components/createRoom.vue'


describe('createRoom.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      state: {
        player: {
          name: 'playerName'
        }
      },
      dispatch: jest.fn(),
      getters: {}
    }

    wrapper = mount(createRoom, {
      computed: {},
      mocks: {
        $store: mockStore
      }
    })
  })

  it('dispatches createGame with player name from store state. if there is no playername it gives an error', async () => {

    const button = wrapper.find('button')
    button.trigger('click')

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "toggleSpinner")
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "createGame", "playerName")

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