import { shallowMount } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker.vue'

describe('ColorPicker.vue', () => {
  it('button click should emit select-color event', async () => {
    const wrapper = shallowMount(ColorPicker)
    const button = wrapper.find('button')
    const hexColorPattern = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    button.trigger('click')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled
    const emittedEvent = wrapper.emitted()['select-color']
    const emittedEventPayload = emittedEvent[0][0]
    expect(emittedEvent).toBeTruthy() // Check event exists
    expect(hexColorPattern.test(emittedEventPayload)).toBeTruthy() // Check payload contains hex color code
  })
})