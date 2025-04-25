import { useState } from 'react'
import { useGetMyPaymentsQuery } from '@/shared/api/subscriptionApi'
import { Pagination } from '@/shared/ui/base/Pagination/Pagination'
import s from './MyPayments.module.scss'
import { MyPaymentsTable } from '@/shared/ui/MyPaymentsTable/MyPaymentsTable'
import { Scrollbar } from '@/shared/ui/base/Scrollbar'

export const MyPayments = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const { data: paymentsData, error, isLoading } = useGetMyPaymentsQuery()

  if (isLoading) return <div>Loading payments...</div>
  if (error) return <div>Error loading payments</div>

  const indexOfLastItem = currentPage * pageSize
  const indexOfFirstItem = indexOfLastItem - pageSize
  const currentItems = paymentsData?.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: string) => {
    setPageSize(Number(size))
    setCurrentPage(1)
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.paymentsContainer}>
        <Scrollbar>
        <div className={s.tableContainer}>
          <MyPaymentsTable items={currentItems ?? []} />
        </div>
        </Scrollbar>
      </div>
      <div className={s.paymentsPagination}>
        <Pagination
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={paymentsData?.length ?? 0}
        />
      </div>
    </div>
  )
}