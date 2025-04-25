import { Select } from '@/shared/ui/base/Select/Select'
import s from './Pagination.module.scss'
import Image from 'next/image'
import { DOTS, usePagination } from './usePagination'

const ELEMENTS_ON_PAGE = ['2', '10', '20', '30', '50', '100']

type Type = {
  /**
   * функция обратного вызова с обновленным значением currentPage
   */
  onPageChange: (page: number) => void
  /**
   * функция обратного вызова с обновленным значением элементов на странице из select
   */
  onPageSizeChange: (size: string) => void
  /**
   * className, который будет добавлен в контейнер верхнего уровня.
   */
  className?: string
  /**
   * текущая активная страница
   */
  currentPage: number
  /**
   * общее количество данных
   */
  totalCount: number
  /**
   * объем данных, отображаемых на одной странице
   */
  pageSize: number
  /**
   * представляет минимальное количество кнопок страницы, которые будут отображаться с каждой стороны кнопки текущей страницы. По умолчанию 1.
   */
  siblingCount?: number
  // onPageChange={page => setCurrentPage(page)}
}

/**
 * universal pagination component
 */
export const Pagination = (props: Type) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || totalCount === 0) {
    return null
  }
  const onNext = () => {
    onPageChange(currentPage + 1)
  }
  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const onChangeHandler = (value: string) => {
    onPageSizeChange(value)
  }
  //const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={className ? `${className} ${s.wrapper}` : s.wrapper}>
      <div className={s.paginationContainer}>
        {/* стрелка навигации влево */}
        <div style={paginationRange.length === 1 || currentPage === 1 ? {pointerEvents: 'none'} : {}} className={s.paginationItem} onClick={onPrevious}>
          {currentPage === 1 ? (
            <Image
              src="/Arrow_left_disabled.svg"
              alt="Arrow left disabled"
              style={{ cursor: 'default' }}
              width={16}
              height={16}
            />
          ) : (
            <Image src="/Arrow_left_active.svg" alt="Arrow left active" width="16" height="16"/>
          )}
        </div>

        {paginationRange.map((pageNumber, index) => {
          // убираем cursor: pointer с точек '...'
          if (pageNumber === DOTS) {
            return <div key={index} className={`${s.paginationItem} ${s.dots}`}>{DOTS}</div>
          }
          // репндерим страницы пагинации
          return (
            <div key={index}
                 className={
                pageNumber === currentPage ? `${s.paginationItem} ${s.selected}` : s.paginationItem
              }
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </div>
          )
        })}

        {/*  стрелка навигации вправо */}
        <div style={paginationRange.length === 1 || currentPage === paginationRange.length ? {pointerEvents: 'none'} : {}} className={s.paginationItem} onClick={paginationRange.length === 1 ? ()=>{}: onNext}>
          {paginationRange.length === 1 || currentPage === paginationRange.length ? (
            <Image
              src="/Arrow_right_disabled.svg"
              alt="Arrow right disabled"
              style={{ cursor: 'default' }}
              width={16}
              height={16}
            />
          ) : (
          <Image src="/Arrow_right.svg" alt="Arrow right" width={16} height={16} />
            )}
        </div>
      </div>
      <div className={s.selectBox}>
        <span>Show</span>
        <Select
          options={ELEMENTS_ON_PAGE}
          onChange={onChangeHandler}
          value={String(pageSize)}
          isPagination
        />
        <span style={{textWrap: 'nowrap'}}>on page</span>
      </div>
    </div>
  )
}
