import { mount } from '@vue/test-utils'
import GameCode from '@/components/GameCode.vue'
//Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faShareAlt } from '@fortawesome/free-solid-svg-icons'
//Import vue
import Vue from 'vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCheck, faShareAlt)
var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);

describe('GameCode.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(GameCode, {
      propsData: {
        game: {
          code: 'abcd',
          players: ['fuck', 'this']
        }
      }
    })
  })
  it('toggles the value of showShareButtons on button click', async () => {
    expect(wrapper.contains('span')).toBe(true)
    const button = wrapper.find('#share-button')
    expect(wrapper.vm.showShareButtons).toBeFalsy
    await button.trigger('click')
    expect(wrapper.vm.showShareButtons).toBeTruthy
  })
  it('returns a string when shareDescription is called', async () => {
    let shareDescription = wrapper.vm.shareDescription
    expect(shareDescription).toBeTruthy
  })
})