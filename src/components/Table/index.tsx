import { useState } from 'react'
import { TableSize } from './models'
import ChangeTableSize from './ChangeTableSize'
import TableInput from './TableInput'


export default function Table() {
  const [tableSize, setTableSize] = useState<TableSize>({ rows: 6, columns: 6 })
  return (
    <>
      <ChangeTableSize setTableSize={setTableSize} tableSize={tableSize} />
      <TableInput tableSize={tableSize} />
    </>
  )
}
