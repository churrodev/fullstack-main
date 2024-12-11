import Tabs from '@/components/TabsContainer.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('Status.vue', () => {
  it('should render the component parsing the options given by prop',
    async () => {
      const options = [
        { key: 'tab1', name: 'tab 1' },
        { key: 'tab2', name: 'tab 2' }
      ]

      const wrapper = mount(Tabs, { props: { options } })
      const tabs = wrapper.findAll('[data-test-id="tab"]')

      expect(tabs[0].text()).toEqual('tab 1')
      expect(tabs[1].text()).toEqual('tab 2')

      await tabs[0].trigger('click')

      expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual('tab1')
    })
})
