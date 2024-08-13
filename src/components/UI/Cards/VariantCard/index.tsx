/** @jsxImportSource @emotion/react */
import React from "react"
import Image from "next/image"
import { Box, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { css } from "@emotion/react"

import Card from "../Card"
import VariantCardColumn from "./Column"
import { ProductVariantAddInput } from "api"
import { EditIcon, TrashIcon } from "assets/images/icons"
import { useVariants } from "contexts/VariantsContext"

type Props = {
  // NOTE: THIS IS TEMP
  variant: any
  variantIndex: number
  onVariantEdit: () => void
}

const VariantCard: React.FC<Props> = ({ variant, variantIndex, onVariantEdit }) => {
  const { variantDelete } = useVariants()

  const handleVariantDelete = () => variantDelete(variantIndex)

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item container direction="row">
          <Box
            flex={1}
            css={(theme) => css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: ${(theme as any).spacing(3)};
            `}
          >
            <VariantCardColumn label="Variant name" value={variant.name} />
            <VariantCardColumn label="SKU" value={variant.sku} />
            <VariantCardColumn label="Stock" value={variant.stock} />
            <VariantCardColumn label="Variant name" value="Variant name" />
          </Box>
          <Stack direction="row" alignItems="flex-start" spacing={3}>
            <Tooltip title="Edit variant">
              <IconButton aria-label="Open edit mode" onClick={onVariantEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete variant">
              <IconButton aria-label="Delete variant" onClick={handleVariantDelete}>
                <TrashIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h6">Live mockups</Typography>
          </Grid>

          <Grid item>
            {/* THIS IS TEMP! */}
            <Box
              css={css`
                width: 133px;
                height: 113px;
                position: relative;
              `}
            >
              <Image src="/mockup.png" layout="fill" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default VariantCard