import React, { Fragment, useEffect } from 'react'
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmListAction } from '../../../redux/actions/FilmManagementAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;

export default function Films(props) {

  const { arrFilmDefault } = useSelector(state => state.FilmManagementReducer);
  console.log('arrFilmDefault', arrFilmDefault);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmListAction());
  }, []);

  const columns = [
    {
      title: 'Movie Code',
      dataIndex: 'maPhim',
      value: (text, object) => { return <span>{text}</span> },
      //specify the condition of filtering result
      //here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],
      width: '15%',
    },
    {
      title: 'Poster',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {
        return <Fragment>
          <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
        </Fragment>
      },
      width: '15%',
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Movie name',
      dataIndex: 'tenPhim',
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
    {
      title: 'Movie description',
      dataIndex: 'moTa',
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        if (moTaA > moTaB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
        </Fragment>
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
    {
      title: 'Action',
      dataIndex: 'hanhDong',
      render: (text, film) => {
        return <Fragment>
          <NavLink className="mr-2 text-2xl" to="/"><EditOutlined style={{ color: 'blue' }} /> </NavLink>
          <NavLink className="text-2xl" to="/"><DeleteOutlined style={{ color: 'red' }} /> </NavLink>
        </Fragment>
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
  ];

  const data = arrFilmDefault;

  const onSearch = (value) => console.log(value);

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-4xl">Films Management</h3>
      <Button className="mb-5" onClick={() => {
        history.push('/admin/films/addnew')
      }}>Add film</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        // enterButton="Search" 
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}