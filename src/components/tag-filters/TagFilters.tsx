import { Dispatch, SetStateAction } from "react"
import { TagFilter } from "../../schema"

interface TagFiltersSelectionProps {
    checked: boolean,
    tags: TagFilter[],
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>
}

export const TagFiltersSection = (props: TagFiltersSelectionProps) => {
    const handleCheck = (tagId: string) => {
        if (props.selected.includes(tagId)) {
            props.setSelected(props.selected.filter(tag => tag !== tagId))
        } else {
            props.setSelected([...props.selected, tagId])
        }
    }
    
    return (
        <div className="tag-filters">
            {props.tags.map((tag, index) => 
                <div key={`${tag.filterId}${index}`} className="tag-section">
                    <h3>{tag.filterTitle}</h3>
                    <div className="tag-filters_tags">
                    {tag.filterOptions.map((opt, index) =>
                        <div className="tag-filters_tag" key={`${opt.id}${index}`}>
                            <label htmlFor={opt.id}>
                                <input
                                    type="checkbox"
                                    value={opt.id}
                                    name={tag.filterId}
                                    id={opt.id}
                                    onChange={_ => handleCheck(`${tag.filterId}:${opt.id}`)}
                                    defaultChecked = {false}
                                    className="tag-optinon"
                                    >
                                </input>
                            {opt.title}</label>
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}
