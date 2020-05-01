import { mount } from "@vue/test-utils"
import JoinGame from '@/components/JoinGame.vue'


describe('JoinGame.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    }

    wrapper = mount(JoinGame, {
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

  it('fills in a gamecode and username and clicks join, spinner loads and dispatches joinGame in the store', async () => {
    const button = wrapper.find('#joinGame')

    //set a gamecode
    wrapper.setData({ gamecode: 'xxxx' })
    await wrapper.vm.$nextTick()

    await button.trigger('click')

    //Spinner should be called
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "toggleSpinner")

    //Dispatches JoinGame when username and gamecode exist
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "joinGame", { gamecode: 'xxxx', player: 'playerName' })

  })

  it('fills in a username but no gamecode and clicks join and it shows an error message that code is missing', async () => {
    const button = wrapper.find('#joinGame')

    await button.trigger('click')

    expect(wrapper.find('.error').exists()).toBeTruthy()
    expect(wrapper.find('.error').text()).toBe('You need fill in the game code to join')

  })

  it('fills in a gamecode but no username and clicks join and it shows an error message that username is missing', async () => {
    //set wrapper with no player
    wrapper = mount(JoinGame, {
      computed: {
        player() {
          return { name: '' }
        }
      },
      mocks: {
        $store: mockStore
      }
    })

    const button = wrapper.find('#joinGame')

    //set a gamecode
    wrapper.setData({ gamecode: 'xxxx' })
    await wrapper.vm.$nextTick()

    await button.trigger('click')

    expect(wrapper.find('.error').exists()).toBeTruthy()
    expect(wrapper.find('.error').text()).toBe('You need to choose a username first')

  })
})