import { shallowMount } from '@vue/test-utils'
import Vote from '@/components/Vote.vue'
import DrawingPicker from '@/components/DrawingPicker.vue'

describe('Vote.vue', () => {
  it('contains the correct elements', async () => {
    const wrapper = shallowMount(Vote)
    expect(wrapper.contains(DrawingPicker)).toBeTruthy
  })
})