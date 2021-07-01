const { shallow } = require("enzyme")
const { Input } = require("../../../components/auth/Input")

describe('Pruebas en el <Input />', () => {
  const handleInputChange = jest.fn();
  const wrapper = shallow(
    <Input 
      required={true} 
      autoComplete="false"
      labelText="Nombre:"
      placeholder="Name"
      name="name"
      type="text" 
      value=""
      handleInputChange={handleInputChange}
      expresionRegular={/^.{5,40}$/}
      errorMessage="Nombre no valido"  
    />
  )

  test('Debe de cargar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe de llamar la función handleInputChange', () => {
    wrapper.find('input').simulate('change');
    
    expect(handleInputChange).toHaveBeenCalled();
  })
  
  test('No debe de mostrar el mensaje de error', () => {
    expect(wrapper.find('.auth__error-message').exists()).toBe(false);
  })
})