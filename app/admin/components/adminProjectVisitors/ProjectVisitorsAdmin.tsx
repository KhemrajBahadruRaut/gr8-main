"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from "antd";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  MailOutlined,
  ReloadOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { PROJECT_CATEGORIES, type ProjectVisitor } from "@/lib/project-access";
import type { WorkRoute } from "@/lib/works-content";
import { getGr8ApiBase } from "@/lib/gr8-api";

const { Title, Text, Link } = Typography;
const CATEGORY_COLORS: Record<WorkRoute, string> = {
  "digital-marketing": "purple",
  "web-development": "blue",
  "virtual-assistance": "green",
};

function dateLabel(value: string | null) {
  return value ? new Date(value).toLocaleString() : "No project visit yet";
}

function csvCell(value: string | number) {
  const text = String(value);
  return `"${(/^[=+\-@\t\r]/.test(text) ? "'" : "") + text.replace(/"/g, '""')}"`;
}

export default function ProjectVisitorsAdmin() {
  const [visitors, setVisitors] = useState<ProjectVisitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const refresh = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${getGr8ApiBase()}/project-visitors/get_visitors.php`, { credentials: "include", cache: "no-store", signal });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to load project visitors.");
      setVisitors(data.visitors);
    } catch (err) {
      if (!signal?.aborted) setError(err instanceof Error ? err.message : "Unable to load project visitors.");
    } finally { if (!signal?.aborted) setLoading(false); }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => controller.abort();
  }, [refresh]);

  const filtered = useMemo(() => visitors.filter((visitor) => {
    const query = search.trim().toLowerCase();
    return (!query || visitor.name.toLowerCase().includes(query) || visitor.email.toLowerCase().includes(query)) &&
      (!category || visitor.categories.includes(category as WorkRoute));
  }), [visitors, search, category]);
  const safePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / pageSize)));

  const columns = useMemo<TableColumnsType<ProjectVisitor>>(() => [
    {
      title: "Visitor",
      key: "visitor",
      width: 280,
      sorter: (left, right) => left.name.localeCompare(right.name),
      render: (_, visitor) => (
        <Space align="start" size={12}>
          <Avatar style={{ backgroundColor: "#ecfdf5", color: "#059669" }}>
            {visitor.name.split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase()}
          </Avatar>
          <Space orientation="vertical" size={2}>
            <Text strong>{visitor.name}</Text>
            <Link href={`mailto:${visitor.email}`}>
              <Space size={6}><MailOutlined />{visitor.email}</Space>
            </Link>
          </Space>
        </Space>
      ),
    },
    {
      title: "Projects viewed",
      dataIndex: "categories",
      key: "categories",
      width: 240,
      render: (categories: WorkRoute[]) => categories.length ? (
        <Space size={[0, 6]} wrap>
          {categories.map((item) => <Tag key={item} color={CATEGORY_COLORS[item]}>{PROJECT_CATEGORIES[item]}</Tag>)}
        </Space>
      ) : <Text type="secondary">Awaiting first visit</Text>,
    },
    {
      title: "Visits",
      dataIndex: "visit_count",
      key: "visit_count",
      align: "right",
      width: 100,
      sorter: (left, right) => left.visit_count - right.visit_count,
    },
    {
      title: "Verified",
      dataIndex: "verified_at",
      key: "verified_at",
      width: 200,
      sorter: (left, right) => Date.parse(left.verified_at) - Date.parse(right.verified_at),
      render: (value: string) => <Text type="secondary">{dateLabel(value)}</Text>,
    },
    {
      title: "Last visit",
      dataIndex: "last_visited_at",
      key: "last_visited_at",
      width: 200,
      sorter: (left, right) => (left.last_visited_at ? Date.parse(left.last_visited_at) : 0)
        - (right.last_visited_at ? Date.parse(right.last_visited_at) : 0),
      render: (value: string | null) => <Text type="secondary">{dateLabel(value)}</Text>,
    },
  ], []);

  function exportCsv() {
    const rows = [["Name", "Email", "Projects viewed", "Visits", "Verified at", "Last visit"],
      ...filtered.map((visitor) => [visitor.name, visitor.email, visitor.categories.map((item) => PROJECT_CATEGORIES[item]).join("; "),
        visitor.visit_count, visitor.verified_at, visitor.last_visited_at || ""])];
    const url = URL.createObjectURL(new Blob(["\uFEFF" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-visitors.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <ConfigProvider theme={{
      token: { colorPrimary: "#059669", borderRadius: 10, fontFamily: "var(--font-inter), Arial, sans-serif" },
      components: { Table: { headerBg: "#f8fafc" }, Card: { bodyPadding: 20 } },
    }}>
      <section aria-label="Project visitors" className="min-h-full min-w-0 bg-slate-50 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Title level={2} style={{ margin: "0 0 8px", fontSize: 26 }}>Project Visitors</Title>
              <Text type="secondary">Names and verified emails of people exploring our projects.</Text>
            </div>
            <Button type="primary" size="large" icon={<DownloadOutlined />} onClick={exportCsv}
              disabled={loading || !!error || !filtered.length}>Export CSV</Button>
          </div>

          <Row gutter={[16, 16]}>
            {[{ label: "Verified visitors", value: visitors.length, icon: <TeamOutlined /> },
              { label: "Project visits", value: visitors.reduce((total, visitor) => total + visitor.visit_count, 0), icon: <CheckCircleOutlined /> },
              { label: "Matching visitors", value: filtered.length, icon: <SearchOutlined /> }].map((item) => (
              <Col key={item.label} xs={24} sm={8}>
                <Card loading={loading}>
                  <Statistic title={item.label} value={item.value} prefix={item.icon} />
                </Card>
              </Col>
            ))}
          </Row>

          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <Input size="large" allowClear prefix={<SearchOutlined />} aria-label="Search by name or email"
                placeholder="Search by name or email…" value={search} style={{ flex: "1 1 240px" }}
                onChange={(event) => { setSearch(event.target.value); setPage(1); }} />
              <Select size="large" allowClear aria-label="Filter by project category" placeholder="All project categories"
                value={category || undefined} style={{ flex: "0 1 250px", minWidth: 200 }}
                options={Object.entries(PROJECT_CATEGORIES).map(([value, label]) => ({ value, label }))}
                onChange={(value) => { setCategory(value || ""); setPage(1); }} />
              <Button size="large" icon={<ReloadOutlined />} loading={loading} onClick={() => void refresh()}>Refresh</Button>
            </div>
          </Card>

          {error ? (
            <Alert type="error" showIcon title="Unable to load project visitors" description={error}
              action={<Button size="small" onClick={() => void refresh()}>Retry</Button>} />
          ) : (
            <Card styles={{ body: { padding: 0 } }}>
              <Table<ProjectVisitor> rowKey="id" columns={columns} dataSource={filtered}
                loading={{ spinning: loading, tip: "Loading visitors…" }} scroll={{ x: 1020 }}
                locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                  <Space orientation="vertical" size={4}>
                    <Text strong>{search || category ? "No visitors match these filters" : "No verified visitors yet"}</Text>
                    <Text type="secondary">Visitors appear here after verifying their email to access projects.</Text>
                  </Space>
                } /> }}
                pagination={{
                  current: safePage,
                  pageSize,
                  total: filtered.length,
                  showSizeChanger: true,
                  pageSizeOptions: [10, 20, 50],
                  hideOnSinglePage: filtered.length <= 10,
                  responsive: true,
                  showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} visitors`,
                  onChange: (nextPage, nextSize) => { setPage(nextSize === pageSize ? nextPage : 1); setPageSize(nextSize); },
                }} />
            </Card>
          )}
        </div>
      </section>
    </ConfigProvider>
  );
}
