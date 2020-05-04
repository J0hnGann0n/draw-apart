import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'
import User from '@/components/User.vue'

describe('UserList.vue', () => {
  it('contains the correct elements', async () => {
    const wrapper = shallowMount(UserList, {
      propsData: {
        game: {
          players: {
            TestUser: true
          }
        }
      }
    })
    expect(wrapper.contains(User)).toBeTruthy
  })
})