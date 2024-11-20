import { memo } from "react"

import RadioButton from '../radio-button/RadioButton'

interface RadioGroupProps {
  options: string[],
  value: string,
  onChange: (v: string) => void
}

const RadioGroup = memo((props: RadioGroupProps) => {
  return (
    <form>
      {props.options.map((option: string) => (
        <RadioButton
          key={option}
          value={option}
          checked={option === props.value}
          label={option}
          onChange={() => props.onChange(option)}
        />
      ))}
    </form>
  )
})

export default RadioGroup


// export default function RadioGroup(props: RadioGroupProps) {
//     return (
//       <form>
//         {props.options.map((option: string) => (
//           <RadioButton
//             key={option}
//             value={option}
//             checked={option === props.value}
//             label={option}
//             onChange={() => {props.onChange(option)}}
//           />
//         ))}
//       </form>
//     )
//   }
