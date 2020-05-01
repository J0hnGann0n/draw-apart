import { shallowMount } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker.vue'

describe('ColorPicker.vue', () => {
  it('emits a select-color event containing a hex value on button click', async () => {
    const wrapper = shallowMount(ColorPicker)
    const button = wrapper.find('button')
    const hexColorPattern = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    await button.trigger('click')
    const emittedEvent = wrapper.emitted()['select-color']
    const emittedEventPayload = emittedEvent[0][0]
    expect(emittedEvent).toBeTruthy() // Check event exists
    expect(hexColorPattern.test(emittedEventPayload)).toBeTruthy() // Check payload contains hex color code
  })
})