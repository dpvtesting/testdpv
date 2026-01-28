import { useState } from "react";

export default function useMenuController() {
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [visibleSolutionMenu, setVisibleSolutionMenu] = useState(false)

  return {
    menu: [visibleMenu, setVisibleMenu],
    solution: [visibleSolutionMenu, setVisibleSolutionMenu]
  }
}