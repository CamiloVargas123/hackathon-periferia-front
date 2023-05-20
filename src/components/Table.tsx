import { useState } from 'react'
import TableInput from './TableInput'
import ChangeTableSize, { TableSize } from './TableSize'

export default function Table() {
  const [tableSize, setTableSize] = useState<TableSize>({ rows: 6, columns: 6 })
  return (
    <>
      <ChangeTableSize setTableSize={setTableSize} tableSize={tableSize} />
      <TableInput tableSize={tableSize} />
    </>
  )
}
