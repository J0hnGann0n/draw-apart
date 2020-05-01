import { mount } from "@vue/test-utils"
import StartGame from '@/components/StartGame.vue'


describe('StartGame.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {

    mockStore = {
      dispatch: jest.fn()
    }
  })

  it('dispatches startGame && updatePlayerState when host clicks start and minimum two players joined', async () => {
    wrapper = mount(StartGame, {
      computed: {
        game() {
          return {
            players: {
              sdfsf: true,
              klj: true
            }
          }
        },
        isHost() {
          return true
        }
      },
      mocks: {
        $store: mockStore
      }
    })

    const button = wrapper.find('button');
    await button.trigger('click');

    //dispatch updatePlayerState
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "updatePlayerState", "drawing")

    //dispatch startGame
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "startGame")

  })

  it('shows error when there are less than two players and host tries to start game', async () => {
    wrapper = mount(StartGame, {
      computed: {
        game() {
          return {
            players: {
              sdfsf: true
            }
          }
        },
        isHost() {
          return true
        }
      },
      mocks: {
        $store: mockStore
      }
    })

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.vm.error).toBe(true);
    expect(wrapper.vm.errorMessage).toBe("You need at least another player");

  })
})