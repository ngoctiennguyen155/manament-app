import {Button, IconButton, Stack} from '@mui/material';
import {Trash} from 'iconsax-react';
import queryString from 'query-string';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {DataTable, DialogConfirm, SearchBar} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {useWindowDimensions} from '../../../hooks';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {Category, PaginationParams, QueryParams} from '../../../models';
import {categoryService} from '../../../services';
import {colors} from '../../../theme';

const DanhSachCacheDanhMucPage = () => {
  const location = useLocation();
  const [checkQuyen] = useCheckQuyen();

  const queryParams: QueryParams = queryString.parse(location.search);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {height} = useWindowDimensions();
  const [isOpenDelete, setIsOpenDelete] = useState<{visible: boolean; id: number | string}>({
    visible: false,
    id: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [filters, setFilters] = useState<QueryParams>({
    ...queryParams,
    search: queryParams.search ?? '',
    pageNumber: queryParams.pageNumber ?? 1,
    pageSize: queryParams.pageSize ?? 10,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });

  const columns = [
    {
      field: 'image',
      headerName: 'Hình ảnh',
      renderCell: (row: Category) => (
        <img src={row.image} width={50} height={50} alt={row.name} style={{objectFit: 'contain'}} />
      ),
    },
    {
      field: 'name',
      headerName: 'Tên danh mục',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      valueGetter: (row: Category) => (row.status ? 'true' : 'false'),
    },
  ];

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsOpenDelete(prev => ({...prev, visible: false}));
    const res = await categoryService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };
  const getList = async () => {
    setIsLoading(true);
    const res = await categoryService.cache();
    if (res) {
      setListCategory(res);
      // setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getList();
  }, [filters]);

  return (
    <Page title="Danh sách cache danh mục">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              categoryService.loadCache().then(() => getList());
            }}
          >
            Load cache
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              categoryService.flush().then(() => getList());
            }}
          >
            Xoá bộ nhớ cache
          </Button>
        </Stack>
      </Stack>

      <DataTable
        columns={columns}
        rows={listCategory}
        loading={isLoading}
        height={height - 200}
        pagination={{
          show: false,
          page: pagination.currentPage - 1,
          totalCount: pagination.totalCount,
          rowsPerPage: pagination.pageSize,
          onPageChange: page => {
            setFilters(prev => ({...prev, pageNumber: page + 1}));
          },
          onRowsPerPageChange: value => {
            setFilters(prev => ({...prev, pageSize: value, pageNumber: 1}));
          },
        }}
      />

      <DialogConfirm
        open={isOpenDelete.visible}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa danh mục này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachCacheDanhMucPage;
