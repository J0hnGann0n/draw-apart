import { shallowMount } from '@vue/test-utils'
import Lobby from '@/components/Lobby.vue'
import StartGame from '@/components/StartGame.vue'
import GameCode from '@/components/GameCode.vue'
import UserList from '@/components/UserList.vue'

describe('StartGame.vue', () => {
  it('contains the correct elements', async () => {
    const wrapper = shallowMount(Lobby)
    expect(wrapper.contains('h1')).toBeTruthy()
    expect(wrapper.contains(StartGame)).toBeTruthy()
    expect(wrapper.contains(GameCode)).toBeTruthy()
    expect(wrapper.contains(UserList)).toBeTruthy()
  })
})