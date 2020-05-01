import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'


describe('Header.vue', () => {
  it('has a title element', async () => {
    let wrapper = shallowMount(Header, {
      computed: {
        game() {
          return {
            game: {
              state: "lobby"
            }
          }
        }
      },
    })
    expect(wrapper.contains('h4')).toBe(true)
  })
  it('sets showCountdown to correct value', async () => {
    let wrapper = shallowMount(Header, {
      computed: {
        game() {
          return {
            game: {
              state: "lobby"
            }
          }
        }
      },
    })
    expect(wrapper.vm.showCountdown).toBeFalsy
  })
  it('sets showCountdown to correct value', async () => {
    let wrapper = shallowMount(Header, {
      computed: {
        game() {
          return {
            game: {
              state: "drawing"
            }
          }
        }
      },
    })
    expect(wrapper.vm.showCountdown).toBeTruthy
  })
})