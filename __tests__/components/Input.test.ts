import Input from '@/components/Form/components/Input.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('should emit input event', async () => {
    const wrapper = mount(Input)
    await wrapper.find('input').setValue('test')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test'])
  })

  it('should render correctly with suffix', () => {
    const wrapper = mount(Input, {
      props: {
        suffix: '$',
      },
    })
    expect(wrapper.text()).toContain('$')
  })

  it('should contain right attribute', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'test',
      },
      attrs: {
        'x-data': 'test',
      },
    })
    expect(wrapper.get('input').attributes('placeholder')).toContain('test')
    expect(wrapper.get('input').attributes('x-data')).toContain('test')
  })
})
