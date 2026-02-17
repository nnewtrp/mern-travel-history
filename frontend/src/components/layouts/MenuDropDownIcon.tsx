import { useState, useEffect } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface Props {
  isRotate: boolean
}

export default function MenuDropdownIcon(props: Props) {
  const [firstLoad, setFirstLoad] = useState(false)

  useEffect(() => {
    setFirstLoad(true)
  }, [])

  return (
    <ArrowDropDownIcon sx={{
      "@keyframes rotate-icon": { from: { rotate: "0deg" }, to: { rotate: "180deg" } },
      "@keyframes reverse-icon": { from: { rotate: (firstLoad ? "180deg" : "0deg") }, to: { rotate: "0deg" } },
      animation: props.isRotate ? "rotate-icon 0.5s" : "reverse-icon 0.5s",
      rotate: props.isRotate ? "180deg" : "0deg"
    }} />
  )
}