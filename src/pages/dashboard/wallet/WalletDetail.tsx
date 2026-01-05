import { Form, Input, Select, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import Section from "@/components/Section";
import CashTransactionModal from "@/components/CashTransactionModal";
import { ActionType } from "@/enum/status";
import CustomButton from "@/components/Button";
import { walletNormalManagementRoute } from "@/routes/dashboard";
import { useGetWalletInfo } from "@/hooks/wallet.hook";
import type { WalletStatus } from "@/enum/status";
import { useEffect, useState } from "react";
import { colors } from "@/theme/color";

const WalletDetailPage: React.FC = () => {
  const { walletNumber } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: walletInfo, isPending } = useGetWalletInfo(walletNumber);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState<
    typeof ActionType[keyof typeof ActionType]
  >(ActionType.CASH_DEPOSIT);

  // ======================
  // FILL FORM WHEN DATA READY
  // ======================
  useEffect(() => {
    if (walletInfo) {
      form.setFieldsValue(walletInfo);
    }
  }, [walletInfo, form]);

  // ======================
  // RENDER
  // ======================
  return (
    <div className="p-5 space-y-5">
      {/* HEADER */}
      <h2 className="text-2xl text-black font-bold flex items-center">
        <ArrowLeftOutlined
          className="mr-4 cursor-pointer"
          onClick={() => navigate({ to: walletNormalManagementRoute.to })}
        />
        Chi tiết ví
      </h2>

      <div className="bg-white p-6 rounded-lg space-y-2">
        <Section
          title="Thông tin ví"
          description="Thông tin chi tiết của ví người dùng"
        >
          {isPending ? (
            <div className="flex justify-center py-10">
              <Spin />
            </div>
          ) : (
            <Form layout="vertical" form={form}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Chủ ví (Username)" name="username">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Email" name="mail">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Số tài khoản" name="walletNumber">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Ngân hàng" name="merchantName">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Trạng thái ví" name="status">
                  <Select<WalletStatus>
                    options={[
                      { value: "ACTIVE", label: "Hoạt động" },
                      { value: "PENDING", label: "Chưa kích hoạt" },
                      { value: "SUSPENDED", label: "Bị khóa" },
                    ]}
                    disabled
                  />
                </Form.Item>

                <Form.Item label="Số dư">
                  <div className="flex items-center justify-between gap-3">
                    <Input
                      disabled
                      value={
                        walletInfo?.balance != null
                          ? walletInfo.balance.toLocaleString("vi-VN") + " ₫"
                          : "-"
                      }
                    />

                    <div className="flex gap-2">
                      <CustomButton
                        label="Nạp"
                        onClick={() => {
                          setActionType(ActionType.CASH_DEPOSIT);
                          setOpenModal(true);
                        }}
                      />
                      <CustomButton
                        label="Rút"
                        color={colors.red?.r1}
                        onClick={() => {
                          setActionType(ActionType.CASH_WITHDRAW);
                          setOpenModal(true);
                        }}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Xác thực">
                  <Input
                    disabled
                    value={
                      walletInfo?.verified
                        ? "Đã xác thực"
                        : "Chưa xác thực"
                    }
                  />
                </Form.Item>
              </div>
            </Form>
          )}
          {walletInfo?.walletNumber && (
            <CashTransactionModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              actionType={actionType}
              sourceWalletNumber={walletInfo.walletNumber}
            />
          )}
        </Section>
      </div>
    </div>
  );
};

export default WalletDetailPage;
