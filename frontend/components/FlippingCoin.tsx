import React, { memo } from "react"
import { MotiImage } from "moti"
import { images } from "@/constants"

const FlippingCoin = () => {
  return (
    <MotiImage
      source={images.coin}
      style={{ width: 28, height: 28 }}
      from={{ transform: [{ perspective: 1000 }, { rotateY: "0deg" }] }}
      animate={{ transform: [{ perspective: 1000 }, { rotateY: "360deg" }] }}
      transition={{
        loop: true,
        repeatReverse: true,
        duration: 1000,
        type: "timing",
      }}
    />
  )
}

export default memo(FlippingCoin)
