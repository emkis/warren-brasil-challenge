import { shallowMount } from '@vue/test-utils'
import AppInput from '@/components/AppInput'

describe('<AppInput />', () => {
  it('should render provided props correctly', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: {
        label: 'A really nice label',
        value: 'Lorem ipsum sit dolor',
        type: 'password',
      },
    })

    const Label = wrapper.find('label')
    const Input = wrapper.find('input')

    expect(Label.text()).toBe('A really nice label')
    expect(Input.element.value).toBe('Lorem ipsum sit dolor')
    expect(Input.element.type).toBe('password')
  })

  it('should set default type when "type" prop not provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: {
        label: 'A really nice label',
        value: 'Lorem ipsum sit dolor',
      },
    })

    const Input = wrapper.find('input')
    expect(Input.element.type).toBe('text')
  })
})
