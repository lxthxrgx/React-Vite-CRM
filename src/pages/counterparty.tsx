import { useEffect, useState, useRef } from 'react';
import { Table, TableColumnsType, Button, Input, Space } from 'antd';
import type { InputRef, TableColumnType } from 'antd';
import { I1D } from "../model/1D"

const Colummn: TableColumnsType<I1D> = [
    {
      title: 'Назва',
      dataIndex: 'nameGroup',
      width: '30%',
      ...getColumnSearchProps('nameGroup'),
    }, 
    {
      title: 'Номер',
      dataIndex: 'numberGroup',
      ...getColumnSearchProps('numberGroup'),
    }, 
    {
        title: 'ПІП',
        dataIndex: 'fullname',
        ...getColumnSearchProps('fullname'),
    },
    {
        title: 'Адреса',
        dataIndex: 'address',
        ...getColumnSearchProps('address'),
    },
    {
        title: 'ЄДРЮОФОП',
        dataIndex: 'edryofop',
        ...getColumnSearchProps('edryofop'),
    },
    {
        title: 'Банк.дані',
        dataIndex: 'banckAccount',
        ...getColumnSearchProps('banckAccount'),
    },
    {
        title: 'Директор',
        dataIndex: 'director',
        ...getColumnSearchProps('director'),
    },{
        title: 'Відповідальна особа',
        dataIndex: 'resPerson',
        ...getColumnSearchProps('resPerson'),
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        ...getColumnSearchProps('phone'),
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        ...getColumnSearchProps('email'),
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        ...getColumnSearchProps('status'),
    },
    Table.EXPAND_COLUMN,
  ];

export default function CounterpartyPage()
{
    const [counterparty, SetCounterparty] = useState<I1D[]>([]);


}