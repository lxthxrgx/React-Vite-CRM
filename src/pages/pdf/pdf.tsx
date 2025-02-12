import { useEffect, useState, useRef } from 'react';
import { GetPdfData, GetPdfPath } from '../../apireq/apirequest';
import { Table, TableColumnsType, Button, Input, Space } from 'antd';
import "../../css/pdf.css"
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from "react-highlight-words";

type DataIndex = keyof PdfData;

interface PdfData {
  id: number;
  numberGroup: number;
  nameGroup: string;
  status: string;
  pathToPdf: string[];
}

function PDFPage() {
  const [pdfdata, SetPdfData] = useState<PdfData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<PdfData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''} 
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    (async () => {
      try {
        const getpdfdata = await GetPdfData();
        if (Array.isArray(getpdfdata)) {
          const updatedData = await Promise.all(
            getpdfdata.map(async (item) => {
              const pathToPdf = await GetPdfPath(item.id);
              return { ...item, pathToPdf };
            })
          );
          SetPdfData(updatedData);
        } else {
          console.error('Ошибка: полученные данные не массив', getpdfdata);
        }
      } catch (error) {
        // await SendError(error);
        console.error(error);
      }
    })();
  }, []);

  const openPdfInNewTab = (pdfUrl: string) => {
    if (!pdfUrl) {
      return;
    }
    
    window.open(pdfUrl, '_blank');
  };

  const columns: TableColumnsType<PdfData> = [
    {
      title: 'Номер відділення',
      dataIndex: 'numberGroup',
      width: '30%',
      ...getColumnSearchProps('numberGroup'),
    }, 
    {
      title: 'Назва групи',
      dataIndex: 'nameGroup',
      ...getColumnSearchProps('nameGroup'),
    }, 
    {
      title: 'Pdf',
      dataIndex: 'pdf',
      width: '40%',
    },
    Table.EXPAND_COLUMN,
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <>
      <Table<PdfData>
        rowKey="id"
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              {record.pathToPdf.map((pdf, index) => (
                <button key={index} onClick={() => openPdfInNewTab(pdf)}>{pdf.replace(/^.*[\\/]/, '')}</button>
              ))}
            </div>
          ),
        }}
        dataSource={pdfdata}
      />
    </>
  );
}

export default PDFPage;
