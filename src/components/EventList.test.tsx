import {render, screen} from "@testing-library/react"
import {EventList} from "./EventList"

describe("EventList", () => {
    test("EventList renders", () => {
        render(<EventList />)
        screen.getByText("All")
        screen.getByText("Seminars")
        screen.getByText("Webinars")
    })
})