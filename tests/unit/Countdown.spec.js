import { shallowMount } from '@vue/test-utils'
import Countdown from '@/components/Countdown.vue'

describe('Countdown.vue', () => {
  it('dispatches startCountDown when startCountDOwn method is run', async () => {
    const mockStore = {
      dispatch: jest.fn(),
    }
    const wrapper = shallowMount(Countdown, {
      computed: {
        startTime() {
          return ""
        },
        game() {
          return {
            state: { name: "drawing" },
            countDown: {
              drawing: 2,
              combination: 40,
              voting: 30,
              startTime: new Date().getTime()
            }
          }
        }
      },
      mocks: {
        $store: mockStore
      }
    })
    jest.useFakeTimers()
    let date = new Date()
    let newStartTime = date.getTime()
    await wrapper.vm.startCountdown(newStartTime)

    expect(mockStore.dispatch).toHaveBeenCalledWith("startCountdown")
    expect(wrapper.vm.timeleft).toEqual(2)
    jest.runOnlyPendingTimers() // Allow jests fake timer to pass time and then test the setInterval function in startCountdown
    expect(wrapper.vm.timeleft).toEqual(1)
  })
})