import data from './data/data.json';
import { eventsFilter } from './eventsFilter';

const testEvents = [
    {
        "eventTitle": "Seminar",
        "eventLabel": "On Demand",
        "eventLableClass": "on-demand",
        "eventLink": "/content/mma/americas/us/en_us/events/details/webinar-retaining-talent-and-the-importance-of-return-to-work-in-todays-market.html",
        "title": "Retaining talent the importance of return to work in today's market",
        "dateType": 1656478800000,
        "imgPath": "/content/dam/marsh-mclennan-agency-us/images/events/thumbnail/event-thumbnail-allyship-373511095-051222-477x358.jpg",
        "eventDetailDescription": "Learn the importance of talent retention and return-to-work strategies in today\u0027s market.",
        "tagIds": [
            "mma-industries:staffing",
            "mma-content-types:events",
            "mma-year:2022",
            "mma-subcontent-types:on-demand",
            "mma-subcontent-types:webinar",
            "mma-solutions:claims-management"
        ],
        "randomId": "769e5894-141f-49fa-bece-36d09d7a27a5",
        "lastModifiedDate": 1709911174232
    },
    {
        "eventTitle": "Webinar",
        "eventLabel": "On Demand",
        "eventLableClass": "on-demand",
        "eventLink": "/content/mma/americas/us/en_us/events/details/webinar-path-to-transparency-in-coverage-TiC-what-employers-need-to-know-to-remain-compliant-on-july-1-2022.html",
        "title": "Path to Transparency in Coverage (TiC): What employers need to know to remain compliant on July 1, 2022",
        "dateType": 1653541200000,
        "imgPath": "/content/dam/marsh-mclennan-agency-us/images/events/thumbnail/event-thumbnail-business-ins-148429168-051222-477x358.jpg",
        "eventDetailDescription": "Stay compliant with the Transparency in Coverage rule. Join our webinar to understand requirements for employers.",
        "tagIds": [
            "mma-subcontent-types:compliance",
            "mma-content-types:events",
            "mma-regions:national",
            "mma-solutions:compliance-support-and-oversight",
            "mma-year:2022",
            "mma-subcontent-types:on-demand"
        ],
        "randomId": "8b690817-05a2-4932-8dc6-4f8506f43161",
        "lastModifiedDate": 1709911093836
    },
    {
        "eventTitle": "Webinar",
        "eventLabel": "On Demand",
        "eventLableClass": "on-demand",
        "eventLink": "/content/mma/americas/us/en_us/events/details/active-shooter-and-workplace-violence.html",
        "title": "Active shooter workplace violence",
        "dateType": 1657635540000,
        "imgPath": "/content/dam/marsh-mclennan-agency-us/images/events/thumbnail/event-thumbnail-activeshooter-umw-061022-477x358.jpg",
        "eventDetailDescription": "Address active shooter and workplace violence risks with our informative event.",
        "tagIds": [
            "mma-regions:upper-midwest",
            "mma-year:2024",
            "mma-content-types:events",
            "mma-services:business-insurance",
            "mma-services:employee-health-benefits",
            "mma-subcontent-types:on-demand",
            "mma-industries:retail-wholesale",
            "mma-industries:mma-industries"
        ],
        "randomId": "01bb3afc-0007-43c0-b5eb-9d4fcee37498",
        "lastModifiedDate": 1709911234199
    },
]

describe("eventsFilter works properly", () => {
    test("eventsFilter with no filters", () => {
        const filterred = eventsFilter(testEvents, {searchTerm: "", tags: [], typeSwitch: "All"})
        expect(filterred).toHaveLength(testEvents.length)
    })

    test("eventsFilter with Seminars only", () => {
        const filterred = eventsFilter(testEvents, {searchTerm: "", tags: [], typeSwitch: "Seminar"})
        expect(filterred).toHaveLength(1)
    })

    test("eventsFilter with type switch and tags", () => {
        const result1 = eventsFilter(testEvents, {searchTerm: "", tags: ["mma-year:2024"], typeSwitch: "Webinar"})
        expect(result1.length).toEqual(1)
        const result2 = eventsFilter(testEvents, {searchTerm: "", tags: ["mma-year:2024", "mma-year:2022"], typeSwitch: "Webinar"})
        expect(result2.length).toEqual(2)
    })
})
