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
      data() {
        return {
          joinDisabled: false,
          playername: ""
        }
      },
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

  it('it dispatches addPlayerName when playername has changed', async () => {
    wrapper.setData({ playername: "newPlayerName" })

    await wrapper.vm.$nextTick()

    //Dispatches JoinGame when username and gamecode exist
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "addPlayerName", "newPlayerName")

  })

  it('it dispaches toggleSpinner & joinGame and disables button when join button is clicked with username and gamecode', async () => {
    const button = wrapper.find('#joinGame')

    //set a gamecode
    wrapper.setData({ gamecode: 'xxxx' })
    await wrapper.vm.$nextTick()

    await button.trigger('click')
    //check if button is diabled
    expect(button.attributes('disabled')).toBeTruthy()

    //Spinner should be called
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "toggleSpinner")

    //Dispatches JoinGame when username and gamecode exist
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "joinGame", { gamecode: 'xxxx', player: 'playerName' })

  })

  it('shows only username input and join button when sharedGameCode is true and dispatches toggleSpinner & joinGame', async () => {

    //set a gamecode
    wrapper.setData({ gamecode: 'xxxx' })
    //set sharedGameCode to true
    wrapper.setProps({ sharedGameCode: true })

    await wrapper.vm.$nextTick()

    const button = wrapper.find('#joinGameWithSharedCode')

    //gamecode input shouldnt be shown
    expect(wrapper.find('#gamecode').isVisible()).toBe(false)

    await button.trigger('click')
    //check if button is diabled
    expect(button.attributes('disabled')).toBeTruthy()

    //Spinner should be called
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "toggleSpinner")

    //Dispatches JoinGame when username and gamecode exist
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "joinGame", { gamecode: 'xxxx', player: 'playerName' })

  })

  it('it shows an error message that gamecode is missing', async () => {
    const button = wrapper.find('#joinGame')

    await button.trigger('click')

    expect(wrapper.find('.error').exists()).toBeTruthy()
    expect(wrapper.find('.error').text()).toBe('You need fill in the game code to join')

  })

  it('it shows an error message that username is missing', async () => {
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