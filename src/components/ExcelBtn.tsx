import * as XLSX from 'xlsx'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

const ExcelBtn = ({ data = [], fileName }) => {
    return (
        <>
            <Button className=" ml-auto" size='icon'
                onClick={() => {
                    const datas = data?.length ? data : []
                    const worksheet = XLSX.utils.json_to_sheet(datas)
                    const workbook = XLSX.utils.book_new()
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheets1")
                    XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx"` : "data.xlsx")
                }}>
                <Download />
            </Button>
        </>
    )
}

export default ExcelBtn