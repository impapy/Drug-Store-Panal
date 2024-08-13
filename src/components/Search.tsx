import React, { useEffect, useState, useCallback, memo } from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import * as R from "ramda"
import { useRouter } from "next/router"

type Props = {
  onSerach ?: React.Dispatch<string>
}

const Search: React.FC<Props> = ({onSerach}) => {
  const router = useRouter()

  const onType = useCallback((e: any) => {
      router.push({
        query: {
          ...router.query,
          searchTerm: e.target.value
        }})
  },[])

  const handleChange = (e: any) => {
    if (e.target.value.length == 0){
      onSerach && onSerach('')
      router.push({
        query: {
          ...router.query,
          searchTerm: ''
        }})
      }
    }

  return (
    <Stack width={671} height={45}>
      <TextField
        sx={styles.searchField}
        placeholder="Search..."
        variant="outlined"
        onChange={handleChange}
        onKeyDown={onType}
      />
    </Stack>
  )
}

const styles = {
  searchField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
  },
}

export default memo(Search)
