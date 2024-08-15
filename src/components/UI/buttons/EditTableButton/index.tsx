import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

const EditTableButton: React.FC<{ _id: string; url: string }> = ({ _id, url }) => {
  return (
    <>
      <IconButton aria-label="Edit">
        <Link href={url}>
          <Edit />
        </Link>
      </IconButton>
    </>
  )
}
export default EditTableButton
