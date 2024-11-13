export default function MenuItem({
  src,
  children
}) {
  return (
    <>
      <img
        src={src}
        width="20px"
        height="20px"
        alt="import"
        style={{ marginRight: 12 }}
      />
      {children}
    </>
  )
}