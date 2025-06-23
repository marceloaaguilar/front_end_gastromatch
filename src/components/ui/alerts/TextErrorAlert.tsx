
export interface TextErrorAlertProps {
  text: string,
  show: boolean
}

export default function TextErrorAlert({text, show}: TextErrorAlertProps){
  return (show ? <p className="text-sm text-red-600"> {text}</p>: "")
}