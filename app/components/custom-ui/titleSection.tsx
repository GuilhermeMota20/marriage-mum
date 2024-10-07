import React from "react"

interface Props {
  title: string;
  description?: string;
}

export const TitleSection: React.FC<Props> = ({
  title,
  description
}) => {
  return (
    <>
      <div className="w-full flex flex-col border-b pb-4">
        <h2 className="text-4xl font-bold">
          {title}
        </h2>
        <p className="text-sm font-light">
          {description}
        </p>
      </div>
    </>
  )
}