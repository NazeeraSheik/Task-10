import React from 'react'
import 'antd/dist/antd.css'
import { Table,Button,Space,Input } from 'antd'
import './table.css'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';



const data = 

[{
  "key": 1,
  "rno": 30,
  "name": "Ardisj",
  "age": 51,
  "address": "Portugal"
}, {
  "key": 2,
  "rno": 80,
  "name": "Nertie",
  "age": 89,
  "address": "Peru"
}, {
  "key": 3,
  "rno": 64,
  "name": "Audre",
  "age": 25,
  "address": "Poland"
}, {
  "key": 4,
  "rno": 2,
  "name": "Darlene",
  "age": 70,
  "address": "Brazil"
},{
  "key": 9,
  "rno": 16,
  "name": "Wynnie",
  "age": 29,
  "address": "Benin"
},

 {
  "key": 20,
  "rno": 70,
  "name": "Sara-ann",
  "age": 3,
  "address": "China"
}];

  
class table extends React.Component{
 
    state = {
        filteredInfo: null,
        sortedInfo: null,
        searchText: '',
        searchedColumn: '',
      };
      
      handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters',   pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };
    
      clearFilters = () => {
        this.setState({ filteredInfo: null });
      };
    
      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };
      setAgeSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'age',
          },
        });
      };
      setRnoSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'rno',
          },
        });
      };

      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 12 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        
          const columns = [
            {
                title: 'Rno',
                dataIndex: 'rno',
                key: 'rno',
                sorter: (a,b) => a.rno-b.rno,
                    sortOrder: sortedInfo.columnKey === 'rno' && sortedInfo.order,
                    ellipsis: true,
                },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              ...this.getColumnSearchProps('name'),
              render: name =>{
                  return <b>{name}</b>
              }
              
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
              sorter: (a, b) => a.age - b.age,
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                ellipsis: true,
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
              filters: [
                  { text: 'Portugal', value: 'Portugal' },
                  { text: 'Africa', value: 'Africa' },
              ],
              filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.address.includes(value),
                sorter: (a, b) => a.address.length - b.address.length,
                sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Graduated?',
                key: 'key',
                
                render: graduated =>{
                    return <p><b>{graduated.age>25?'True':'False'}</b></p>
                }
            },
          ];

        return(
            <>
            <Space style={{ marginBottom: 16 , marginLeft:0}}>
       
              <Button onClick={this.clearFilters}><b>Clear filters</b></Button>
              <Button onClick={this.clearAll}><b>Clear filters and sorters</b></Button>
            </Space>
            <Table columns={columns} dataSource={data} onChange={this.handleChange} />
          </>
          
        )
    }
}

export default table;