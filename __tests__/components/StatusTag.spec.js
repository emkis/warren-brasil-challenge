import { shallowMount } from '@vue/test-utils'
import StatusTag from '@/components/StatusTag'

describe('<StatusTag />', () => {
  it('should render component without errors', () => {
    shallowMount(StatusTag, {
      propsData: {
        status: { value: 'created', formatted: 'Criado' },
      },
    })
  })

  it('should render props correctly', () => {
    const wrapper = shallowMount(StatusTag, {
      propsData: {
        status: { value: 'processed', formatted: 'Processado' },
      },
    })

    expect(wrapper.element.className.includes('processed')).toBeTruthy()
    expect(wrapper.element.textContent.trim()).toBe('Processado')
  })
})
