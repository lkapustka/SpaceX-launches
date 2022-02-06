import { shallowMount } from '@vue/test-utils'
import BaseInput from '../components/ui/BaseInput.vue'

describe('Base input', () => {
  const wrapper = shallowMount(BaseInput, {
    props: {
      label: 'Title',
      modelValue: 'Example',
      placeholder: 'Placeholder'
    },
  })
  it('renders a label equal to prop.label', () => {
    const label = wrapper.find('label')
    expect(label.text()).toBe('Title')
  })

  it('renders a text inside input equal to prop modelValue', () => {
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Example')
  })
})
