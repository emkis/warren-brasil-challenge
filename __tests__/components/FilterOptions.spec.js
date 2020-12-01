import { shallowMount } from '@vue/test-utils'
import FilterOptions from '@/components/FilterOptions'

describe('<FilterOptions />', () => {
  it('should render component without errors', () => {
    shallowMount(FilterOptions, {
      propsData: {
        options: [
          { name: 'Inicial', value: 'initial' },
          { name: 'Reais', value: 'brl' },
        ],
      },
    })
  })

  it('should render options correctly', () => {
    const wrapper = shallowMount(FilterOptions, {
      propsData: {
        value: 'initial',
        options: [
          { name: 'Inicial', value: 'initial' },
          { name: 'Reais', value: 'brl' },
        ],
      },
    })

    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.element.children[0].textContent.trim()).toBe('Inicial')
    expect(wrapper.element.children[1].textContent.trim()).toBe('Reais')
  })

  it('should set active option if "value" prop is provided', () => {
    const initialValue = 'initial'

    const wrapper = shallowMount(FilterOptions, {
      propsData: {
        value: initialValue,
        options: [
          { name: 'Inicial', value: initialValue },
          { name: 'Reais', value: 'brl' },
        ],
      },
    })

    expect(wrapper.vm.activeOption).toBe(initialValue)
  })

  it('should set active option when clicked in a option that is not active', async () => {
    const initialValue = 'hello'

    const wrapper = shallowMount(FilterOptions, {
      propsData: {
        value: initialValue,
        options: [
          { name: 'Hello', value: initialValue },
          { name: 'There', value: 'there' },
        ],
      },
    })

    const initialState = wrapper.vm.activeOption
    const optionButton = wrapper.findAll('button').at(1)

    await optionButton.trigger('click')

    const currentState = wrapper.vm.activeOption

    expect(currentState).not.toBe(initialState)
    expect(currentState).toBe('there')
  })
})
