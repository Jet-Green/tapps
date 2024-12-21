import type Button from "./tapp.button.interface"

export default interface Tapp {
  name: string,
  logoLink: string,
  buttons: Button[]
}