import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './components/Dropdown/Dropdown';


const options = ['Zubat', 'Spearow', 'Nidoran']
const title = 'Selecione Pokemon'

describe('Dropdown', () => {

  it('Should start closed', () => {
  
    render(<Dropdown 
      title={title} 
      options={options}
      onSelect={() => {}}
       />);
  
       expect(screen.queryByText(options[0])).not.toBeInTheDocument();
       expect(screen.queryByText(options[1])).not.toBeInTheDocument();
       expect(screen.queryByText(options[2])).not.toBeInTheDocument();
  
  });

  it('Should start option when open', () => {
  
    render(<Dropdown 
      title={title} 
      options={options}
      onSelect={() => {}}
       />);

       const dropdownButton = screen.getByRole('button', {name: title})

       userEvent.click(dropdownButton)

       expect(screen.getByRole('menuitem', {name: options[0]})).toBeInTheDocument();
       expect(screen.getByRole('menuitem', {name: options[1]})).toBeInTheDocument();
       expect(screen.getByRole('menuitem', {name: options[2]})).toBeInTheDocument();  

  });


  it("Should signal an option was selected and closed the dropdown", () => {
    const onSelect = jest.fn()
    render(<Dropdown title={title} options={options} onSelect={onSelect} />);

    userEvent.click(screen.getByRole('button', {name: title}))

    const option0 = screen.getByRole("menuitem", { name: options[0] });
    const option1 = screen.getByRole("menuitem", { name: options[1] });
    const option2 = screen.getByRole("menuitem", { name: options[2] });

    expect(option0).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();

    userEvent.click(option1)
    
    expect(onSelect).toHaveBeenCalledWith(options[1])

    expect(screen.queryByText(options[0])).not.toBeInTheDocument();
    expect(screen.queryByText(options[1])).not.toBeInTheDocument();
    expect(screen.queryByText(options[2])).not.toBeInTheDocument();


  });


}) 



