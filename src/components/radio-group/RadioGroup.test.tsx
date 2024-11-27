import { fireEvent, render, screen } from '@testing-library/react';

import RadioGroup from './RadioGroup';

describe("RadioGroup", () => {
    test("RadioGroup switches when clicked", () => {
        // Initial Setup
        const handleClick = jest.fn()
        render(<RadioGroup options={["Option 1", "Option 2"]} value='Option 1' onChange={handleClick}/>)
        const option1 = screen.getByLabelText("Option 1")
        const option2 = screen.getByLabelText("Option 2")
        // Action
        fireEvent["click"](option2)
        // Expectations
        expect(handleClick).toBeCalledTimes(1)
        expect(handleClick).toBeCalledWith("Option 2")
        expect(option2).toHaveProperty("checked", true)
        expect(option1).toHaveProperty("checked", false)
    })
})
