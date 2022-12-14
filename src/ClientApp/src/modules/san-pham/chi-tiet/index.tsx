/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {Product} from 'src/models/product';
import {CardBase} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {
  CheckboxField,
  ImagePickerField,
  InputField,
  TextAreaField,
} from '../../../components/hook-form';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {productService} from '../../../services';

const defaultValues = {
  productCode: '',
  type: undefined,
  price: undefined,
  brandName: '',
  brandLogo: '',
  partner: '',
  partnerLogo: '',
  name: '',
  point: undefined,
  categories: [],
  thuongHieus: [],
  xepHangs: [],
  image: '',
  thumbnail: '',
  content: '',
  term: '',
  expiredMonth: '',
  status: false,
  isCustomStore: false,
  customStore: '',
};
const ChiTietSanPhamPage = () => {
  const [diaDiems, setDiaDiems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {id = ''} = useParams<string>();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues,
  });
  const {
    watch,
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: Partial<Product>) => {
    if (id) {
      await productService.update(id, {
        id,
        ...data,
      });
    } else {
      const res = await productService.create(data);
      if (res) {
        navigate(-1);
      }
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      const res: any = await productService.getOne(id);
      if (res) {
        Object.keys(defaultValues).forEach((item: any) => {
          if (item === 'categories') {
            res.categories &&
              setValue(
                'categories',
                res.categories?.map((i: any) => ({label: i.name, value: i.id}))
              );
          } else if (item === 'xepHangs') {
            res.xepHangs &&
              setValue(
                'xepHangs',
                res.xepHangs?.map((i: any) => ({label: i.name, value: i.id}))
              );
          } else if (item === 'thuongHieus') {
            res.thuongHieus &&
              setValue(
                'thuongHieus',
                res.thuongHieus?.map((i: any) => ({label: i.ten, value: i.id}))
              );
          } else if (typeof res[item] === 'number') {
            setValue(item, res[item] + '');
          } else if (item === 'status') {
            // console.log('status', res[item]);
            setValue(item, res[item]);
          } else {
            setValue(item, res[item]);
          }
        });
        setDiaDiems(res?.storeList);
      }
      setLoading(false);
    };
    id && getDetail();
  }, [id]);
  const [checkQuyen] = useCheckQuyen();

  return (
    <Page title={id ? 'C???p nh???t s???n ph???m' : 'Th??m s???n ph???m'}>
      <Grid sx={{pointerEvents: checkQuyen('edit') ? 'all' : 'none'}} container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <CardBase
            actions={
              checkQuyen('edit') ? (
                <Stack direction="row" justifyContent="flex-end" margin={2}>
                  <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                    {id ? 'C???p nh???t' : 'Th??m s???n ph???m'}
                  </Button>
                </Stack>
              ) : (
                false
              )
            }
          >
            <Grid container sx={{padding: 2}} spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="productCode" label="M?? s???n ph???m" disabled />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="type" label="Lo???i" disabled />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="price" label="Gi??" disabled />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="brandName" label="T??n th????ng hi???u" disabled />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField
                  form={form}
                  name="brandLogo"
                  label="???????ng d???n logo th????ng hi???u"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="partner" label="Nh?? ph??n ph???i" disabled />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ImagePickerField
                  form={form}
                  name="partnerLogo"
                  label="???????ng d???n logo nh?? ph??n ph???i"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="name" label="T??n s???n ph???m" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="point" label="??i???m" />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4}>
                <AutocompleteAsyncField
                  multiple
                  loading={loadingCategories}
                  items={categories?.map(item => ({label: item?.name, value: item?.id, ...item}))}
                  onSubmit={value => getCategories(value)}
                  form={form}
                  name="categories"
                  label="Danh m???c"
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={4}>
                {/* <ThuongHieuField form={form} name="thuongHieus" multiple /> */}
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                {/* <InputField form={form} name="image" label="???????ng d???n ???nh s???n ph???m" /> */}
                <ImagePickerField form={form} name="image" label="H??nh ???nh" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <ImagePickerField
                  form={form}
                  name="thumbnail"
                  label="???????ng d???n ???nh s???n ph???m thu nh???"
                />
              </Grid>
              {/* <Grid item xs={12} md={6} lg={4}>
                <AutocompleteAsyncField
                  multiple
                  loading={loadingXepHangs}
                  items={xepHangs?.map(item => ({label: item?.name, value: item?.id, ...item}))}
                  onSubmit={value => getXepHangs(value)}
                  form={form}
                  name="xepHangs"
                  label="X???p h???ng"
                />
              </Grid> */}
              <Grid item xs={12} md={6} lg={4}>
                <InputField form={form} name="expiredMonth" label="Th???i gian h???t h???n" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <CheckboxField form={form} name="status" label="Tr???ng th??i" />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Typography component="div" color="text.secondary">
                  M?? t???
                </Typography>
                <TextAreaField form={form} name="content" label="" />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Typography component="div" color="text.secondary">
                  H?????ng d???n
                </Typography>
                <TextAreaField form={form} name="term" label="" />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <CheckboxField
                  onChange={(value: any) => !value && setValue('customStore', '')}
                  form={form}
                  name="isCustomStore"
                  label="Tu??? ch???nh c???a h??ng"
                  on
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Typography component="div" color="text.secondary">
                  C???a h??ng ??p d???ng
                </Typography>
                {watch('isCustomStore') ? (
                  <TextAreaField form={form} name="customStore" label="" />
                ) : (
                  <Card variant="outlined" sx={{maxHeight: 600, overflow: 'auto'}}>
                    <List>
                      {diaDiems?.length === 0 && (
                        <ListItem>
                          <ListItemText
                            sx={{textAlign: 'center'}}
                            primary="Ch??a c?? c???a h??ng ??p d???ng"
                          />
                        </ListItem>
                      )}
                      {diaDiems?.map((item, index) => (
                        <>
                          <ListItem>
                            <ListItemText primary={`${index + 1}. ${item?.storeAddr}`} />
                          </ListItem>
                          {index < diaDiems?.length - 1 && <Divider variant="middle" />}
                        </>
                      ))}
                    </List>
                  </Card>
                )}
              </Grid>
            </Grid>
          </CardBase>
        </Grid>

        {/* <Grid item xs={12} md={12} lg={4}>
            <CardBase title="?????a ??i???m ??p d???ng" headerShow></CardBase>
          </Grid> */}
      </Grid>

      <LoadingOverlay open={isSubmitting || loading} />
    </Page>
  );
};

export default ChiTietSanPhamPage;
