import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Form/components/Input.vue'
import Button from '@/components/Button.vue'

describe('Form', () => {
  it('should render form correctly', () => {
    const component = defineComponent({
      render: () => <Form>Form Content</Form>,
    })
    const wrapper = mount(component)
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.text()).toContain('Form Content')
  })

  it('should render with slot content', () => {
    const component = defineComponent({
      render: () => (
        <Form>
          <div class="test-content">
            <p>Test Form</p>
          </div>
        </Form>
      ),
    })
    const wrapper = mount(component)
    expect(wrapper.find('.test-content').exists()).toBeTruthy()
    expect(wrapper.text()).toContain('Test Form')
  })

  it('should accept form attributes', () => {
    const component = defineComponent({
      render: () => (
        <Form data-testid="test-form" x-data="test">
          <div>Content</div>
        </Form>
      ),
    })
    const wrapper = mount(component)
    expect(wrapper.attributes('data-testid')).toBe('test-form')
    expect(wrapper.attributes('x-data')).toBe('test')
  })
})

describe('FormItem', () => {
  it('should render form item correctly', () => {
    const component = defineComponent({
      render: () => (
        <FormItem>
          <input type="text" />
        </FormItem>
      ),
    })
    const wrapper = mount(component)
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('should render with label', () => {
    const component = defineComponent({
      render: () => (
        <FormItem label="Username">
          <input type="text" />
        </FormItem>
      ),
    })
    const wrapper = mount(component)
    expect(wrapper.find('label').exists()).toBeTruthy()
    expect(wrapper.text()).toContain('Username')
  })

  it('should render without label when label prop is not provided', () => {
    const component = defineComponent({
      render: () => (
        <FormItem>
          <input type="text" />
        </FormItem>
      ),
    })
    const wrapper = mount(component)
    expect(wrapper.find('label').exists()).toBeFalsy()
  })

  it('should match label for attribute with label prop', () => {
    const component = defineComponent({
      render: () => (
        <FormItem label="Password">
          <input type="password" />
        </FormItem>
      ),
    })
    const wrapper = mount(component)
    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe('Password')
  })
})

describe('Form with FormItem', () => {
  it('should render form with multiple form items', () => {
    const component = defineComponent({
      render: () => (
        <Form>
          <FormItem label="Name">
            <Input placeholder="Enter your name" />
          </FormItem>
          <FormItem label="Email">
            <Input placeholder="Enter your email" />
          </FormItem>
        </Form>
      ),
    })
    const wrapper = mount(component)

    expect(wrapper.findAll('label')).toHaveLength(2)
    expect(wrapper.findAll('input')).toHaveLength(2)
  })

  it('should render form with form items and buttons', () => {
    const component = defineComponent({
      render: () => (
        <Form>
          <FormItem label="Username">
            <Input />
          </FormItem>
          <div class="flex gap-12pt">
            <Button>Submit</Button>
            <Button mode="dashed">Cancel</Button>
          </div>
        </Form>
      ),
    })
    const wrapper = mount(component)

    expect(wrapper.findAll('label')).toHaveLength(1)
    expect(wrapper.findAll('button')).toHaveLength(2)
    expect(wrapper.text()).toContain('Submit')
    expect(wrapper.text()).toContain('Cancel')
  })
})

describe('Form with v-model binding', () => {
  it('should bind input value with v-model', async () => {
    const TestComponent = defineComponent({
      setup () {
        const username = ref('')
        return { username }
      },
      render () {
        return (
          <Form>
            <FormItem label="Username">
              <Input v-model={ this.username } />
            </FormItem>
            <div>{this.username}</div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const input = wrapper.find('input')

    await input.setValue('testuser')
    expect(wrapper.text()).toContain('testuser')
    expect(wrapper.vm.username).toBe('testuser')
  })

  it('should handle multiple form inputs with v-model', async () => {
    const TestComponent = defineComponent({
      setup () {
        const formData = ref({
          name: '',
          email: '',
        })
        return { formData }
      },
      render () {
        return (
          <Form>
            <FormItem label="Name">
              <Input v-model={ this.formData.name } />
            </FormItem>
            <FormItem label="Email">
              <Input v-model={ this.formData.email } />
            </FormItem>
            <div class="output">
              <p>Name: {this.formData.name}</p>
              <p>Email: {this.formData.email}</p>
            </div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const inputs = wrapper.findAll('input')

    await inputs[0]!.setValue('John Doe')
    await inputs[1]!.setValue('john@example.com')

    expect(wrapper.text()).toContain('Name: John Doe')
    expect(wrapper.text()).toContain('Email: john@example.com')
  })

  it('should support input suffix in v-model binding', async () => {
    const TestComponent = defineComponent({
      setup () {
        const price = ref('')
        return { price }
      },
      render () {
        return (
          <Form>
            <FormItem label="Price">
              <Input v-model={ this.price } suffix="USD" />
            </FormItem>
            <div>{this.price}</div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const input = wrapper.find('input')

    await input.setValue('99.99')
    expect(wrapper.text()).toContain('99.99')
    expect(wrapper.text()).toContain('USD')
  })
})

describe('Form with Button interactions', () => {
  it('should emit click event from button in form', async () => {
    const TestComponent = defineComponent({
      setup () {
        const submitted = ref(false)
        const handleSubmit = () => {
          submitted.value = true
        }
        return { submitted, handleSubmit }
      },
      render () {
        return (
          <Form>
            <FormItem label="Username">
              <Input />
            </FormItem>
            <Button onClick={ this.handleSubmit }>Submit</Button>
            {this.submitted && <div class="success">Form submitted!</div>}
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.text()).toContain('Form submitted!')
  })

  it('should handle multiple button actions in form', async () => {
    const TestComponent = defineComponent({
      setup () {
        const action = ref('')
        const handleSubmit = () => {
          action.value = 'submitted'
        }
        const handleReset = () => {
          action.value = 'reset'
        }
        return { action, handleSubmit, handleReset }
      },
      render () {
        return (
          <Form>
            <FormItem label="Username">
              <Input />
            </FormItem>
            <div class="flex gap-12pt">
              <Button onClick={ this.handleSubmit }>Submit</Button>
              <Button mode="dashed" onClick={ this.handleReset }>Reset</Button>
            </div>
            {this.action && <div class="status">{this.action}</div>}
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const buttons = wrapper.findAll('button')

    await buttons[0]!.trigger('click')
    expect(wrapper.text()).toContain('submitted')

    await buttons[1]!.trigger('click')
    expect(wrapper.text()).toContain('reset')
  })
})

describe('Complete form scenario with JSX', () => {
  it('should render complete form with all components using TSX', async () => {
    const TestComponent = defineComponent({
      setup () {
        const formData = ref({
          username: '',
          email: '',
          password: '',
        })

        const handleSubmit = () => {
          // Form submission logic
        }

        return { formData, handleSubmit }
      },
      render () {
        return (
          <Form>
            <FormItem label="Username">
              <Input
                v-model={ this.formData.username }
                placeholder="Enter username"
              />
            </FormItem>
            <FormItem label="Email">
              <Input
                v-model={ this.formData.email }
                placeholder="Enter email"
              />
            </FormItem>
            <FormItem label="Password">
              <Input
                v-model={ this.formData.password }
                type="password"
                placeholder="Enter password"
              />
            </FormItem>
            <div class="flex gap-12pt">
              <Button onClick={ this.handleSubmit }>Sign Up</Button>
              <Button mode="dashed">Cancel</Button>
            </div>
            <div class="form-data">
              <p>Username: {this.formData.username}</p>
              <p>Email: {this.formData.email}</p>
            </div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)

    expect(wrapper.findAll('input')).toHaveLength(3)
    expect(wrapper.findAll('button')).toHaveLength(2)

    const inputs = wrapper.findAll('input')
    await inputs[0]!.setValue('johndoe')
    await inputs[1]!.setValue('john@example.com')
    await inputs[2]!.setValue('password123')

    expect(wrapper.text()).toContain('Username: johndoe')
    expect(wrapper.text()).toContain('Email: john@example.com')
  })

  it('should render form with different button sizes using JSX', () => {
    const TestComponent = defineComponent({
      render () {
        return (
          <Form>
            <FormItem label="Username">
              <Input placeholder="Enter username" />
            </FormItem>
            <div class="flex gap-12pt">
              <Button size="medium">Submit</Button>
              <Button size="small" mode="dashed">
                Cancel
              </Button>
            </div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)

    const buttons = wrapper.findAll('button')
    expect(buttons[0]!.classes()).toContain('medium')
    expect(buttons[1]!.classes()).toContain('small')
    expect(buttons[1]!.classes()).toContain('mode-dashed')
  })

  it('should handle form with input suffix using JSX', async () => {
    const TestComponent = defineComponent({
      setup () {
        const amount = ref('')
        return { amount }
      },
      render () {
        return (
          <Form>
            <FormItem label="Amount">
              <Input v-model={ this.amount } suffix="$" />
            </FormItem>
            <div class="output">{this.amount}</div>
          </Form>
        )
      },
    })

    const wrapper = mount(TestComponent)
    const input = wrapper.find('input')

    await input.setValue('100')
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('$')
  })
})
