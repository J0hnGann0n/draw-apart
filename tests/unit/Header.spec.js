import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'


describe('Header.vue', () => {
  it('has a title element', async () => {
    let wrapper = shallowMount(Header, {
      computed: {
        game() {
          return {
            game: {
              state: {
                name: "lobby"
              }
            }
          }
        }
      },
    })
    expect(wrapper.contains('h4')).toBe(true)
  })
})