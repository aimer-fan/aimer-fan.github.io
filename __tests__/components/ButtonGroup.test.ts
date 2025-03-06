import { mount } from '@vue/test-utils'
import ButtonGroup from '@/components/Form/components/ButtonGroup.vue'
import { describe, it, expect } from 'vitest'

describe('ButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        dataSource: ['Button1', 'Button2', 'Button3'],
      },
    })
    // should contain 3 buttons
    expect(wrapper.findAll('button').length).toBe(3)
    // should contain button text
    expect(wrapper.text()).toContain('Button1')
    expect(wrapper.text()).toContain('Button2')
    expect(wrapper.text()).toContain('Button3')
  })

  it('should emit click event', async () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        dataSource: ['Button1', 'Button2', 'Button3'],
      },
    })
    await wrapper.findAll('button')[1].trigger('click')
    // should emit click event and value should be Button2
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Button2'])
  })

  it('should render correctly when data is object', () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        dataSource: [
          { label: 'Button1', value: 'button1' },
          { label: 'Button2', value: 'button2' },
          { label: 'Button3', value: 'button3' },
        ],
      },
    })
    // should contain 3 buttons
    expect(wrapper.findAll('button').length).toBe(3)
    // should contain button text
    expect(wrapper.text()).toContain('Button1')
    expect(wrapper.text()).toContain('Button2')
    expect(wrapper.text()).toContain('Button3')
  })

  it('should emit click event when data is object', async () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        dataSource: [
          { label: 'Button1', value: 'button1' },
          { label: 'Button2', value: 'button2' },
          { label: 'Button3', value: 'button3' },
        ],
      },
    })
    await wrapper.findAll('button')[1].trigger('click')
    // should emit click event and value should be { label: 'Button2', value: 'button2' }
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([{ label: 'Button2', value: 'button2' }])
  })
})
