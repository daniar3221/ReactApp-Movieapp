import React from "react";
import { Pagination } from 'antd'

const PaginationEl: React.FC = () => <Pagination className="pagination" defaultCurrent={2} total={5} />;

export default PaginationEl;