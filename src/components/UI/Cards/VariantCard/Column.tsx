/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material"
import { css } from "@emotion/react"

interface Props {
  label: string
  value: string | number
}

const VariantCardColumn: React.FC<Props> = ({ label, value }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>

      <Typography variant="body1">{value}</Typography>
    </Stack>
  )
}

export default VariantCardColumn