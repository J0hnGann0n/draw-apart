import { shallowMount, createLocalVue } from '@vue/test-utils'
import User from '@/components/User.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faUndo, faTrash)
const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe('Spinner.vue', () => {
  it('contains the correct elements', async () => {
    const wrapper = shallowMount(User, {
      localVue
    })
    expect(wrapper.contains(FontAwesomeIcon)).toBeTruthy
  })
})