import React, { useEffect, useState } from "react";
import { Badge, Input, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getData } from "../redux/dataSlice";

interface DataType {
  key: string;
  productName: string;
  companyName: string;
  invoceNumber: string;
  amount: number;
  subTotal: number;
  costs: number;
  totalCost: number;
  isUsd: number;
  productUnit: string;
  totalProfit: number;
  netProfit: number;
}

const App: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [searchText, setSearchText] = useState<string>("");
  const [order, setOrder] = useState(0);
  const [isUsd, setIsUsd] = useState(1);

  const getColumns = (orderId: number) => {
    return orderId === 1
      ? [
          { title: "Müşteri", dataIndex: "companyName", key: "name" },
          { title: "Fatura Numarası", dataIndex: "invoceNumber", key: "age" },
          {
            title: "Toplam Miktar",
            dataIndex: "amount",
            key: "address",
            render: (number: number) =>
              Intl.NumberFormat().format(number) + " Ton",
          },
          {
            title: "Toplam Tutar",
            dataIndex: "subTotal",
            key: "name2",
            render: (number: number) =>
              Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL"),
          },
          {
            title: "Toplam Maliyet",
            dataIndex: "totalCost",
            key: "age2",
            render: (number: number) =>
              Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL"),
          },
          {
            title: "Toplam Karlılık",
            dataIndex: "totalProfit",
            key: "address2",
            render: (number: number) => (
              <Badge
                count={Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL")}
                color={number > 0 ? "#678e57" : "#d43131"}
              />
            ),
          },
          {
            title: "Net Kar",
            dataIndex: "netProfit",
            key: "address3",
            render: (number: number) => (
              <Badge
                count={Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL")}
                color={number > 0 ? "#678e57" : "#d43131"}
              />
            ),
          },
        ]
      : [
          {
            title: "Ürün",
            dataIndex: "productName",
            key: "name",
            render: (text: string) => <Badge count={text} color="#8c578e" />,
          },
          { title: "Fatura Numarası", dataIndex: "invoceNumber", key: "age" },
          {
            title: "Toplam Miktar",
            dataIndex: "amount",
            key: "address",
            render: (number: number) => number + " Ton",
          },
          {
            title: "Toplam Tutar",
            dataIndex: "subTotal",
            key: "name2",
            render: (number: number) =>
              Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL"),
          },
          {
            title: "Toplam Maliyet",
            dataIndex: "totalCost",
            key: "age2",
            render: (number: number) =>
              Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL"),
          },
          {
            title: "Toplam Karlılık",
            dataIndex: "totalProfit",
            key: "address2",
            render: (number: number) => (
              <Badge
                count={Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL")}
                color={number > 0 ? "#678e57" : "#d43131"}
              />
            ),
          },
          {
            title: "Net Kar",
            dataIndex: "netProfit",
            key: "address3",
            render: (number: number) => (
              <Badge
                count={Intl.NumberFormat().format(number) + (isUsd==1 ? " USD": " TL")}
                color={number > 0 ? "#678e57" : "#d43131"}
              />
            ),
          },
        ];
  };

  const [columns, setColumns] = useState(getColumns(order));

  useEffect(() => {
    dispatch(getData({ order, isUsd }));
    setColumns(getColumns(order));
  }, [order, dispatch,isUsd]);

  const response = useSelector((store: RootState) => store.data);
  const data = response.data.data;

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  let filteredData: DataType[] = [];
  try {
    if (data?.length > 0) {
      filteredData = data.filter((item: DataType) =>
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(searchText.toLowerCase()))
      );
    }
  } catch (error) {
    console.error("Filtering error:", error);
  }

  return (
    <div className="w-full flex flex-col p-6">
      <div className="flex flex-row justify-between w-full">
        <div className="flex gap-4">
          <Select
            value={order}
            options={[
              {
                value: 1,
                label: <div onClick={() => setOrder(1)}>Siparişe Göre</div>,
              },
              {
                value: 0,
                label: <div onClick={() => setOrder(0)}>Ürüne Göre</div>,
              },
            ]}
          />

          <Select
            value={isUsd}
            options={[
              {
                value: 1,
                label: <div className="w-full" onClick={() => setIsUsd(1)}>USD</div>,
              },
              {
                value: 0,
                label: <div className="w-full" onClick={() => setIsUsd(0)}>TL</div>,
              },
            ]}
          />
        </div>
        <Input.Search
          placeholder="Arama yapın..."
          
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-5 w-auto"
        />
      </div>
      <div className="p-4">
        <Table columns={columns} dataSource={filteredData} />
      </div>
    </div>
  );
};

export default App;
