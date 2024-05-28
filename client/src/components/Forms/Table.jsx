import React, { Fragment, useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import styles from '../table.module.css'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { FaEllipsisH } from 'react-icons/fa'

const CustomTable = ({
  data = [],
  columns = [],
  showCheckbox = false,
  showFilter = false,
  selectID = '_id',
  onSelectedRowsChange,
  clearSelections,
  actions,
  paperOrientation = 'landscape',
  paperSize = 'a4',
  filename = 'download',
  reverseAction = false,
  exportBtns = true
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filterValues, setFilterValues] = useState({})
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRefs = useRef({})

  const getColumnValue = (item, field) => {
    const fieldKeys = field?.split('.')
    let value = item
    for (const key of fieldKeys) {
      value = value[key]
      if (!value) {
        break
      }
    }
    return value
  }

  const filteredData = data?.filter((item) => {
    const matchesSearchQuery = Object?.values(item).some((value) => {
      if (typeof value === 'string') {
        return value?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      }
      return false
    })

    // const matchesFilter = Object.values(item).some((value) => {
    //   if (typeof value === "string") {
    //     return value.toLowerCase().includes(filterValue.toLowerCase());
    //   }
    //   return false;
    // });
    const getFieldByPath = (object, path) => {
      const properties = path?.split('.')
      return properties.reduce((value, property) => value?.[property], object)
    }
    const matchesFilters = Object?.entries(filterValues).every(
      ([field, filterValue]) => {
        const itemValue = getFieldByPath(item, field)
        return itemValue !== undefined && itemValue !== null
          ? typeof itemValue === 'string' &&
              itemValue.toLowerCase()?.includes(filterValue.toLowerCase())
          : true
      }
    )

    return matchesSearchQuery && matchesFilters
  })

  const handleSearchChange = (e) => {
    setCurrentPage(1)
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (e, field) => {
    const value = e.target.value
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [field]: value
    }))
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleRowSelect = (rowId, isSelected) => {
    const updatedSelectedRows = isSelected
      ? [...selectedRows, rowId]
      : selectedRows.filter((id) => id !== rowId)

    setSelectedRows((prevSelectedRows) => {
      if (isSelected) {
        return [...prevSelectedRows, rowId]
      } else {
        return prevSelectedRows?.filter((id) => id !== rowId)
      }
    })
    onSelectedRowsChange(updatedSelectedRows)
  }

  const selectAllRows = () => {
    const allRowIds = filteredData?.map((item) => item[selectID])
    setSelectedRows(allRowIds)
  }

  const clearSelectedRows = () => {
    setSelectedRows([])
  }

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedData = filteredData?.slice(startIndex, endIndex)

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: paperOrientation,
      format: paperSize
    })

    const tableData = displayedData.map((item) => {
      const rowData = columns.map((column) => {
        if (column.render) {
          return column.render(item) // Use the render function if available
        } else {
          return getColumnValue(item, column.field)
        }
      })
      return rowData
    })

    const tableHead = columns.map((column) => column.title)

    doc.autoTable({
      head: [tableHead],
      body: tableData
    })

    doc.save(`${filename}.pdf`)
  }

  const downloadCSV = () => {
    const csvContent = `${columns
      .map((column) => column.title)
      .join(',')}\n${displayedData
      .map((item) =>
        columns
          .map((column) => {
            if (column.render) {
              return column.render(item) // Use the render function if available
            } else {
              return getColumnValue(item, column.field)
            }
          })
          .join(',')
      )
      .join('\n')}`

    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(csvBlob, `${filename}.csv`)
  }

  useEffect(() => {
    if (clearSelections) {
      setSelectedRows([])
    }
  }, [clearSelections])

  const handleDropdownToggle = (rowId) => {
    setActiveDropdown(activeDropdown === rowId ? null : rowId)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
  }

  const renderActionsDropdown = (item) => {
    const validActions = actions(item) || []

    if (validActions?.length === 0) return null

    return (
      <div
        className={styles.dropdown}
        ref={(el) => (dropdownRefs.current[item[selectID]] = el)}
      >
        <span
          className={styles.dropdownToggle}
          onClick={() => handleDropdownToggle(item[selectID])}
        >
          <FaEllipsisH />
        </span>
        {activeDropdown === item[selectID] && (
          <div className={styles.dropdownMenu}>
            {validActions.map((action) => (
              <div
                key={action.name}
                className={styles.dropdownItem}
                onClick={() => {
                  action.onClick(item)
                  handleDropdownClose() // Close the dropdown after clicking an action
                }}
              >
                {action.name}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !Object?.values(dropdownRefs?.current)?.some((ref) =>
          ref?.contains(event?.target)
        )
      ) {
        handleDropdownClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const renderColumnValue = (item, column) => {
    if (column.render) {
      return column?.render(item)
    } else {
      return getColumnValue(item, column.field)
    }
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.right}>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search'
          style={{
            padding: '8px',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            marginRight: '20px'
          }}
        />
        {exportBtns && (
          <>
            <button
              onClick={downloadPDF}
              style={{
                marginLeft: '8px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#ffcc00',
                color: 'black',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(200, 204, 0, 0.8)',
                marginRight: '20px'
              }}
            >
              Download as PDF
            </button>
            <button
              onClick={downloadCSV}
              style={{
                marginLeft: '8px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#000',
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(3, 0, 0, 0.5)'
              }}
            >
              Download as CSV
            </button>
          </>
        )}
      </div>
      <div className={styles.tableContainerStyle}>
        <table
          className={styles.customTable}
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              {reverseAction && (
                <Fragment>{actions?.length > 0 && <th>Actions</th>}</Fragment>
              )}
              {showCheckbox && (
                <th
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    textAlign: 'left'
                  }}
                >
                  <input
                    type='checkbox'
                    checked={selectedRows.length === filteredData.length}
                    onChange={() =>
                      selectedRows.length === filteredData.length
                        ? clearSelectedRows()
                        : selectAllRows()
                    }
                  />
                </th>
              )}

              {columns.map((column, i) => (
                <th
                  key={i}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    textAlign: 'left',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    fontWeight: 600
                  }}
                >
                  {column.title}
                  {showFilter && (
                    <input
                      type='text'
                      value={filterValues[column.field] || ''}
                      onChange={(e) => handleFilterChange(e, column.field)}
                      placeholder={`Filter ${column.title}`}
                      style={{ width: '100%' }}
                    />
                  )}
                </th>
              ))}
              {!reverseAction && (
                <Fragment>{actions?.length > 0 && <th>Actions</th>}</Fragment>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, i) => (
              <tr key={i}>
                {reverseAction && (
                  <Fragment>
                    {actions?.length > 0 && (
                      <td>{renderActionsDropdown(item)}</td>
                    )}
                  </Fragment>
                )}
                {showCheckbox && (
                  <td
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                      textAlign: 'left'
                    }}
                  >
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(item[selectID])}
                      onChange={(e) =>
                        handleRowSelect(item[selectID], e.target.checked)
                      }
                    />
                  </td>
                )}
                {columns.map((column, i) => (
                  <td
                    key={i}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                      textAlign: 'left'
                    }}
                  >
                    {renderColumnValue(item, column)}
                  </td>
                ))}
                {!reverseAction && (
                  <Fragment>
                    {actions?.length > 0 && (
                      <td>{renderActionsDropdown(item)}</td>
                    )}
                  </Fragment>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <select
          style={{
            padding: '8px',

            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            marginRight: '20px'
          }}
          onChange={(e) => setItemsPerPage(e.target.value)}
          value={itemsPerPage}
        >
          <option value='10'>10 Rows</option>
          <option value='20'>20 Rows</option>
          <option value='50'>50 Rows</option>
          <option value='100'>100 Rows</option>
        </select>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            marginRight: '8px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#000',
            color: 'white',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
          }}
        >
          Previous
        </button>
        <span style={{ fontWeight: 'bold', fontSize: 10 }}>
          {' '}
          {itemsPerPage * currentPage - itemsPerPage + 1} -{' '}
          {itemsPerPage * currentPage} of {filteredData?.length}
        </span>

        {/* <span style={{ fontWeight: "bold" }}>{totalPages}</span> */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            marginLeft: '8px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#ffcc00',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(255, 294, 0, 0.8)',
            color: 'black'
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CustomTable
