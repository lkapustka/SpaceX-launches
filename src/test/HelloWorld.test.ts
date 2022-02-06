import { shallowMount } from '@vue/test-utils'
import Counter from '../components/Counter.vue'

test('counter test', async () => {
  const wrapper = shallowMount(Counter)
  const paragraph = wrapper.get('p')

  expect(paragraph.text()).toBe('Count: 0')

  const btn = wrapper.get('button')
  await btn.trigger('click')
  await btn.trigger('click')

  expect(paragraph.text()).toBe('Count: 2')
})
