import { mount } from '@vue/test-utils'
import Button from '../../components/Button.vue'
import { describe, expect, it } from 'vitest'

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
    })
    expect(wrapper.text()).toContain('Button')
  })

  it('should emit click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('should have correct class', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
    })
    expect(wrapper.classes()).toContain('btn')
  })

  it('should have correct size class', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
      props: {
        size: 'small',
      },
    })
    expect(wrapper.classes()).toContain('small')
  })

  it('should have correct mode class', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
      props: {
        mode: 'dashed',
      },
    })
    expect(wrapper.classes()).toContain('mode-dashed')
  })

  it('should have correct shape class', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'Button',
      },
      props: {
        shape: 'square',
      },
    })
    expect(wrapper.classes()).toContain('shape-square')
  })
})
