import React, { useEffect, useMemo, useState } from "react";
import { Tabs, Space, Spin, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";

import TableComponent from "@/components/Table";
import PaginationComponent from "@/components/Pagination";
import { SearchComponent } from "@/components/Search";
import { colors } from "@/theme/color";

import type { TableColumn } from "@/components/Table";
import type { PayLaterResource } from "@/types/walltet.type";
import { useFilterPayLaters } from "@/hooks/wallet.hook";
// import { payLaterDetailRoute } from "@/routes/dashboard";

import type { Dayjs } from "dayjs";

const PayLaterManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [debounced, setDebounced] = useState(searchValue);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  /* ================= DEBOUNCE ================= */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  /* ================= FILTER PARAMS ================= */
  const filterParams = useMemo(
    () => ({
      keyword: debounced.trim(),
      status: filterStatus || undefined,
      fromDate: dateRange[0]?.format("YYYY-MM-DD"),
      toDate: dateRange[1]?.format("YYYY-MM-DD"),
    }),
    [debounced, filterStatus, dateRange]
  );

  /* ================= API ================= */
  const { data, isLoading } = useFilterPayLaters(filterParams);

  const payLaters: PayLaterResource[] = data?.contents ?? [];
  const totalItems = data?.totalElements ?? payLaters.length;

  /* ================= PAGINATION ================= */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = payLaters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= STATUS ================= */
  const renderStatus = (status?: string) => {
    if (!status) return "-";

    const map: Record<string, { label: string; color: string }> = {
      PENDING: { label: "Chờ duyệt", color: "#B54708" },
      APPROVED: { label: "Đã duyệt", color: "#027A48" },
      REJECTED: { label: "Từ chối", color: "#B42318" },
    };

    const config = map[status] ?? {
      label: status,
      color: "#374151",
    };

    return (
      <span
        className="px-3 py-1 rounded-md text-sm font-medium"
        style={{ background: "#F3F4F6", color: config.color }}
      >
        {config.label}
      </span>
    );
  };

  /* ================= COLUMNS ================= */
  const columns: TableColumn<PayLaterResource>[] = [
    {
      key: "stt",
      label: "STT",
      align: "center",
      render: (_item, index) => startIndex + index + 1,
    },
    {
      key: "username",
      label: "Người dùng",
      render: (item) => item.username || "-",
    },
    {
      key: "type",
      label: "Loại",
      render: (item) => item.type || "-",
    },
    {
      key: "requestedCreditLimit",
      label: "Hạn mức yêu cầu",
      align: "right",
      render: (item) =>
        item.requestedCreditLimit?.toLocaleString("vi-VN") + " ₫",
    },
    {
      key: "approvedLimit",
      label: "Hạn mức duyệt",
      align: "right",
      render: (item) =>
        item.approvedLimit
          ? item.approvedLimit.toLocaleString("vi-VN") + " ₫"
          : "-",
    },
    {
      key: "appliedAt",
      label: "Ngày đăng ký",
      render: (item) =>
        item.appliedAt
          ? new Date(item.appliedAt).toLocaleDateString("vi-VN")
          : "-",
    },
    {
      key: "status",
      label: "Trạng thái",
      align: "center",
      render: (item) => renderStatus(item.status),
    },
    {
      key: "actions",
      label: "Hành động",
      align: "center",
    },
  ];

  /* ================= ACTION ================= */
  const renderActions = (item: PayLaterResource) => (
    <Space size={12}>
      <EditOutlined
        title="Xem chi tiết"
        style={{ fontSize: 18, color: colors.orange.o1, cursor: "pointer" }}
        // onClick={() =>
        //   navigate({
        //     to: payLaterDetailRoute.to,
        //     params: { id: item.id },
        //   })
        // }
      />
    </Space>
  );

  return (
    <div className="flex flex-col space-y-6 p-5">
      <h2 className="text-2xl font-bold">Danh sách PayLater</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <SearchComponent
          placeholder="Tìm kiếm theo tên người dùng..."
          value={searchValue}
          onChange={setSearchValue}
          onSearch={setSearchValue}
        />

        <DatePicker.RangePicker
          allowClear
          onChange={(values) => {
            setCurrentPage(1);
            setDateRange(values ?? [null, null]);
          }}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <Tabs
          activeKey={filterStatus}
          onChange={(key) => {
            setCurrentPage(1);
            setFilterStatus(key);
          }}
          items={[
            { key: "", label: "Tất cả" },
            { key: "PENDING", label: "Chờ duyệt" },
            { key: "APPROVED", label: "Đã duyệt" },
            { key: "REJECTED", label: "Từ chối" },
          ]}
        />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <>
            <TableComponent
              columns={columns}
              dataSource={paginatedData}
              renderActions={renderActions}
            />

            <PaginationComponent
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PayLaterManagementPage;
