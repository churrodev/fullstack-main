import Status from '@/components/ChargerStatus.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('Status.vue', () => {
  it.each`
  status | text
  ${10}  | ${'ready'}
  ${11}  | ${'ready'}
  ${20}  | ${'charging'}
  ${45}  | ${'error'}
  ${50}  | ${'error'}
  ${51}  | ${'error'}
  ${52}  | ${'error'}
  ${53}  | ${'error'}
  ${55}  | ${'error'}
  `('should render the component having the text $text when the prop is $status',
    async ({ status, text }) => {
      const wrapper = mount(Status, { props: { status } })

      expect(wrapper.text()).toEqual(text)
    })
})
