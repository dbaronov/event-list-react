import { memo } from "react"

interface SlowListProps {
    text: string
}

export const SlowList = memo((props: SlowListProps) => {

    const items = []

    for (let index = 0; index < 250; index++) {
        items.push(<SlowItem key={index} text={props.text} />)
    }
    
    return <ul className="items">{items}</ul>

})

const SlowItem = (props: SlowListProps) => {
    let startTime = performance.now()

    while (performance.now() - startTime < 1) {
        // Do nothing for one ms to slow down the execution
    }

    return <li className="item">Text: {props.text}</li>
}
