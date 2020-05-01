import { mount } from "@vue/test-utils"
import StartGame from '@/components/StartGame.vue'


describe('StartGame.vue', () => {
  let mockStore;
  let wrapper;
  beforeEach(() => {

    process.env = Object.assign(process.env, { VUE_APP_DEBUG: false });

    mockStore = {
      dispatch: jest.fn()
    }

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
  })

  it('dispatches startGame && updatePlayerState when host clicks start and minimum two players joined', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');

    //dispatch updatePlayerState
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "updatePlayerState", "drawing")

    //dispatch startGame
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "startGame")

  })
})