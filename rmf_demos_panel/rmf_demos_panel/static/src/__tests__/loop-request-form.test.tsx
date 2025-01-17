import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoopRequestForm from '../components/forms/loop-request-form';

describe('Loop Request Form', () => {
    let root: ReturnType<typeof renderForm>;
    let submitRequest = jest.fn();
     let setTimeError = jest.fn();
    let setMinsFromNow = jest.fn();
    let minsFromNow = 0;
    let priority = 0;
    let timeAndPriority = { minsFromNow, priority, setTimeError, setMinsFromNow}
    
    function renderForm() {
        const availablePlaces = ['place1', 'place2'];
        return render(<LoopRequestForm availablePlaces={availablePlaces} submitRequest={submitRequest} timeAndPriority={timeAndPriority}/>);
    }
    
    beforeEach(() => {
        root = renderForm();
    });
    
    test("should render", () => {
        expect(screen.getByRole('loop-request-form')).toBeInTheDocument();
    });

    test("should render error messages when invalid form is submitted", () => {
        const submitButton = screen.getByText('Submit Request');
        fireEvent.click(submitButton);
        expect(root.container.querySelector('.MuiFormHelperText-root.Mui-error')).toBeTruthy();
    });

    test("should submit a valid form", () => {
        const submitButton = screen.getByText('Submit Request');
        userEvent.click(root.getByLabelText('Select start location'));
        userEvent.click(within(screen.getAllByRole('listbox')[0]).getByText('place1'));
        userEvent.click(root.getByLabelText('Select end location'));
        userEvent.click(within(screen.getAllByRole('listbox')[0]).getByText('place2'));
        fireEvent.click(submitButton);
        expect(submitRequest).toHaveBeenCalled();
    });
});
