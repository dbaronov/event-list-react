import { render, screen } from '@testing-library/react';

import { TextSearch }  from "./TextSearch";

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
    it("Counter displays '. . .' with no events passed", () => {
        render(<TextSearch events={[]} value='' onChange={() => {}} />)
        screen.getByText(". . .")
    })

    it("Counter displays count of passed events", () => {
        const arrayOfEvents = [getMockEvent(), getMockEvent(), getMockEvent()]
        const arrayLength = arrayOfEvents.length

        render(<TextSearch events={ arrayOfEvents } value='' onChange={() => {}} />)
        screen.getByText(arrayLength.toString())
    })
})
