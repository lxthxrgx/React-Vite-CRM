import { useState, useRef, useEffect } from "react";
import { Table, TableColumnsType, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType, TableProps } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { I1D } from "../model/1D";
import { I2D } from "../model/2D";
import { GetCounterpartyData } from "../apireq/apirequest";

type DataIndex = keyof I1D;
type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

export default function CounterpartyPage() {
  const[data, SetData] = useState<I1D[]>([])

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedSubRowKeys, setSelectedSubRowKeys] = useState<React.Key[]>([]);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps["confirm"], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<I1D> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<I1D> = [
    { title: "Id", dataIndex: "id", hidden: true },
    { title: "Назва", dataIndex: "nameGroup", ...getColumnSearchProps("nameGroup") },
    { title: "ПІП", dataIndex: "fullname", ...getColumnSearchProps("fullname") },
    { title: "Адреса", dataIndex: "address", ...getColumnSearchProps("address") },
    { title: "Єдрюофоп", dataIndex: "edryofop", ...getColumnSearchProps("edryofop") },
    { title: "Банковські дані", dataIndex: "banckAccount", ...getColumnSearchProps("banckAccount") },
    { title: "Директор", dataIndex: "director", ...getColumnSearchProps("director") },
    { title: "Відповідальна персона", dataIndex: "resPerson", ...getColumnSearchProps("resPerson") },
    { title: "Телефон", dataIndex: "phone", ...getColumnSearchProps("phone") },
    { title: "E-mail", dataIndex: "email", ...getColumnSearchProps("email") },
    { title: "Статус", dataIndex: "status", ...getColumnSearchProps("status") },
    Table.EXPAND_COLUMN,
  ];

  const subColumns: TableColumnsType<I2D> = [
    { title: "Id", dataIndex: "id", hidden: true },
    { title: "Номер групи", dataIndex: "numberGroup" },
    { title: "Назва групи", dataIndex: "nameGroup" },
    { title: "ПІП", dataIndex: "pibs" },
    { title: "Адреса", dataIndex: "address" },
    { title: "Площа", dataIndex: "area" },
    { title: "isAlert", dataIndex: "isAlert" },
    { title: "dateCloseDepartment", dataIndex: "dateCloseDepartment" },
  ];

  const rowSelection: TableRowSelection<I1D> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);

      const newSelectedSubRowKeys = pdfdata
        .filter((item) => newSelectedRowKeys.includes(item.id))
        .flatMap((item) => item.numberGroup.map((subItem) => subItem.id));

      setSelectedSubRowKeys(newSelectedSubRowKeys);
    },
  };

  const subRowSelection: TableRowSelection<I2D> = {
    selectedRowKeys: selectedSubRowKeys,
    onChange: (newSelectedRowKeys) => setSelectedSubRowKeys(newSelectedRowKeys),
  };

  const pdfdata: I1D[] = [
    {
      id: 1,
      nameGroup: "Група 1",
      numberGroup: [
        { id: 101, numberGroup: 1, nameGroup: "Підгрупа 4", pibs: "Іванов І. І.", address: "Київ, вул. Хрещатик, 1", area: 50, isAlert: false, dateCloseDepartment: new Date("2024-12-31") },
        { id: 102, numberGroup: 1, nameGroup: "Підгрупа 5", pibs: "Петров П. П.", address: "Львів, вул. Франка, 10", area: 30, isAlert: true, dateCloseDepartment: new Date("2025-06-30") },
      ],
      fullname: "ТОВ Приклад 1",
      address: "Київ, вул. Хрещатик, 1",
      edryofop: "12345678",
      banckAccount: "UA123456789012345678901234567",
      director: "Петров П. П.",
      resPerson: "Сидоренко С. С.",
      phone: "+380671234567",
      email: "example1@email.com",
      status: "Активний",
    },
    {
        id: 2,
        nameGroup: "Група 2",
        numberGroup: [
          { id: 103, numberGroup: 1, nameGroup: "Підгрупа 1", pibs: "Іванов І. І.", address: "Київ, вул. Хрещатик, 1", area: 50, isAlert: false, dateCloseDepartment: new Date("2024-12-31") },
          { id: 104, numberGroup: 1, nameGroup: "Підгрупа 2", pibs: "Петров П. П.", address: "Львів, вул. Франка, 10", area: 30, isAlert: true, dateCloseDepartment: new Date("2025-06-30") },
        ],
        fullname: "ТОВ Приклад 2",
        address: "Київ, вул. Хрещатик, 2",
        edryofop: "123123123123123",
        banckAccount: "UA123456789012345678901234567",
        director: "Петров П. П.",
        resPerson: "Сидоренко С. С.",
        phone: "+380671234567",
        email: "example1@email.com",
        status: "Активний",
      },
  ];

  useEffect(() => {
      (async () => {
        try {
          const getpdfdata = await GetCounterpartyData();
          if (Array.isArray(getpdfdata)) {
            const updatedData = await Promise.all(
              getpdfdata.map(async (item) => {
                const pathToPdf = await GetCounterpartyData();
                return { ...item, pathToPdf };
              })
            );
            SetData(updatedData);
          } else {
            console.error('Ошибка: полученные данные не массив', getpdfdata);
          }
        } catch (error) {
          // await SendError(error);
          console.error(error);
        }
      })();
    }, []);

  return (
    <Table<I1D>
      rowKey="id"
      columns={columns}
      rowSelection={rowSelection}
      expandable={{
        expandedRowRender: (record) => (
          <Table<I2D> rowKey="id" columns={subColumns} dataSource={record.numberGroup} pagination={false} rowSelection={subRowSelection} />
        ),
      }}
      dataSource={data}
    />
  );
}
