import { shallowMount } from '@vue/test-utils'
import Spinner from '@/components/Spinner.vue'

describe('Spinner.vue', () => {
  it('contains the correct elements', async () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.find('.lds-ellipsis')).toBeTruthy
  })
})