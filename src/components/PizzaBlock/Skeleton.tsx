import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="125" r="120" /> 
    <rect x="0" y="270" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="319" rx="10" ry="10" width="280" height="88" /> 
    <rect x="6" y="425" rx="10" ry="10" width="95" height="30" /> 
    <rect x="122" y="418" rx="25" ry="25" width="155" height="45" />
  </ContentLoader>
)

export default Skeleton