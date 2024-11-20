import { ChangeEventHandler } from "react";

interface RadsioButtonProps {
  value: string,
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
  label: string
}

const RadioButton = (props: RadsioButtonProps ) => {

    return (
      <>
        <div className="radio-group_item">
            <input
              type="radio"
              key={props.value}
              id={props.value}
              name="event-types"
              value={props.value}
              defaultChecked={props.value === "All"}
              onChange={props.onChange}
            />
          <label htmlFor={props.value}>
            {props.label}
          </label>
        </div>
      </>
    )
  }

  export default RadioButton
