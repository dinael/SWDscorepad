// inputValues.tsx
import cardBlue from "../assets/images/card-blue.svg"
import cardGreen from "../assets/images/card-green.svg"
import cardYellow from "../assets/images/card-yellow.svg"
import cardPurple from "../assets/images/card-purple.svg"
import cardWhite from "../assets/images/card-white.svg"
import wonders from "../assets/images/wonders.svg"
import progress from "../assets/images/progress.svg"
import coins from "../assets/images/coins.svg"
import military from "../assets/images/military.svg"
import chamber from "../assets/images/chamber.svg"
// // import total from '../../assets/images/total'
// // import vp from '../../assets/images/vp.svg'

export type InputItem = {
  label: string
  id: string
  value: string
  image: string
  placeholder: string
}

export const initialInputs: InputItem[] = [
  { label: "Blue Cards", id: "input2", value: "", placeholder: "VP in blue cards", image: cardBlue },
  { label: "Green Cards", id: "input3", value: "", placeholder: "VP in green cards", image: cardGreen },
  { label: "Yellow Cards", id: "input4", value: "", placeholder: "VP in yellow cards", image: cardYellow },
  { label: "Purple Cards", id: "input5", value: "", placeholder: "VP in purple cards", image: cardPurple },
  { label: "Wonders", id: "input1", value: "", placeholder: "VP in Wonders cards", image: wonders },
  { label: "Progress", id: "input7", value: "", placeholder: "VP in progress tiles", image: progress },
  { label: "Coins", id: "input9", value: "", placeholder: "1 VP for each 3 coins", image: coins },
  { label: "Military", id: "input8", value: "", placeholder: "Military's VP", image: military },
]

export const agoraInputs: InputItem[] = [
  {
    label: "Chambers",
    id: "inputAgora1",
    value: "",
    placeholder: "VP chamber",
    image: chamber
  },
]

export const pantheonInputs: InputItem[] = [
  {
    label: "Divinity cards",
    id: "inputPantheon1",
    value: "",
    placeholder: "VP in divinities cards",
    image: cardWhite,
  },
]
