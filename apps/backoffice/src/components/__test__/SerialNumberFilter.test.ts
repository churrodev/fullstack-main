import { mount } from '@vue/test-utils'
import SerialNumberFilter from '@/components/SerialNumberFilter.vue'
import { describe, it, expect } from 'vitest'

describe('SerialNumberFilter.vue', () => {
  it('emite el evento correctamente', async () => {
    const wrapper = mount(SerialNumberFilter)
    const input = wrapper.find('input')

    await input.setValue('SN-96256-0')
    expect(wrapper.emitted().filter[0]).toEqual(['SN-96256-0'])
  })
})
