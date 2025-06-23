
export interface TextErrorAlertProps {
  text: string,
  show: boolean
}

export default function TextSuccessAlert({text, show}: TextErrorAlertProps){
  return (show ? <p className="text-sm text-green-600"> {text}</p>: "")
}