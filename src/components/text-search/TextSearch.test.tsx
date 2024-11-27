import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import { TextSearch } from './TextSearch';

const getMockEvent = () => ({
    eventTitle: "string" + Math.floor(Math.random() * 10),
    eventLabel: "string",
    eventLableClass: "string",
    eventLink: "string",
    title: "string",
    dateType: 1736874000000,
    imgPath: "string",
    eventDetailDescription: "string" + Math.floor(Math.random() * 10),
    tagIds: ["string"  + Math.floor(Math.random() * 10), "string1"  + Math.floor(Math.random() * 10), "string22"  + Math.floor(Math.random() * 10)],
    randomId: "string",
    lastModifiedDate: 1723467103335
})

describe("TextSearch", () => {
    test("Text search results counter is 0 when no events are given", () => {
        render(<TextSearch events={[]} value='' onChange={() => {}}/>)
        screen.getByText(". . .")
    })

    test("Text search results counter greater then 0 when some events are given", () => {
        render(<TextSearch events={[getMockEvent(), getMockEvent()]} value='' onChange={() => {}}/>)
        screen.getByRole('button', { name: '2' })
    })
})
