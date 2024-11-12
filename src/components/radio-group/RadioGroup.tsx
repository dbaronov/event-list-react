import RadioButton from '../radio-button/RadioButton'
import { EventType } from '../../schema'
import {Dispatch, SetStateAction} from 'react'

interface RadioGroupProps {
  options: string[],
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

export default function RadioGroup(props: RadioGroupProps) {
    return (
      <form>
        {props.options.map((option: string) => (
          <RadioButton
            key={option}
            value={option}
            checked={option === props.value}
            label={option}
            onChange={
              () => {
                props.setValue(option)
              }
            }
          />
        ))}
      </form>
    )
  }
