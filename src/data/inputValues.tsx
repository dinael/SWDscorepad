// inputValues.tsx
import cardBlue from "../assets/images/card-blue.svg";
import cardGreen from "../assets/images/card-green.svg";
import cardYellow from "../assets/images/card-yellow.svg";
import cardPurple from "../assets/images/card-purple.svg";
import cardPurpleAgora from "../assets/images/card-purple-agora.svg";
import cardWhite from "../assets/images/card-white.svg";
import wonders from "../assets/images/wonders.svg";
import progress from "../assets/images/progress.svg";
import coins from "../assets/images/coins.svg";
import military from "../assets/images/military.svg";
import chamber from "../assets/images/chamber.svg";
// // import total from '../../assets/images/total'
// // import vp from '../../assets/images/vp.svg'

export type InputItem = {
  label: string;
  id: string;
  value: string;
  image: string | { default: string; agora: string };
  placeholder: string;
};

export const inputsToValues = (inputs: InputItem[]): { [id: string]: string } =>
  inputs.reduce((acc, { id, value }) => ({ ...acc, [id]: value || "" }), {});

export const calculateTotal = (
  values: { [id: string]: string },
  inputs: InputItem[],
): number =>
  inputs.reduce((sum, { id }) => sum + (parseFloat(values[id]) || 0), 0);

export const initialInputs: InputItem[] = [
  {
    label: "wonders",
    id: "input1",
    value: "",
    placeholder: "vpInWonders",
    image: wonders,
  },
  {
    label: "blueCards",
    id: "input2",
    value: "",
    placeholder: "vpInBlueCards",
    image: cardBlue,
  },
  {
    label: "greenCards",
    id: "input3",
    value: "",
    placeholder: "vpInGreenCards",
    image: cardGreen,
  },
  {
    label: "yellowCards",
    id: "input4",
    value: "",
    placeholder: "vpInYellowCards",
    image: cardYellow,
  },
  {
    label: "purpleCards",
    id: "input5",
    value: "",
    placeholder: "vpInPurpleCards",
    image: { default: cardPurple, agora: cardPurpleAgora },
  },
  {
    label: "progress",
    id: "input7",
    value: "",
    placeholder: "vpInProgressTiles",
    image: progress,
  },
  {
    label: "coins",
    id: "input9",
    value: "",
    placeholder: "vpForEach3Coins",
    image: coins,
  },
  {
    label: "military",
    id: "input8",
    value: "",
    placeholder: "militaryVP",
    image: military,
  },
];

export const agoraInputs: InputItem[] = [
  {
    label: "chambers",
    id: "inputAgora1",
    value: "",
    placeholder: "vpChamber",
    image: chamber,
  },
];

export const pantheonInputs: InputItem[] = [
  {
    label: "divinityCards",
    id: "inputPantheon1",
    value: "",
    placeholder: "vpInDivinities",
    image: cardWhite,
  },
];
