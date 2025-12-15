import ViewTransitions from '@/components/web/ViewTransitions.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('ViewTransitions Component', () => {
  let originalStartViewTransition: typeof document.startViewTransition

  beforeEach(() => {
    originalStartViewTransition = document.startViewTransition
  })

  afterEach(() => {
    document.startViewTransition = originalStartViewTransition
    vi.restoreAllMocks()
  })

  it('has initial dark mode and toggles on button click (no startViewTransition)', async () => {
    const wrapper = mount(ViewTransitions)
    expect(wrapper.classes()).toContain('view-transitions-dark')
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('view-transitions-dark')
  })

  it('uses document.startViewTransition when available and toggles', async () => {
    const mock = vi.fn((cb: () => void) => ({
      ready: Promise.resolve().then(cb),
      finished: Promise.resolve(),
      types: new Set<string>(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: () => {},
    }))

    document.startViewTransition = mock
    const wrapper = mount(ViewTransitions)
    expect(wrapper.classes()).toContain('view-transitions-dark')
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mock).toHaveBeenCalled()
    expect(wrapper.classes()).not.toContain('view-transitions-dark')
  })
})
